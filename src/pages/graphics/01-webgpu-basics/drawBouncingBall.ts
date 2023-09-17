import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import { Square } from "../../../libs/util/shapes"
import { flatten, vec2 } from "../../../libs/util/vector"

import {
    createCanvas,
    createCanvasSection,
    createWithLabel,
    createInteractableSection,
    createRange,
    createText,
    createTitle,
    watchInput,
} from "../../../libs/web"
import {
    initializeWebGPU,
    createPass,
    genreateBuffer,
    setupShaderPipeline,
    createBind,
} from "../../../libs/webgpu"

import shaderDrawCircle from "./shaderDrawCircle.wgsl?raw"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU("task4")

    const backgroundSquare = Square(vec2(0, 0), 2)
    const vertexArray = new Float32Array(flatten(backgroundSquare))

    const getHeight = watchInput<number>("ball-height")
    const getSize = watchInput<number>("ball-size")
    const getSpeed = watchInput<number>("ball-speed")

    const frame = (time: number) => {
        const { pass, executePass } = createPass(device, context, {
            r: 0.459,
            g: 0.882,
            b: 0.996,
            a: 1.0,
        })

        const { bufferLayout: vertexBufferLayout, buffer: vertexBuffer } = genreateBuffer(
            device,
            vertexArray,
            "float32x2"
        )
        const pipeline = setupShaderPipeline(
            device,
            [vertexBufferLayout],
            canvasFormat,
            shaderDrawCircle
        )

        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)

        const timeArray = new Float32Array([time / 1e3])
        const timeBindGroup = createBind(device, pipeline, timeArray)
        pass.setBindGroup(0, timeBindGroup)

        const ballArray = new Float32Array([getHeight(), getSpeed(), getSize()])
        const ballBindGroup = createBind(device, pipeline, ballArray, 1)
        pass.setBindGroup(1, ballBindGroup)

        pass.draw(backgroundSquare.length)
        executePass()

        requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Nokia memories")
    const description = createText("This is a test description.")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas("task4")
    const interactableSection = createInteractableSection()

    const heightInput = createWithLabel(
        createRange("ball-height", 0.3, 0.1, 0.9, 0.1),
        "Ball bounce height"
    )
    const speedInput = createWithLabel(
        createRange("ball-speed", 4, 1, 16),
        "Ball bounce speed"
    )
    const sizeInput = createWithLabel(
        createRange("ball-size", 1.05, 1.01, 1.5, 0.01),
        "Ball size"
    )

    interactableSection.append(heightInput, speedInput, sizeInput)
    canvasSection.append(canvas, interactableSection)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
