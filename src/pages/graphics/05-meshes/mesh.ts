import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    genreateVertexBuffer,
    setupShaderPipeline,
    genreateIndexBuffer,
    createUniformBind,
    toNDC,
    writeToBufferF32,
    generateDepthBuffer,
    generateMultisampleBuffer,
} from "../../../libs/webgpu"

import {
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createRange,
    createText,
    createTitle,
    createWithLabel,
    subscribeToInput,
} from "../../../libs/web"

import {
    Colors,
    flattenVector,
    lookAtMatrix,
    multMatrices,
    vec3,
    perspectiveProjection,
    vec4,
    parseOBJ,
    objToShape,
    toVec3,
    identity4x4,
    flattenMatrix,
    toRadians,
    getDrawingInfo,
} from "../../../libs/util"

import shaderCode from "./shading.wgsl?raw"

import { OBJDoc } from "../../../libs/util/OBJParserT"
import monkey from "../../../../public/models/monkey.obj?raw"

const CANVAS_ID = "monkey"
const ROTATION_AROUND = "rotation-around-monkey"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const monkeyObj = await parseOBJ("models/monkey.obj", 1, false)
    // const monkeyShape = objToShape(monkeyObj)
    const monkeyDrawingInfo = getDrawingInfo(monkeyObj, { indicesIn3: true })

    // const vertices = new Float32Array(flattenVector(monkeyShape.vertices))
    // const triangles = new Uint32Array(
    //     flattenVector(monkeyShape.triangleIndices.map(v => toVec3(v)))
    // )

    const { buffer: indexBuffer } = genreateIndexBuffer(device, monkeyDrawingInfo.indices)
    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateVertexBuffer(
        device,
        monkeyDrawingInfo.vertices,
        "float32x4"
    )
    const { buffer: normalBuffer, bufferLayout: normalBufferLayout } = genreateVertexBuffer(
        device,
        monkeyDrawingInfo.normals,
        "float32x4",
        1
    )

    const { msaaTexture, multisample } = generateMultisampleBuffer(device, canvas, canvasFormat, 4)
    const { createDepthTexture, depthStencil, depthStencilAttachmentFactory } = generateDepthBuffer(
        device,
        canvas,
        4
    )

    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout, normalBufferLayout],
        canvasFormat,
        shaderCode,
        "triangle-list",
        { depthStencil, multisample, primitive: { frontFace: "ccw", cullMode: "back" } }
    )

    createDepthTexture()

    const angle = toRadians(0)
    const r = 4
    const h = 0
    const eye = vec3(r * Math.sin(angle), h, r * Math.cos(angle))
    const at = vec3(0)
    const up = vec3(0, 1, 0)
    const view = lookAtMatrix(eye, at, up)

    const perspective = perspectiveProjection(30, canvas.width / canvas.height, 0.1, 100)
    const projection = perspective //multMatrices( perspective)
    const projectionView = multMatrices(projection, view)

    const model = identity4x4()

    const projectionModel = multMatrices(projectionView, model)
    const { bindGroup: pvmBind, uniformBuffer: pvmBuffer } = createUniformBind(
        device,
        pipeline,
        new Float32Array([...flattenMatrix(projectionModel), ...eye, 1]),
        0
    )

    const updateRotation = (rotation: number) => {
        const angle = toRadians(rotation)
        const eye = vec3(r * Math.sin(angle), h, r * Math.cos(angle))
        const view = lookAtMatrix(eye, at, up)

        const projectionView = multMatrices(projection, view)
        const projectionModel = multMatrices(projectionView, model)

        writeToBufferF32(
            device,
            pvmBuffer,
            new Float32Array([...flattenMatrix(projectionModel), ...eye, 1]),
            0
        )

        draw()
    }

    subscribeToInput<number>(ROTATION_AROUND, updateRotation)

    const draw = () => {
        const { pass, executePass } = createPass(device, context, Colors.black, {
            depthStencilAttachmentFactory,
            msaaTexture,
        })

        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)
        pass.setVertexBuffer(1, normalBuffer)
        pass.setIndexBuffer(indexBuffer, "uint32")
        pass.setBindGroup(0, pvmBind)

        pass.drawIndexed(monkeyDrawingInfo.indices.length)

        executePass()
    }

    draw()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("The Blender Monkey")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactableSection = createInteractableSection()

    const rotationAngleSlider = createWithLabel(
        createRange(ROTATION_AROUND, 0, -180, 180, 1),
        "Rotation around the monkey"
    )

    interactableSection.append(rotationAngleSlider)
    canvasSection.append(canvas, interactableSection)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
