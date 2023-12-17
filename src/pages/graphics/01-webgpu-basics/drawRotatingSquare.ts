import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import { Square } from "../../../libs/util/shapes"
import { flattenVector, vec2 } from "../../../libs/util/vector"

import { createCanvas, createCanvasSection, createText, createTitle } from "../../../libs/web"
import {
    initializeWebGPU,
    createPass,
    genreateVertexBuffer,
    setupShaderPipeline,
    writeToBufferF32,
    createBind,
} from "../../../libs/webgpu"

import shaderRotateWithTime from "./shaderRotateWithTime.wgsl?raw"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU("task3")
    const square = Square(vec2(0, 0), 1)
    const vertexArray = new Float32Array(flattenVector(square))

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
    const {
        bindGroup: timeBindGroup,
        buffers: [timeBuffer],
    } = createBind(device, pipeline, [new Float32Array(1)], "UNIFORM")

    const frame = (time: number) => {
        writeToBufferF32(device, timeBuffer, new Float32Array([time / 1e3]), 0)

        const { pass, executePass } = createPass(device, context, {
            r: 0.3921,
            g: 0.5843,
            b: 0.9294,
            a: 1.0,
        })

        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)
        pass.setBindGroup(0, timeBindGroup)

        pass.draw(square.length)

        executePass()
        requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Move, please")
    const description = createText(`
A static triangle is hardly anything to write home about. Getting the shapes to move (or better - react to input) is what makes this whole endevour worthwhile.
The GPU does not have a concept of human time. To be fair, time is not much more than a constantly increasing linear value and should be just that.

While vertex buffers are key to generate shapes in the virtual space, storage and uniform buffers are optionally used to provide auxiliary data to the GPU. 
Time, just like any other variable, can then be fed into the mathematical algorithms defined in shaders to create a property function dependent on time.

Trigonometric functions (especially sinusoidal waves) soon become a shader author's best friend.
`)
    const canvas = createCanvas("task3")

    const canvasSection = createCanvasSection()
    canvasSection.append(canvas)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
