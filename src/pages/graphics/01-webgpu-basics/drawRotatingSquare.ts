import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import { Square } from "../../../libs/util/shapes"
import { flattenVector, vec2 } from "../../../libs/util/vector"

import { createCanvas, createText, createTitle } from "../../../libs/web"
import {
    initializeWebGPU,
    createPass,
    genreateVertexBuffer,
    setupShaderPipeline,
    createUniformBind,
} from "../../../libs/webgpu"

import shaderRotateWithTime from "./shaderRotateWithTime.wgsl?raw"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU("task3")
    const square = Square(vec2(0, 0), 1)
    const vertexArray = new Float32Array(flattenVector(square))
    const frame = (time: number) => {
        const { pass, executePass } = createPass(device, context, {
            r: 0.3921,
            g: 0.5843,
            b: 0.9294,
            a: 1.0,
        })
        const { bufferLayout: vertexBufferLayout, buffer: vertexBuffer } = genreateVertexBuffer(
            device,
            vertexArray,
            "float32x2"
        )
        const pipeline = setupShaderPipeline(
            device,
            [vertexBufferLayout],
            canvasFormat,
            shaderRotateWithTime
        )
        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)
        const timeArray = new Float32Array([time / 1e3])
        const timeBindGroup = createUniformBind(device, pipeline, timeArray)
        pass.setBindGroup(0, timeBindGroup)
        pass.draw(square.length)
        executePass()
        requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Spin me right round")
    const description = createText("This is a test description.")
    const canvas = createCanvas("task3")

    div.append(title, description, canvas)

    executeQueue.push(execute)
}

export default view
