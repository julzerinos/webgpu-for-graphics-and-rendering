import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    genreateVertexBuffer,
    setupShaderPipeline,
    genreateIndexBuffer,
    toNDC,
    createBind,
} from "../../../libs/webgpu"

import {
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createRelevantFilesLink,
    createText,
    createTitle,
} from "../../../libs/web"

import {
    Colors,
    Cube,
    flattenVector,
    lookAtMatrix,
    multMatrices,
    createRotationMatrix,
    vec3,
    createTranslateMatrix,
    perspectiveProjection,
    vec4,
    flattenMatrices,
} from "../../../libs/util"

import shaderCode from "./perspective.wgsl?raw"
import { IShapeInfo } from "../../../types/shapes"

const CANVAS_ID = "perspective"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const cube: IShapeInfo = Cube(vec3(0), 1)

    const vertices = new Float32Array(flattenVector(cube.vertices))
    const lines = cube.lineIndices as Uint32Array

    const { buffer: indexBuffer } = genreateIndexBuffer(device, lines)
    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateVertexBuffer(
        device,
        vertices,
        "float32x4"
    )
    const { buffer: colorBuffer, bufferLayout: colorBufferLayout } = genreateVertexBuffer(
        device,
        new Float32Array(
            flattenVector([
                vec4(0.5, 0.5, 0.5, 1),
                vec4(0, 0, 1, 1),
                vec4(0, 1, 0, 1),
                vec4(0, 1, 1, 1),
                vec4(1, 0, 1, 1),
                vec4(1, 0, 0, 1),
                vec4(1, 1, 0, 1),
                vec4(1, 1, 1, 1),
            ])
        ),
        "float32x4",
        1
    )

    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout, colorBufferLayout],
        canvasFormat,
        shaderCode,
        "line-list"
    )

    const eye = vec3(0, 0, 5)
    const at = vec3(0)
    const up = vec3(0, 1, 0)
    const view = lookAtMatrix(eye, at, up)

    const perspective = perspectiveProjection(45, canvas.width / canvas.height, 0.1, 100)
    const projection = multMatrices(toNDC, perspective)
    const projectionView = multMatrices(projection, view)

    const model1Point = multMatrices(
        createRotationMatrix(0, vec3(1, 1, 1)),
        createTranslateMatrix(vec3(-2))
    )
    const model2Point = multMatrices(
        createRotationMatrix(45, vec3(0, 1, 0)),
        createTranslateMatrix(vec3(0))
    )
    const model3Point = multMatrices(
        createTranslateMatrix(vec3(2)),
        createRotationMatrix(45, vec3(1, 1, 0))
    )

    const projectionModel1Point = multMatrices(projectionView, model1Point)
    const projectionModel2Point = multMatrices(projectionView, model2Point)
    const projectionModel3Point = multMatrices(projectionView, model3Point)
    const { bindGroup: mvpsBind } = createBind(
        device,
        pipeline,
        [
            new Float32Array(
                flattenMatrices([
                    projectionModel1Point,
                    projectionModel2Point,
                    projectionModel3Point,
                ])
            ),
        ],
        "UNIFORM",
        0
    )

    const draw = () => {
        const { pass, executePass } = createPass(device, context, Colors.black)

        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)
        pass.setVertexBuffer(1, colorBuffer)
        pass.setIndexBuffer(indexBuffer, "uint32")
        pass.setBindGroup(0, mvpsBind)

        pass.drawIndexed(lines.length, 3)

        executePass()
    }

    draw()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const a = createRelevantFilesLink("graphics/03-projection", [
        "/perspective.ts",
        "/perspective.wgsl",
    ])

    const title = createTitle("Considering different perspectives")
    const description = createText(`
The commonly used projection is perspective projection which imitates real life cameras and human eyes. 
A common instance of perspective projection is the pinhole camera model.

The perspective model assumes camera rays have a single point oigin (the eye point) and create a 3D trapezoidal view volume by crossing the image plane.

Another key tool in managing objects on the GPU is instancing, a conceptual sibling to the flyweight design pattern. 
Multiples of an object which can be clearly differentiated by their extrinsic attributes (pose, color, size, etc.) can be instanced. 
A single set of their intrinsic attributes is enough to generate multiple instances and then, to adjust pose for example, apply a respective model matrix. With this method three cubes can be instanced from a single cube mesh definition. 

A further subclassification of perspective projections is based on number of vanishing points they consider. A vanishing point is generated by a non-parallel principal direction. 
The base case is one-point perspective projection (left), where the two other principal directions are parallel to the image plane, but there exists also two- (middle) and three-point (right) projections with one and none parallel principal directions respectively.
    `)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID, { width: 1028 - 128 })
    const interactableSection = createInteractableSection()

    canvasSection.append(canvas, interactableSection)
    div.append(title, a, description, canvasSection)

    executeQueue.push(execute)
}

export default view
