import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import { flattenVector, vec2, vec3 } from "../../../libs/util/vector"

import {
    createCanvas,
    createCanvasSection,
    createRelevantFilesLink,
    createText,
    createTitle,
} from "../../../libs/web"
import {
    initializeWebGPU,
    createPass,
    genreateVertexBuffer,
    setupShaderPipeline,
} from "../../../libs/webgpu"

import shaderColor from "./shaderColor.wgsl?raw"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU("task2")

    const { pass, executePass } = createPass(device, context, {
        r: 0.3921,
        g: 0.5843,
        b: 0.9294,
        a: 1.0,
    })

    const triangle = [vec2(0, 0), vec2(1, 0), vec2(1, 1)]
    const colors = [vec3(1, 0, 0), vec3(0, 1, 0), vec3(0, 0, 1)]

    const vertexArray = new Float32Array(flattenVector(triangle))
    const colorArray = new Float32Array(flattenVector(colors))

    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateVertexBuffer(
        device,
        vertexArray,
        "float32x2"
    )
    const { buffer: colorBuffer, bufferLayout: colorBufferLayout } = genreateVertexBuffer(
        device,
        colorArray,
        "float32x3",
        1
    )

    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout, colorBufferLayout],
        canvasFormat,
        shaderColor
    )

    pass.setPipeline(pipeline)

    pass.setVertexBuffer(0, vertexBuffer)
    pass.setVertexBuffer(1, colorBuffer)
    pass.draw(triangle.length)

    executePass()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const a = createRelevantFilesLink("graphics/01-webgpu-basics", [
        "/drawTriangle.ts",
        "/shaderColor.wgsl",
    ])

    const title = createTitle("A formal introduction to the triangle")
    const description = createText(`
The triangle was mentioned in the previous section, but a passing mention does not do enough to emphasis the role this simple shape plays in the world of computer graphics.
The triangle, a shape made of any three unique vertices, is the most commonly used building block of virtual worlds.

The reasons (beyond simply stating this is how it was always done) come from the mathematical simplicity of the shape.
The triangle has the lowest number of vertices (points) which generate a flat surface polygon. The triangle also has a powerful feature which elevates it above its more complex cousins - Barycentric coordinates.

The set of three factors are crucial to smoothly interpolate values over the surface of the triangle (across the "axes" of its three points). 
Not only is this used to calculate the fragments which belong to the triangle between its points, but can be extended to support any attribute such as colors (see below) or as will soon be shown normals and texture coordinates.

Almost any complex graphical shape is now a collection of a multiple of three vertex points waiting to be interpolated.
`)

    const canvas = createCanvas("task2")
    const canvasSection = createCanvasSection()
    canvasSection.append(canvas)
    div.append(title, a, description, canvasSection)

    executeQueue.push(execute)
}

export default view
