import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    genreateVertexBuffer,
    setupShaderPipeline,
    genreateIndexBuffer,
    writeToBufferF32,
    toNDC,
    createBind,
} from "../../../libs/webgpu"

import {
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createRange,
    createRelevantFilesLink,
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
    multMatrices,
    orthographicProjection,
    createRotationMatrix,
    vec3,
    createTranslateMatrix,
    identity4x4,
} from "../../../libs/util"

import shaderCode from "./wireframe.wgsl?raw"
import { IShapeInfo } from "../../../types/shapes"

const CANVAS_ID = "wireframe"
const WIREFRAME_ROTATION = "wireframe-rotation-slider"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const cube: IShapeInfo = Cube(vec3(0), 1)

    const lines = cube.lineIndices as Uint32Array
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

    const {
        bindGroup: mvpBind,
        buffers: [mvpBuffer],
    } = createBind(device, pipeline, [new Float32Array(flattenMatrix(identity4x4()))], "UNIFORM", 0)

    const translateMatrix = createTranslateMatrix(vec3(0.5, 0.5, 0.5))

    const eye = vec3(0, 0, 10)
    const at = vec3(0)
    const up = vec3(0, 1, 0)
    const view = lookAtMatrix(eye, at, up)

    const orthographic = orthographicProjection(-1.5, 1.5, -1.5, 1.5, 0, 100)
    const projection = multMatrices(toNDC, orthographic)
    const projectionView = multMatrices(projection, view)

    const draw = (rotation: number) => {
        const rotationMatrix = createRotationMatrix(rotation, vec3(1, 1, 1))
        const model = multMatrices(rotationMatrix, translateMatrix)

        const mvp = multMatrices(projectionView, model)
        writeToBufferF32(device, mvpBuffer, new Float32Array(flattenMatrix(mvp)), 0)

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
    const a = createRelevantFilesLink("graphics/03-projection", [
        "/wireframe.ts",
        "/wireframe.wgsl",
    ])

    const title = createTitle("Projecting a cube")
    const description = createText(`
Along the journey in the direction of 3D scenes from 2D shapes a key stop is orthographic projection, known for its use in early game development (or in modern, as a stylistic choice).
This projection assumes a volume created by lines directly perpendicular to the image plane.

Wireframe rendering (using lines instead of triangles) is a simplification which can be used to observe the shape without having to deal with side differentiaion (through shading or unique colors).
`)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactableSection = createInteractableSection()

    const rotationSlide = createWithLabel(
        createRange(WIREFRAME_ROTATION, 45, 0, 360),
        "Rotation in degrees about (1, 1, 1)"
    )

    interactableSection.append(rotationSlide)
    canvasSection.append(canvas, interactableSection)
    div.append(title, a, description, canvasSection)

    executeQueue.push(execute)
}

export default view
