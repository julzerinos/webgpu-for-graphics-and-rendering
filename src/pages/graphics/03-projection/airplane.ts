import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    genreateVertexBuffer,
    setupShaderPipeline,
    genreateIndexBuffer,
    createUniformBind,
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
    Colors,
    Cube,
    flattenVector,
    lookAtMatrix,
    multMatrices,
    vec3,
    createTranslateMatrix,
    perspectiveProjection,
    flattenMatrices,
    createScaleMatrix,
} from "../../../libs/util"

import shaderCode from "./airplane.wgsl?raw"
import { IShapeInfo } from "../../../types/shapes"

const CANVAS_ID = "airplane"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const cube: IShapeInfo = Cube(vec3(0), 1)
    const vertices = new Float32Array(flattenVector(cube.vertices))
    const { buffer: indexBuffer } = genreateIndexBuffer(device, cube.lineIndices)
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

    const eye = vec3(5, 5, 5)
    const at = vec3(0)
    const up = vec3(0, 1, 0)
    const view = lookAtMatrix(eye, at, up)
    const perspective = perspectiveProjection(45, canvas.width / canvas.height, 0.1, 100)
    const projection = multMatrices(toNDC, perspective)
    const projectionView = multMatrices(projection, view)

    const fusealgeModel = createScaleMatrix(0.4, 0.4, 2)
    const cockpitModel = multMatrices(
        createScaleMatrix(0.35, 0.25, 0.35),
        createTranslateMatrix(vec3(0, -0.2, 3.3))
    )
    const wingLeft = multMatrices(
        createScaleMatrix(1.7, 0.2, 1.1),
        createTranslateMatrix(vec3(0.6))
    )
    const wingRight = multMatrices(
        createScaleMatrix(1.7, 0.2, 1.1),
        createTranslateMatrix(vec3(-0.6))
    )
    const verticalStabilizerModel = multMatrices(
        createScaleMatrix(0.2, 0.5, 0.3),
        createTranslateMatrix(vec3(0, 0.5, -3.3))
    )

    const allModels = [
        fusealgeModel,
        cockpitModel,
        wingLeft,
        wingRight,
        verticalStabilizerModel,
    ].map(m => multMatrices(projectionView, m))

    const { bindGroup: mvpsBind } = createUniformBind(
        device,
        pipeline,
        new Float32Array(flattenMatrices(allModels)),
        0
    )

    // https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/airplane-parts-function/

    // const { bindGroup: instanceColorsBind } = createUniformBind(
    //     device,
    //     pipeline,
    //     new Float32Array(),
    //     1
    // )

    const draw = () => {
        const { pass, executePass } = createPass(device, context, Colors.black)

        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)
        pass.setIndexBuffer(indexBuffer, "uint32")
        pass.setBindGroup(0, mvpsBind)

        pass.drawIndexed(cube.lineIndices.length, allModels.length)

        executePass()
    }

    draw()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Projecting a cube")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactableSection = createInteractableSection()

    canvasSection.append(canvas, interactableSection)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
