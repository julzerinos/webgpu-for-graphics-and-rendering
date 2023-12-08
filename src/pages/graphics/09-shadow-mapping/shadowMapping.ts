import { Executable, ExecutableQueue, Matrix4x4, Vector3, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    setupShaderPipeline,
    generateTexture,
    createTextureBind,
    genreateIndexBuffer,
    genreateVertexBuffer,
    createBind,
    writeToBufferF32,
    generateDepthBuffer,
    generateMultisampleBuffer,
} from "../../../libs/webgpu"

import {
    createBoolInput,
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createText,
    createTitle,
    createWithLabel,
    watchInput,
} from "../../../libs/web"

import {
    Colors,
    Vector3s,
    createTranslateMatrix,
    flattenMatrix,
    flattenVector,
    generateMips,
    getDrawingInfo,
    identity4x4,
    lookAtMatrix,
    mat4,
    multMatrices,
    parseOBJ,
    perspectiveProjection,
    readImageData,
    vec2,
    vec3,
    vec4,
} from "../../../libs/util"

import planeShader from "./planeMapped.wgsl?raw"
import teapotShader from "./teapotMapped.wgsl?raw"
import teapotShadowShader from "./teapotShadowMapped.wgsl?raw"

const CANVAS_ID = "shadow-mapping"
const TEAPOT_MOVEMENT = "teapot-movement-shadow-mapping"
const LIGHT_MOVEMENT = "light-movement-shadow-mapping"

const execute: Executable = async () => {
    const getTeapotMovementEnabled = watchInput<boolean>(TEAPOT_MOVEMENT, "checked")
    const getLightMovementEnabled = watchInput<boolean>(LIGHT_MOVEMENT, "checked")

    const marbleTextureData = await readImageData("textures/xamp23.png")

    const teapotObj = await parseOBJ("models/teapot.obj", 0.25, false)
    const teapotDrawingInfo = getDrawingInfo(teapotObj, { indicesIn3: true })

    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const shadowCanvas = document.getElementById(CANVAS_ID + "-shadow") as HTMLCanvasElement
    const shadowCanvasContext = (shadowCanvas.getContext("gpupresent") ||
        shadowCanvas.getContext("webgpu")) as GPUCanvasContext
    shadowCanvasContext.configure({
        device: device,
        format: canvasFormat,
    })

    const { depthStencil: lessDepthStencil, depthStencilAttachmentFactory } = generateDepthBuffer(
        device,
        canvas,
        1
    )
    const { buffer: teapotIndexBuffer } = genreateIndexBuffer(device, teapotDrawingInfo.indices)
    const { buffer: teapotVertexBuffer, bufferLayout: teapotVertexBufferLayout } =
        genreateVertexBuffer(device, teapotDrawingInfo.vertices, "float32x4")
    const { buffer: teapotNormalBuffer, bufferLayout: teapotNormalBufferLayout } =
        genreateVertexBuffer(device, teapotDrawingInfo.normals, "float32x4", 1)
    const { buffer: teapotColorBuffer, bufferLayout: teapotColorBufferLayout } =
        genreateVertexBuffer(device, teapotDrawingInfo.colors, "float32x4", 2)

    const teapotPipeline = setupShaderPipeline(
        device,
        [teapotVertexBufferLayout, teapotNormalBufferLayout, teapotColorBufferLayout],
        canvasFormat,
        teapotShader,
        "triangle-list",
        { depthStencil: lessDepthStencil }
    )

    const shadowMapDepthTexture = device.createTexture({
        size: {
            width: shadowCanvas.width,
            height: shadowCanvas.height,
            depthOrArrayLayers: 1,
        },
        mipLevelCount: 1,
        sampleCount: 1,
        dimension: "2d",
        format: "rgba32float",
        usage:
            GPUTextureUsage.RENDER_ATTACHMENT |
            GPUTextureUsage.TEXTURE_BINDING |
            GPUTextureUsage.COPY_SRC,
    })

    const shadowMapDepthTextureView = shadowMapDepthTexture.createView()

    const shadowMapShaderModule = device.createShaderModule({
        code: teapotShadowShader,
    })
    const shadowPipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
            module: shadowMapShaderModule,
            entryPoint: "main_vs",
            buffers: [teapotVertexBufferLayout],
        },
        fragment: {
            module: shadowMapShaderModule,
            entryPoint: "main_fs",
            targets: [
                {
                    format: canvasFormat,
                },
                {
                    format: "rgba32float"
                }
            ],
        },
        // depthStencil: {
        //     depthWriteEnabled: true,
        //     depthCompare: "less",
        //     format: "depth32float",
        // },
        primitive: { cullMode: "none", topology: "triangle-list" },
    })

    const {
        bindGroup: shadowUniformBind,
        buffers: [shadowPassTeapotModelMatrixBuffer, shadowPassProjectionViewMatrixBuffer],
    } = createBind(
        device,
        shadowPipeline,
        [new Float32Array(flattenMatrix(identity4x4())), new Float32Array(flattenMatrix(mat4()))],
        "UNIFORM",
        0
    )

    const quadIndices = new Uint32Array([0, 1, 2, 0, 2, 3])
    const quadUvs = new Float32Array(
        flattenVector([vec2(0, 0), vec2(1, 0), vec2(1, 1), vec2(0, 1)])
    )
    const planeVertices = new Float32Array(
        flattenVector([vec4(-2, -1, -1), vec4(2, -1, -1), vec4(2, -1, -5), vec4(-2, -1, -5)])
    )

    const { buffer: planeIndexBuffer } = genreateIndexBuffer(
        device,
        new Uint32Array([...quadIndices])
    )
    const { buffer: planeVertexBuffer, bufferLayout: planeVertexBufferLayout } =
        genreateVertexBuffer(device, new Float32Array([...planeVertices]), "float32x4")
    const { buffer: planeUvBuffer, bufferLayout: planeUvBufferLayout } = genreateVertexBuffer(
        device,
        new Float32Array([...quadUvs]),
        "float32x2",
        1
    )

    const planePipeline = setupShaderPipeline(
        device,
        [planeVertexBufferLayout, planeUvBufferLayout],
        canvasFormat,
        planeShader,
        "triangle-list",
        { depthStencil: lessDepthStencil }
    )

    const shadowMapTextureBind = device.createBindGroup({
        layout: planePipeline.getBindGroupLayout(2),
        entries: [
            // {
            //     binding: 0,
            //     resource: device.createSampler({
            //         addressModeU: "clamp-to-edge",
            //         addressModeV: "clamp-to-edge",
            //         addressModeW: "clamp-to-edge",
            //         magFilter: "linear",
            //         minFilter: "linear",
            //         mipmapFilter: "nearest",
            //         lodMinClamp: 0,
            //         lodMaxClamp: 100,
            //     }),
            // },
            {
                binding: 0,
                resource: shadowMapDepthTexture.createView(),
            },
        ],
    })

    const defaultProjectionViewMatrix = new Float32Array(
        flattenMatrix(perspectiveProjection(90, 1, 0.001, 6))
    )

    const createLightProjectionViewMatrix = (lightPosition: Vector3): Matrix4x4 => {
        const projection = perspectiveProjection(100, 1, 0.01, 4)
        const view = lookAtMatrix(lightPosition, vec3(0, -1, -3), Vector3s.up)

        return multMatrices(projection, view)
    }

    const writeLightProjectionViewMatrix = (lightPosition: Vector3) => {
        const projectionView = new Float32Array(
            flattenMatrix(createLightProjectionViewMatrix(lightPosition))
        )

        writeToBufferF32(device, shadowPassProjectionViewMatrixBuffer, projectionView, 0)
        writeToBufferF32(device, planeLightProjViewMatrixBuffer, projectionView, 0)
    }

    const {
        bindGroup: planeUniformBind,
        buffers: [_, planeLightProjViewMatrixBuffer, teapotModelInPlaneBuffer],
    } = createBind(
        device,
        planePipeline,
        [
            defaultProjectionViewMatrix,
            new Float32Array(flattenMatrix(mat4())),
            new Float32Array(flattenMatrix(mat4())),
        ],
        "UNIFORM",
        1
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
    const marbleTextureBind = createTextureBind(device, planePipeline, marbleTexture, marbleSampler)

    const {
        bindGroup: teapotUniformBind,
        buffers: [teapotModelMatrixBuffer, lightPositionBuffer],
    } = createBind(
        device,
        teapotPipeline,
        [
            new Float32Array(flattenMatrix(mat4())),
            new Float32Array(vec3()),
            defaultProjectionViewMatrix,
        ],
        "UNIFORM",
        0
    )

    let teapotTime = 0
    let lightTime = 0
    let lastFrame = 0

    const draw = (frame: number) => {
        const delta = (frame - lastFrame) / 1e3
        teapotTime += getTeapotMovementEnabled() ? delta : 0
        lightTime += getLightMovementEnabled() ? delta : 0

        const lightPosition = vec3(2 * Math.cos(lightTime), 2, 2 * Math.sin(lightTime) - 2)
        writeToBufferF32(device, lightPositionBuffer, new Float32Array(lightPosition), 0)
        writeLightProjectionViewMatrix(lightPosition)

        const translationMatrix = createTranslateMatrix(
            vec3(0, (Math.cos(teapotTime) * 3 - 1) / 4, -3)
        )
        const teapotModel = new Float32Array(flattenMatrix(translationMatrix))
        writeToBufferF32(device, teapotModelMatrixBuffer, teapotModel, 0)
        writeToBufferF32(device, shadowPassTeapotModelMatrixBuffer, teapotModel, 0)
        writeToBufferF32(device, teapotModelInPlaneBuffer, teapotModel, 0)

        const encoder = device.createCommandEncoder()

        const shadowMapPass = encoder.beginRenderPass({
            colorAttachments: [
                {
                    view: shadowCanvasContext.getCurrentTexture().createView(),
                    loadOp: "clear",
                    clearValue: {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 1,
                    },
                    storeOp: "store",
                },
                {
                    view: shadowMapDepthTextureView,
                    loadOp: "clear",
                    clearValue: {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 1,
                    },
                    storeOp: "store",
                },
            ],
            // depthStencilAttachment: {
            //     view: shadowMapDepthTextureView,
            //     depthLoadOp: "clear",
            //     depthStoreOp: "store",
            //     depthClearValue: 1.0,
            // },
        })

        shadowMapPass.setPipeline(shadowPipeline)
        shadowMapPass.setVertexBuffer(0, teapotVertexBuffer)
        shadowMapPass.setIndexBuffer(teapotIndexBuffer, "uint32")
        shadowMapPass.setBindGroup(0, shadowUniformBind)
        shadowMapPass.drawIndexed(teapotDrawingInfo.indices.length)

        shadowMapPass.end()

        const pass = encoder.beginRenderPass({
            colorAttachments: [
                {
                    view: context.getCurrentTexture().createView(),
                    loadOp: "clear",
                    clearValue: Colors.blueScreenBlue,
                    storeOp: "store",
                },
            ],
            depthStencilAttachment: depthStencilAttachmentFactory(),
        })

        pass.setPipeline(planePipeline)
        pass.setVertexBuffer(0, planeVertexBuffer)
        pass.setVertexBuffer(1, planeUvBuffer)
        pass.setIndexBuffer(planeIndexBuffer, "uint32")
        pass.setBindGroup(0, marbleTextureBind)
        pass.setBindGroup(1, planeUniformBind)
        pass.setBindGroup(2, shadowMapTextureBind)
        pass.drawIndexed(6)

        pass.setPipeline(teapotPipeline)
        pass.setVertexBuffer(0, teapotVertexBuffer)
        pass.setVertexBuffer(1, teapotNormalBuffer)
        pass.setVertexBuffer(2, teapotColorBuffer)
        pass.setIndexBuffer(teapotIndexBuffer, "uint32")
        pass.setBindGroup(0, teapotUniformBind)
        pass.drawIndexed(teapotDrawingInfo.indices.length)

        pass.end()

        device.queue.submit([encoder.finish()])

        lastFrame = frame
        requestAnimationFrame(draw)
    }

    requestAnimationFrame(draw)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("shadow mapping")
    const description = createText("https://toolness.github.io/shadowmap-2d/")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)

    const interactables = createInteractableSection()

    const teapotMovement = createWithLabel(
        createBoolInput(TEAPOT_MOVEMENT, true),
        "Teapot movement",
        false
    )
    const lightMovement = createWithLabel(
        createBoolInput(LIGHT_MOVEMENT, true),
        "Light movement",
        false
    )

    interactables.append(teapotMovement, lightMovement)
    canvasSection.append(canvas, interactables)

    const shadowCanvasSection = createCanvasSection()
    const shadowCanvas = createCanvas(CANVAS_ID + "-shadow")
    shadowCanvasSection.append(shadowCanvas)

    div.append(title, description, canvasSection, shadowCanvasSection)

    executeQueue.push(execute)
}

export default view
