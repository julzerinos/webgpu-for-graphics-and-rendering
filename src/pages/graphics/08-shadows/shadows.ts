import { Executable, ExecutableQueue, Vector3, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    generateTexture,
    createTextureBind,
    genreateIndexBuffer,
    genreateVertexBuffer,
    createBind,
    writeToBufferF32,
    generateDepthBuffer,
} from "../../../libs/webgpu"

import {
    asset,
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createRelevantFilesLink,
    createText,
    createTitle,
} from "../../../libs/web"

import {
    Colors,
    createTranslateMatrix,
    flattenMatrix,
    flattenVector,
    generateMips,
    identity4x4,
    mat4,
    multMatrices,
    readImageData,
    scale,
    vec2,
    vec3,
    vec4,
} from "../../../libs/util"

import shaderCode from "./shadows.wgsl?raw"

const CANVAS_ID = "shadow-quads"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const marbleTextureData = await readImageData(asset("textures/xamp23.png"))

    const quadIndices = new Uint32Array([0, 1, 2, 0, 2, 3])
    const quadUvs = new Float32Array(
        flattenVector([vec2(0, 0), vec2(1, 0), vec2(1, 1), vec2(0, 1)])
    )

    const planeVertices = new Float32Array(
        flattenVector([vec4(-2, -1, -1), vec4(2, -1, -1), vec4(2, -1, -5), vec4(-2, -1, -5)])
    )
    const leftQuadVertices = new Float32Array(
        flattenVector([vec4(-1, -1, -2.5), vec4(-1, -1, -3), vec4(-1, 0, -3), vec4(-1, 0, -2.5)])
    )
    const rightQuadVertices = new Float32Array(
        flattenVector([
            vec4(0.25, -0.5, -1.25),
            vec4(0.75, -0.5, -1.25),
            vec4(0.75, -0.5, -1.75),
            vec4(0.25, -0.5, -1.75),
        ])
    )

    const { buffer: indexBuffer } = genreateIndexBuffer(
        device,
        new Uint32Array([
            ...quadIndices,
            ...quadIndices.map(p => p + 4),
            ...quadIndices.map(p => p + 8),
            ...quadIndices.map(p => p + 12),
            ...quadIndices.map(p => p + 16),
        ])
    )
    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateVertexBuffer(
        device,
        new Float32Array([
            ...planeVertices,
            ...leftQuadVertices,
            ...rightQuadVertices,
            ...leftQuadVertices,
            ...rightQuadVertices,
        ]),
        "float32x4"
    )
    const { buffer: uvBuffer, bufferLayout: uvBufferLayout } = genreateVertexBuffer(
        device,
        new Float32Array([...quadUvs]),
        "float32x2",
        1
    )

    const { depthStencil: lessDepthStencil, depthStencilAttachmentFactory } = generateDepthBuffer(
        device,
        canvas,
        1
    )
    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout, uvBufferLayout],
        canvasFormat,
        shaderCode,
        "triangle-list",
        { depthStencil: lessDepthStencil }
    )

    const { depthStencil: greaterDepthStencil } = generateDepthBuffer(device, canvas, 1, {
        depthStencilOverwrites: { depthCompare: "greater" },
    })
    const shadowPipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout, uvBufferLayout],
        canvasFormat,
        shaderCode,
        "triangle-list",
        { depthStencil: greaterDepthStencil, primitive: { cullMode: "none" } },
        {
            blend: {
                color: {
                    operation: "add",
                    srcFactor: "src-alpha",
                    dstFactor: "one-minus-src-alpha",
                },
                alpha: { operation: "add", srcFactor: "one", dstFactor: "zero" },
            },
        }
    )

    const mips = generateMips(marbleTextureData.textureData, marbleTextureData.width)
    const { texture: marbleTexture, sampler: marbleSampler } = generateTexture(
        device,
        marbleTextureData.textureData,
        marbleTextureData.width,
        marbleTextureData.height,
        {
            addressModeU: "clamp-to-edge",
            addressModeV: "clamp-to-edge",
            minFilter: "nearest",
            magFilter: "nearest",
            mipmapFilter: "nearest",
        },
        { mips }
    )
    const marbleTextureBind = createTextureBind(device, pipeline, marbleTexture, marbleSampler)

    const { texture: redTexture, sampler: redSampler } = generateTexture(
        device,
        new Uint8Array([255, 0, 0, 255]),
        1,
        1
    )
    const redTextureBind = createTextureBind(device, pipeline, redTexture, redSampler)

    const { texture: shadowTexture, sampler: shadowSampler } = generateTexture(
        device,
        new Uint8Array([0, 0, 0, 125]),
        1,
        1
    )
    const shadowTextureBind = createTextureBind(device, pipeline, shadowTexture, shadowSampler)

    const { bindGroup: identityModelMatrixBind } = createBind(
        device,
        pipeline,
        [new Float32Array(flattenMatrix(identity4x4()))],
        "UNIFORM",
        1
    )
    const {
        bindGroup: shadowModelMatrixBind,
        buffers: [shadowModelMatrixBuffer],
    } = createBind(device, pipeline, [new Float32Array(flattenMatrix(identity4x4()))], "UNIFORM", 1)

    const d = -1 - 2 - 1e-3
    const projectionToGround = mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1 / d, 0, 0)
    const objectM = identity4x4()
    const writeShadowModelMatrix = (lightPosition: Vector3) => {
        const T_toLight = createTranslateMatrix(lightPosition)
        const T_fromLight = createTranslateMatrix(scale(lightPosition, -1))
        const modelShadow = multMatrices(
            multMatrices(multMatrices(T_toLight, projectionToGround), T_fromLight),
            objectM
        )

        writeToBufferF32(
            device,
            shadowModelMatrixBuffer,
            new Float32Array(flattenMatrix(modelShadow)),
            0
        )
    }

    const draw = (frame: number) => {
        const time = frame / 1e3

        const lightPosition = vec3(2 * Math.cos(time), 2, 2 * Math.sin(time) - 2)
        writeShadowModelMatrix(lightPosition)

        const { pass, executePass } = createPass(device, context, Colors.blueScreenBlue, {
            depthStencilAttachmentFactory,
        })

        pass.setVertexBuffer(0, vertexBuffer)
        pass.setVertexBuffer(1, uvBuffer)
        pass.setIndexBuffer(indexBuffer, "uint32")

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, marbleTextureBind)
        pass.setBindGroup(1, identityModelMatrixBind)
        pass.drawIndexed(6)

        pass.setPipeline(shadowPipeline)
        pass.setBindGroup(1, shadowModelMatrixBind)
        pass.setBindGroup(0, shadowTextureBind)
        pass.drawIndexed(12, undefined, 6)

        pass.setPipeline(pipeline)
        pass.setBindGroup(1, identityModelMatrixBind)
        pass.setBindGroup(0, redTextureBind)
        pass.drawIndexed(12, undefined, 18)

        executePass()

        requestAnimationFrame(draw)
    }

    requestAnimationFrame(draw)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const a = createRelevantFilesLink("graphics/08-shadows", ["/shadows.ts", "/shadows.wgsl"])

    const title = createTitle("Shadow as a shape")
    const description = createText(`
Implementing shadows in the rasterization pipeline is no simple task. Shapes have very limited information about the existence of other shapes out of the box.
The entire system is based on a simple ordered drawing of shapes to the screen.

There is a way to implement shadows while staying in the shapes only paradigm - projection shadows. The concept is simple, shadows are in fact copies of their obstructing object.
The projection shadow objects are drawn with the appropriate transformation matrix (depending on the light source).

To make sure shadows only exist on the surfaces of shadow-catching objects (such as the plane in the example below and not beyond it), 
clever manipulation of the z-buffer can be used to make sure a shape is only drawn if there exists a fragement beneath it.
Further modification of the draw orders or implementations of draw layers would allow mixing and matching shadow casters and shadow catchers.
    `)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)

    const interactables = createInteractableSection()

    interactables.append()
    canvasSection.append(canvas, interactables)
    div.append(title, a, description, canvasSection)

    executeQueue.push(execute)
}

export default view
