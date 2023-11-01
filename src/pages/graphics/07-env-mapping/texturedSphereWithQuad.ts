import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    genreateVertexBuffer,
    setupShaderPipeline,
    genreateIndexBuffer,
    generateDepthBuffer,
    generateMultisampleBuffer,
    writeToBufferF32,
    createBind,
    generateTexture,
    createTextureBind,
    generateCubeMap,
    toNDC,
} from "../../../libs/webgpu"

import {
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createText,
    createTitle,
} from "../../../libs/web"

import {
    flattenVector,
    lookAtMatrix,
    multMatrices,
    vec3,
    perspectiveProjection,
    TetrahedronSphere,
    toVec3,
    flattenMatrix,
    vec4,
    toRadians,
    readImageData,
    identity4x4,
    vectorMatrixMult,
} from "../../../libs/util"

import shaderCode from "./texturedSphereWithQuad.wgsl?raw"

const CANVAS_ID = "texture-sphere-with-quad"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)
    //const { textureData, width, height } = await readImageData("textures/earth.jpg")

    // textureLeft, textureRight, textureTop, textureBottom, textureBack, textureFront
    const cubemapTextures = await Promise.all(
        [
            "textures/cubemap/cm_left.png", // POSITIVE_X
            "textures/cubemap/cm_right.png", // NEGATIVE_X
            "textures/cubemap/cm_top.png", // POSITIVE_Y
            "textures/cubemap/cm_bottom.png", // NEGATIVE_Y
            "textures/cubemap/cm_back.png", // POSITIVE_Z
            "textures/cubemap/cm_front.png", // NEGATIVE_Z
        ].map(tp => readImageData(tp))
    )

    const sphere = TetrahedronSphere(7)
    const sphereIndices = flattenVector(sphere.triangleIndices.map(v => toVec3(v)))

    const eye = vec3(0, 0, 3)
    const at = vec3(0)
    const up = vec3(0, 1, 0)
    const view = lookAtMatrix(eye, at, up)

    const perspective = perspectiveProjection(90, canvas.width / canvas.height, 0.1, 100)
    const projection = perspective
    const projectionView = multMatrices(projection, view)

    const sphereVertices = flattenVector(
        sphere.vertices.map(v => vectorMatrixMult(v, projectionView))
    )

    const quadVertices = flattenVector([
        vec4(-1, -1, 0, 1),
        vec4(1, -1, 0, 1),
        vec4(-1, 1, 0, 1),
        vec4(1, 1, 0, 1),
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
        [vertexBufferLayout],
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

    // const { bindGroup: sceneDataBind } = createBind(
    //     device,
    //     pipeline,
    //     [new Float32Array(flattenMatrix(pvm))],
    //     "UNIFORM",
    //     0
    // )

    const draw = () => {
        const { pass, executePass } = createPass(device, context, vec4(0.5, 0.1, 0.5), {
            depthStencilAttachmentFactory,
            msaaTexture,
        })

        pass.setPipeline(pipeline)

        pass.setVertexBuffer(0, vertexBuffer)
        pass.setIndexBuffer(indexBuffer, "uint32")

        // pass.setBindGroup(0, sceneDataBind)
        pass.setBindGroup(0, textureBind)

        pass.drawIndexed(sphere.triangleCount * 3 )

        executePass()
    }

    draw()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("A sphere")
    const description = createText("no desc yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactableSection = createInteractableSection()

    interactableSection.append()
    canvasSection.append(canvas, interactableSection)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
