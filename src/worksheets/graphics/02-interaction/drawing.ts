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
    subscribeToInput,
    watchInput,
} from "../../../libs/web"

import {
    Square,
    colorToVec3,
    flatten,
    hexToColor,
    mapRange,
    vec2,
    vectorByteLength,
} from "../../../libs/util"

import shaderCode from "./shader.wgsl?raw"

const execute: Executable = async () => {
    const { device, canvas, context, canvasFormat } = await initializeWebGPU("drawing")

    let backgroundColor = "#FFFFFF"
    subscribeToInput<string>("drawing-background-color", (value: string) => {
        backgroundColor = value
        draw()
    })

    const getPointsColor = watchInput<string>("points-color")

    const maxPoints = 1000
    const pointsArray = new Float32Array(6 * maxPoints * vectorByteLength["float32x2"])
    const { buffer: pointsBuffer, bufferLayout: pointsBufferLayout } = genreateBuffer(
        device,
        pointsArray,
        "float32x2"
    )
    const pointColorsArray = new Float32Array(6 * maxPoints * vectorByteLength["float32x3"])
    const { buffer: pointColorsBuffer, bufferLayout: pointColorsBufferLayout } = genreateBuffer(
        device,
        pointColorsArray,
        "float32x3",
        1
    )

    const pipeline = setupShaderPipeline(
        device,
        [pointsBufferLayout, pointColorsBufferLayout],
        canvasFormat,
        shaderCode,
        "triangle-list"
    )

    let lastPointIndex = 0
    let lastPointColorIndex = 0
    const addPoint = (x: number, y: number) => {
        const u = mapRange(x, 0, canvas.width, -1, 1)
        const v = -1 * mapRange(y, 0, canvas.height, -1, 1)

        const point = Square(vec2(u, v), 10 / canvas.height)
        const pointArray = new Float32Array(flatten(point))
        device.queue.writeBuffer(pointsBuffer, lastPointIndex, pointArray)
        lastPointIndex += 6 * vectorByteLength["float32x2"]

        const colors = Array(6).fill(colorToVec3(hexToColor(getPointsColor())))
        const colorArray = new Float32Array(flatten(colors))
        device.queue.writeBuffer(pointColorsBuffer, lastPointColorIndex, colorArray)
        lastPointColorIndex += 6 * vectorByteLength["float32x3"]

        draw()
    }
    subscribeToCanvasClick("drawing", addPoint)

    const draw = () => {
        const { pass, executePass } = createPass(device, context, hexToColor(backgroundColor))

        pass.setPipeline(pipeline)

        pass.setVertexBuffer(0, pointsBuffer)
        pass.setVertexBuffer(1, pointColorsBuffer)

        pass.draw(6 * maxPoints)

        executePass()
    }

    const clear = () => {
        device.queue.writeBuffer(
            pointsBuffer,
            0,
            new Float32Array(6 * maxPoints * vectorByteLength["float32x2"])
        )

        device.queue.writeBuffer(
            pointColorsBuffer,
            0,
            new Float32Array(6 * maxPoints * vectorByteLength["float32x3"])
        )

        draw()
    }

    subscribeToButton("clear", clear)
    draw()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("A simple GPU-based drawing program")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas("drawing")
    const interactableSection = createInteractableSection()

    const pointColorPicker = createInputWithLabel(
        createColorPicker("points-color", "#000000"),
        "Points color"
    )
    const backgroundColorPicker = createInputWithLabel(
        createColorPicker("drawing-background-color", "#ffffff"),
        "Background color"
    )
    const drawButton = createButton("clear", "Clear canvas")

    interactableSection.append(pointColorPicker, backgroundColorPicker, drawButton)
    canvasSection.append(canvas, interactableSection)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
