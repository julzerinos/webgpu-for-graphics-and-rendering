import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import { createCanvas, createCanvasSection, createText, createTitle } from "../../../libs/web"
import {
    initializeWebGPU,
    createPass,
    genreateVertexBuffer,
    setupShaderPipeline,
} from "../../../libs/webgpu"

import { Square, flattenVector } from "../../../libs/util"

import shaderBlack from "./shaderBlack.wgsl?raw"

const execute: Executable = async () => {
    const { device, canvas, context, canvasFormat } = await initializeWebGPU("task1")

    const squares = ([] as number[]).concat(
        flattenVector(Square([0, 0], 10 * (2 / canvas.height))),
        flattenVector(Square([1, 0], 10 * (2 / canvas.height))),
        flattenVector(Square([1, 1], 10 * (2 / canvas.height)))
    )

    const vertexArray = new Float32Array(squares)
    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateVertexBuffer(
        device,
        vertexArray,
        "float32x2"
    )

    const pipeline = setupShaderPipeline(device, [vertexBufferLayout], canvasFormat, shaderBlack)

    const { pass, executePass } = createPass(device, context, {
        r: 0.3921,
        g: 0.5843,
        b: 0.9294,
        a: 1.0,
    })
    pass.setPipeline(pipeline)
    pass.setVertexBuffer(0, vertexBuffer)
    pass.draw(squares.length / 2)

    executePass()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Hello (GPU) world")
    const description = createText(`
With WebGPU, even the simplest 'Hello world!' exercise is already met with an obstacle. 
Points, the most primitive of shapes, are drawn to the screen as single pixels. 
This could work for low resolution images, but targeting something larger requires transforming the pixels into quads (two triangles forming a square) of the desired size.

The quads are transformed into a vertex buffer (flattened array of vector components) and attached to the render pass before the draw command. 
With this, the first step has been made. 
Displaying anything on the screen is just a trivial extension of drawing some points, really.
        `)
        
    const canvas = createCanvas("task1")

    const canvasSection = createCanvasSection()
    canvasSection.append(canvas)

    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
