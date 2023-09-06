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
    watchInput,
} from "../../../libs/web"

import { Square, flatten, hexToColor } from "../../../libs/util"

const execute: Executable = async () => {
    const { device, canvas, context, canvasFormat } = await initializeWebGPU("drawing")

    const getColor = watchInput<string>("drawing-background-color")

    const draw = () => {
        const { pass, executePass } = createPass(device, context, hexToColor(getColor()))

        executePass()
    }

    subscribeToButton("redraw", draw)
    draw()

    // const squares = ([] as number[]).concat(
    //     flatten(Square([0, 0], 10 * (2 / canvas.height))),
    //     flatten(Square([1, 0], 10 * (2 / canvas.height))),
    //     flatten(Square([1, 1], 10 * (2 / canvas.height)))
    // )

    // const vertexArray = new Float32Array(squares)
    // const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateBuffer(
    //     device,
    //     vertexArray,
    //     "float32x2"
    // )

    // const pipeline = setupShaderPipeline(device, [vertexBufferLayout], canvasFormat, shaderBlack)

    // pass.setPipeline(pipeline)
    // pass.setVertexBuffer(0, vertexBuffer)
    // pass.draw(squares.length / 2)
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
