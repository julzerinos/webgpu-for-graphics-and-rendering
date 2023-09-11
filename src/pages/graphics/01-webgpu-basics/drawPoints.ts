import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import { createCanvas, createText, createTitle } from "../../../libs/web"
import {
    initializeWebGPU,
    createPass,
    genreateBuffer,
    setupShaderPipeline,
} from "../../../libs/webgpu"

import { Square, flatten } from "../../../libs/util"

import shaderBlack from "./shaderBlack.wgsl?raw"

const execute: Executable = async () => {
    const { device, canvas, context, canvasFormat } = await initializeWebGPU("task1")

    const { pass, executePass } = createPass(device, context, {
        r: 0.3921,
        g: 0.5843,
        b: 0.9294,
        a: 1.0,
    })

    const squares = ([] as number[]).concat(
        flatten(Square([0, 0], 10 * (2 / canvas.height))),
        flatten(Square([1, 0], 10 * (2 / canvas.height))),
        flatten(Square([1, 1], 10 * (2 / canvas.height)))
    )

    const vertexArray = new Float32Array(squares)
    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateBuffer(
        device,
        vertexArray,
        "float32x2"
    )

    const pipeline = setupShaderPipeline(device, [vertexBufferLayout], canvasFormat, shaderBlack)

    pass.setPipeline(pipeline)
    pass.setVertexBuffer(0, vertexBuffer)
    pass.draw(squares.length / 2)

    executePass()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("The three pixeleers")
    const description = createText("This is a test description.")
    const canvas = createCanvas("task1")

    div.append(title, description, canvas)

    executeQueue.push(execute)
}

export default view
