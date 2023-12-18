import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import { Square } from "../../../libs/util/shapes"
import { flattenVector, vec2 } from "../../../libs/util/vector"

import {
    createCanvas,
    createCanvasSection,
    createWithLabel,
    createInteractableSection,
    createRange,
    createText,
    createTitle,
    watchInput,
    createRelevantFilesLink,
} from "../../../libs/web"
import {
    initializeWebGPU,
    createPass,
    genreateVertexBuffer,
    setupShaderPipeline,
    writeToBufferF32,
    createBind,
} from "../../../libs/webgpu"

import shaderDrawCircle from "./shaderDrawCircle.wgsl?raw"
import { Colors } from "../../../libs/util"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU("task4")

    const backgroundSquare = Square(vec2(0, 0), 2)
    const vertexArray = new Float32Array(flattenVector(backgroundSquare))

    const getHeight = watchInput<number>("ball-height")
    const getSize = watchInput<number>("ball-size")
    const getSpeed = watchInput<number>("ball-speed")

    const { bufferLayout: vertexBufferLayout, buffer: vertexBuffer } = genreateVertexBuffer(
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

    const {
        bindGroup: timeBindGroup,
        buffers: [timeBuffer],
    } = createBind(device, pipeline, [new Float32Array([0])], "UNIFORM")
    const {
        bindGroup: ballBindGroup,
        buffers: [ballBuffer],
    } = createBind(device, pipeline, [new Float32Array(3)], "UNIFORM", 1)

    const frame = (time: number) => {
        writeToBufferF32(device, timeBuffer, new Float32Array([time / 1e3]), 0)
        writeToBufferF32(
            device,
            ballBuffer,
            new Float32Array([getHeight(), getSpeed(), getSize()]),
            0
        )

        const { pass, executePass } = createPass(device, context, Colors.blueScreenBlue)

        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)

        pass.setBindGroup(0, timeBindGroup)
        pass.setBindGroup(1, ballBindGroup)

        pass.draw(backgroundSquare.length)

        executePass()
        requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const a = createRelevantFilesLink("graphics/01-webgpu-basics", [
        "/drawBouncingBall.ts",
        "/shaderDrawCircle.wgsl",
    ])

    const title = createTitle("Interacting with a scene")
    const description = createText(`
Just as time can be provided to the GPU, so can any other relevant attribute, property or value which has to be controlled externally by the CPU.

While a circle could be defined as fan of triangles defined by vertices laying on a circle, it is important to remember that circles are pointless.
Pointless, but ever so important. No matter how many vertices define a circle, it will never be a resolution-independent circle.

An alternative is to define circles in the conceptual space of the fragement shader as a boolean function of distance to the circle center. 
To do this, the circle can only exist on the surface of another shape such as a quad. The black space in the canvas below is actually the color of quad. 
The ball is being rendered on the quad's surface, much like a screen displaying a video.
`)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas("task4")
    const interactableSection = createInteractableSection()

    const heightInput = createWithLabel(
        createRange("ball-height", 0.3, 0.1, 0.9, 0.1),
        "Ball bounce height"
    )
    const speedInput = createWithLabel(createRange("ball-speed", 4, 1, 16), "Ball bounce speed")
    const sizeInput = createWithLabel(createRange("ball-size", 1.05, 1.01, 1.5, 0.01), "Ball size")

    interactableSection.append(heightInput, speedInput, sizeInput)
    canvasSection.append(canvas, interactableSection)
    div.append(title, a, description, canvasSection)

    executeQueue.push(execute)
}

export default view
