import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    genreateBuffer,
    setupShaderPipeline,
} from "../../../libs/webgpu"

import {
    createButton,
    createCanvas,
    createCanvasSection,
    createColorPicker,
    createInputWithLabel,
    createInteractableSection,
    createText,
    createTitle,
    subscribeToButton,
    subscribeToCanvasClick,
    watchInput,
} from "../../../libs/web"

import { Square, flatten, hexToColor, vec2, vectorSizes } from "../../../libs/util"

import shaderBlack from "./shaderBlack.wgsl?raw"

const execute: Executable = async () => {
    const { device, canvas, context, canvasFormat } = await initializeWebGPU("drawing")

    const getColor = watchInput<string>("drawing-background-color")

    const vertexArray = new Float32Array(6 * 1000 * vectorSizes["float32x2"])
    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateBuffer(
        device,
        vertexArray,
        "float32x2"
    )

    const pipeline = setupShaderPipeline(device, [vertexBufferLayout], canvasFormat, shaderBlack)

    let lastFloatIndex = 0
    const addPoint = (x: number, y: number) => {
        const point = Square(vec2(x, y), 1)
        const array = new Float32Array(flatten(point))

        device.queue.writeBuffer(vertexBuffer, lastFloatIndex, array)

        draw()
    }
    subscribeToCanvasClick("drawing", addPoint)

    const draw = () => {
        const { pass, executePass } = createPass(device, context, hexToColor(getColor()))
        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)
        pass.draw(1000)

        executePass()
    }

    subscribeToButton("redraw", draw)
    draw()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("A simple GPU-based drawing program")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas("drawing")
    const interactableSection = createInteractableSection()

    const colorPicker = createInputWithLabel(
        createColorPicker("drawing-background-color", "#ffffff"),
        "Canvas redraw color"
    )
    const drawButton = createButton("redraw", "Redraw canvas")

    interactableSection.append(colorPicker, drawButton)
    canvasSection.append(canvas, interactableSection)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
