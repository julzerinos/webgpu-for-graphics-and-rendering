import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import { flatten, vec2, vec3 } from "../../../libs/util/vector"

import { createCanvas, createText, createTitle } from "../../../libs/web"
import {
    initializeWebGPU,
    createPass,
    genreateBuffer,
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

    const vertexArray = new Float32Array(flatten(triangle))
    const colorArray = new Float32Array(flatten(colors))

    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateBuffer(
        device,
        vertexArray,
        "float32x2"
    )
    const { buffer: colorBuffer, bufferLayout: colorBufferLayout } = genreateBuffer(
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
    const title = createTitle("Triangles all the way down.")
    const description = createText("This is a test description.")
    const canvas = createCanvas("task2")

    div.append(title, description, canvas)

    executeQueue.push(execute)
}

export default view
