import { Executable, ExecutableQueue, Matrix4x4, Vector3, ViewGenerator } from "../../../types"

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
    generateMultisampleBuffer,
} from "../../../libs/webgpu"

import {
    asset,
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
    createTranslateMatrix,
    flattenMatrix,
    flattenVector,
    generateMips,
    getDrawingInfo,
    identity4x4,
    mat4,
    multMatrices,
    parseOBJ,
    readImageData,
    scale,
    vec2,
    vec3,
    vec4,
} from "../../../libs/util"

import planeShader from "./plane.wgsl?raw"
import teapotShader from "./teapot.wgsl?raw"
import teapotShadowShader from "./teapotShadow.wgsl?raw"

const CANVAS_ID = "teapot-proj-shadow"
const TEAPOT_MOVEMENT = "teapot-movement-teapot"
const LIGHT_MOVEMENT = "light-movement-teapot"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const getTeapotMovement = watchInput<boolean>(TEAPOT_MOVEMENT, "checked")
    const getLightMovement = watchInput<boolean>(LIGHT_MOVEMENT, "checked")

    const marbleTextureData = await readImageData(asset("textures/xamp23.png"))

    const teapotObj = await parseOBJ(asset("models/teapot.obj"), 0.25, false)
    const teapotDrawingInfo = getDrawingInfo(teapotObj, { indicesIn3: true })

    const { depthStencil: lessDepthStencil, depthStencilAttachmentFactory } = generateDepthBuffer(
        device,
        canvas,
        4
    )
    const { depthStencil: greaterDepthStencil } = generateDepthBuffer(device, canvas, 4, {
        depthStencilOverwrites: { depthCompare: "greater" },
    })
    const { msaaTexture, multisample } = generateMultisampleBuffer(device, canvas, canvasFormat, 4)

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
        { depthStencil: lessDepthStencil, multisample }
    )

    const teapotShadowPipeline = setupShaderPipeline(
        device,
        [teapotVertexBufferLayout],
        canvasFormat,
        teapotShadowShader,
        "triangle-list",
        { depthStencil: greaterDepthStencil, multisample, primitive: { cullMode: "front" } },
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
        { depthStencil: lessDepthStencil, multisample }
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
        bindGroup: teapotUniforms,
        buffers: [teapotModelMatrixBuffer, lightPositionBuffer],
    } = createBind(
        device,
        teapotPipeline,
        [new Float32Array(flattenMatrix(mat4())), new Float32Array(vec3())],
        "UNIFORM",
        0
    )

    const {
        bindGroup: shadowModelMatrixBind,
        buffers: [shadowModelMatrixBuffer],
    } = createBind(
        device,
        teapotShadowPipeline,
        [new Float32Array(flattenMatrix(identity4x4()))],
        "UNIFORM",
        0
    )

    const d = -1 - 2 - 1e-3
    const projectionToGround = mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1 / d, 0, 0)
    const writeShadowModelMatrix = (lightPosition: Vector3, objectM: Matrix4x4) => {
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

    let teapotTime = 0
    let lightTime = 0
    let lastFrame = 0

    const draw = (frame: number) => {
        const delta = (frame - lastFrame) / 1e3
        teapotTime += getTeapotMovement() ? delta : 0
        lightTime += getLightMovement() ? delta : 0

        const lightPosition = vec3(2 * Math.cos(lightTime), 2, 2 * Math.sin(lightTime) - 2)
        const translationMatrix = createTranslateMatrix(
            vec3(0, (Math.cos(teapotTime) * 3 - 1) / 4, -3)
        )

        writeShadowModelMatrix(lightPosition, translationMatrix)
        writeToBufferF32(
            device,
            teapotModelMatrixBuffer,
            new Float32Array(flattenMatrix(translationMatrix)),
            0
        )
        writeToBufferF32(device, lightPositionBuffer, new Float32Array(lightPosition), 0)

        const { pass, executePass } = createPass(device, context, Colors.blueScreenBlue, {
            depthStencilAttachmentFactory,
            msaaTexture,
        })

        pass.setPipeline(planePipeline)
        pass.setVertexBuffer(0, planeVertexBuffer)
        pass.setVertexBuffer(1, planeUvBuffer)
        pass.setIndexBuffer(planeIndexBuffer, "uint32")
        pass.setBindGroup(0, marbleTextureBind)
        pass.drawIndexed(6)

        pass.setPipeline(teapotShadowPipeline)
        pass.setBindGroup(0, shadowModelMatrixBind)
        pass.setVertexBuffer(0, teapotVertexBuffer)
        pass.setIndexBuffer(teapotIndexBuffer, "uint32")
        pass.drawIndexed(teapotDrawingInfo.indices.length)

        pass.setPipeline(teapotPipeline)
        pass.setVertexBuffer(0, teapotVertexBuffer)
        pass.setVertexBuffer(1, teapotNormalBuffer)
        pass.setVertexBuffer(2, teapotColorBuffer)
        pass.setIndexBuffer(teapotIndexBuffer, "uint32")
        pass.setBindGroup(0, teapotUniforms)
        pass.drawIndexed(teapotDrawingInfo.indices.length)

        executePass()

        lastFrame = frame
        requestAnimationFrame(draw)
    }

    requestAnimationFrame(draw)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Tea time")
    const description = createText(`
Before venturing into the topic of shadow maps, another example of projection shadows (previous section) is shown to provide a basis of comparison.

The opacity of the teapot's shadow is generated by enabling blending in the render pipeline configuration. 
This is required to let the projected shape mix colors with the fragements beneath it, instead of overwriting them in the z-buffer.
`)

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
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
