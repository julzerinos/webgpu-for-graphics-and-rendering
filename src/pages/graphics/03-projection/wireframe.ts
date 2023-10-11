import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    genreateVertexBuffer,
    setupShaderPipeline,
    genreateIndexBuffer,
    createUniformBind,
    writeToBuffer,
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
    Cube,
    flattenMatrix,
    flattenVector,
    lookAtMatrix,
    mat4,
    multMatrices,
    orthographicProjection,
    createRotationMatrix,
    vec3,
    createTranslateMatrix,
    identity4x4,
} from "../../../libs/util"

import shaderCode from "./wireframe.wgsl?raw"
import { IShapeInfo } from "../../../types/shapes"

const CANVAS_ID = "projections"
const WIREFRAME_ROTATION = "wireframe-rotation-slider"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const cube: IShapeInfo = Cube(vec3(0.5, 0.5, 0.5), 1)

    const lines = cube.lineIndices
    const vertices = new Float32Array(flattenVector(cube.vertices))

    const { buffer: indexBuffer } = genreateIndexBuffer(device, lines)
    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateVertexBuffer(
        device,
        vertices,
        "float32x4"
    )

    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout],
        canvasFormat,
        shaderCode,
        "line-list"
    )

    const { bindGroup: mvpBind, uniformBuffer: mvpBuffer } = createUniformBind(
        device,
        pipeline,
        new Float32Array(flattenMatrix(identity4x4())),
        0
    )

    const draw = (rotation: number) => {
        const rotationMatrix = createRotationMatrix(rotation, vec3(1, 1, 1))
        const translateMatrix = createTranslateMatrix(vec3(0, 0, 0))
        const model = multMatrices(rotationMatrix, translateMatrix)

        const eye = vec3(0, 0, 10)
        const at = vec3(0)
        const up = vec3(0, 1, 0)
        const view = lookAtMatrix(eye, at, up)

        const orthographic = orthographicProjection(-1.5, 1.5, -1.5, 1.5, 0, 100)
        const toNDC = mat4(
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            0.0,
            0.0,
            -0.5,
            0.5,
            0.0,
            0.0,
            0.0,
            1.0
        )
        const projection = multMatrices(toNDC, orthographic)

        const mvp = multMatrices(multMatrices(projection, view), model)
        writeToBuffer(device, mvpBuffer, new Float32Array(flattenMatrix(mvp)), 0)

        const { pass, executePass } = createPass(device, context, Colors.black)

        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)
        pass.setIndexBuffer(indexBuffer, "uint32")
        pass.setBindGroup(0, mvpBind)

        pass.drawIndexed(lines.length)

        executePass()
    }

    const startAngle = subscribeToInput<number>(WIREFRAME_ROTATION, draw)
    draw(startAngle)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Projecting a cube")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactableSection = createInteractableSection()

    const rotationSlide = createWithLabel(
        createRange(WIREFRAME_ROTATION, 45, 0, 360),
        "Rotation about (1, 1, 1)"
    )

    interactableSection.append(rotationSlide)
    canvasSection.append(canvas, interactableSection)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
