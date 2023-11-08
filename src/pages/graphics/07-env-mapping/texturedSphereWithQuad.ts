import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    genreateVertexBuffer,
    setupShaderPipeline,
    genreateIndexBuffer,
    generateDepthBuffer,
    generateMultisampleBuffer,
    createBind,
    createTextureBind,
    generateCubeMap,
    generateTexture,
    writeToBufferU32,
} from "../../../libs/webgpu"

import {
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createSelect,
    createText,
    createTitle,
    createWithLabel,
    subscribeToInput,
} from "../../../libs/web"

import {
    flattenVector,
    lookAtMatrix,
    multMatrices,
    vec3,
    perspectiveProjection,
    TetrahedronSphere,
    toVec3,
    vec4,
    readImageData,
    identity4x4,
    vectorMatrixMult,
    inverse4,
    matSlice,
    mat4,
    matFitInPlace,
    flattenMatrices,
} from "../../../libs/util"

import shaderCode from "./texturedSphereWithQuad.wgsl?raw"

const CANVAS_ID = "texture-sphere-with-quad"
const REFLECTION = "env-sphere-reflect-type"
const REFLECTION_TYPES = {
    "Faux reflection": 0,
    "Mirror reflection": 1,
    "Show normal map": 2,
    "Bump reflection": 3,
} as { [key: string]: number }

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)
    const [normalMapTexture, ...cubemapTextures] = await Promise.all(
        [
            "textures/normalmap.png",
            "textures/cubemap/cm_left.png", // POSITIVE_X
            "textures/cubemap/cm_right.png", // NEGATIVE_X
            "textures/cubemap/cm_top.png", // POSITIVE_Y
            "textures/cubemap/cm_bottom.png", // NEGATIVE_Y
            "textures/cubemap/cm_back.png", // POSITIVE_Z
            "textures/cubemap/cm_front.png", // NEGATIVE_Z
        ].map(tp => readImageData(tp))
    )

    const eye = vec3(0, 0, 3)
    const at = vec3(0)
    const up = vec3(0, 1, 0)
    const view = lookAtMatrix(eye, at, up)

    const perspective = perspectiveProjection(90, canvas.width / canvas.height, 0.1, 100)
    const projection = perspective
    const projectionView = multMatrices(projection, view)

    const projectionInv = inverse4(projection)
    const viewInv = inverse4(view)
    const viewInvSlice = matSlice(viewInv, [0, 0], [3, 3])

    const empty = mat4()
    const viewInvSlice4x4 = matFitInPlace(viewInvSlice, empty)

    const Mtex = multMatrices(viewInvSlice4x4, projectionInv)

    const sphere = TetrahedronSphere(7)
    const sphereIndices = flattenVector(sphere.triangleIndices.map(v => toVec3(v)))
    const sphereVertices = flattenVector(
        sphere.vertices.map(v => vectorMatrixMult(v, projectionView))
    )

    const depth = 0.999
    const quadVertices = flattenVector([
        vec4(-1, -1, depth, 1),
        vec4(1, -1, depth, 1),
        vec4(-1, 1, depth, 1),
        vec4(1, 1, depth, 1),
    ])
    const quadIndices = [
        sphere.vertices.length + 0,
        sphere.vertices.length + 1,
        sphere.vertices.length + 2,
        sphere.vertices.length + 1,
        sphere.vertices.length + 3,
        sphere.vertices.length + 2,
    ]

    const { buffer: indexBuffer } = genreateIndexBuffer(
        device,
        new Uint32Array([...sphereIndices, ...quadIndices])
    )
    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateVertexBuffer(
        device,
        new Float32Array([...sphereVertices, ...quadVertices]),
        "float32x4"
    )
    const { buffer: normalBuffer, bufferLayout: normalBufferLayout } = genreateVertexBuffer(
        device,
        new Float32Array([...flattenVector(sphere.vertices), ...quadVertices]),
        "float32x4",
        1
    )
    const { buffer: MtexIndexBuffer, bufferLayout: MtexIndexBufferLayout } = genreateVertexBuffer(
        device,
        new Float32Array([...Array(sphere.vertices.length).fill(0), ...Array(4).fill(1)]),
        "uint32",
        2
    )

    const msaaCount = 4
    const { multisample, msaaTexture } = generateMultisampleBuffer(
        device,
        canvas,
        canvasFormat,
        msaaCount
    )
    const { depthStencil, depthStencilAttachmentFactory } = generateDepthBuffer(
        device,
        canvas,
        msaaCount
    )

    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout, normalBufferLayout, MtexIndexBufferLayout],
        canvasFormat,
        shaderCode,
        "triangle-list",
        { multisample, depthStencil }
    )

    const { sampler, cubemapTexture } = generateCubeMap(
        device,
        cubemapTextures.map(ct => ct.textureData) as [
            Uint8Array,
            Uint8Array,
            Uint8Array,
            Uint8Array,
            Uint8Array,
            Uint8Array
        ],
        cubemapTextures[0].width,
        cubemapTextures[0].height
    )
    const textureBind = createTextureBind(device, pipeline, cubemapTexture, sampler, 0, {
        createViewOverwrite: { dimension: "cube" },
    })

    const {
        bindGroup: mTexBind,
        buffers: [_, __, reflectionTypeBuffer],
    } = createBind(
        device,
        pipeline,
        [
            new Float32Array(flattenMatrices([identity4x4(), Mtex])),
            new Float32Array([...eye]),
            new Uint32Array([0]),
        ],
        "UNIFORM",
        1
    )

    const { texture: normalTexture, sampler: normalSampler } = generateTexture(
        device,
        normalMapTexture.textureData,
        normalMapTexture.width,
        normalMapTexture.height
    )
    const normalTextureBind = createTextureBind(device, pipeline, normalTexture, normalSampler, 2)

    const draw = (reflection: string) => {
        const reflectionType = REFLECTION_TYPES[reflection]
        writeToBufferU32(device, reflectionTypeBuffer, new Uint32Array([reflectionType]), 0)

        const { pass, executePass } = createPass(device, context, vec4(0.5, 0.1, 0.5), {
            depthStencilAttachmentFactory,
            msaaTexture,
        })

        pass.setPipeline(pipeline)

        pass.setVertexBuffer(0, vertexBuffer)
        pass.setVertexBuffer(1, normalBuffer)
        pass.setVertexBuffer(2, MtexIndexBuffer)
        pass.setIndexBuffer(indexBuffer, "uint32")

        pass.setBindGroup(0, textureBind)
        pass.setBindGroup(1, mTexBind)
        pass.setBindGroup(2, normalTextureBind)

        pass.drawIndexed(sphere.triangleCount * 3 + quadIndices.length)

        executePass()
    }

    draw(subscribeToInput<string>(REFLECTION, draw))
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("A sphere")
    const description = createText("explain transformation")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactableSection = createInteractableSection()

    const selectReflection = createWithLabel(
        createSelect(REFLECTION, Object.keys(REFLECTION_TYPES), "Faux reflection"),
        "Reflection type",
        false
    )

    interactableSection.append(selectReflection)
    canvasSection.append(canvas, interactableSection)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
