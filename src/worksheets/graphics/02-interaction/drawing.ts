import { Executable, ExecutableQueue, ICanvasCoordinates, ViewGenerator } from "../../../types"

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
    createRange,
    createSelect,
    createText,
    createTitle,
    subscribeToButton,
    subscribeToCanvasClick,
    subscribeToInput,
    watchInput,
} from "../../../libs/web"

import {
    Circle,
    Square,
    colorToVec3,
    flatten,
    hexToColor,
    magnitude,
    mapRange,
    subtact,
    vec2,
    vec3,
    vectorByteLength,
} from "../../../libs/util"

import shaderCode from "./shader.wgsl?raw"

const CANVAS_ID = "drawing"
const DRAWING_MODE_SELECT_ID = "drawing-mode"
const DRAWING_MODES = ["POINT", "TRIANGLE", "CIRCLE"]
const POINT_COLOR_INPUT_ID = "points-color"
const BG_COLOR_INPUT_ID = "drawing-background-color"
const CIRCLE_GRANULARITY_SLIDER_ID = "granularity-slider"
const CLEAR_BTN_ID = "clear"

const execute: Executable = async () => {
    const { device, canvas, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    let backgroundColor = subscribeToInput<string>(BG_COLOR_INPUT_ID, (value: string) => {
        backgroundColor = value
        draw()
    })

    const getPointsColor = watchInput<string>(POINT_COLOR_INPUT_ID)
    const getDrawingMode = watchInput<string>(DRAWING_MODE_SELECT_ID)
    const getCircleGranularity = watchInput<number>(CIRCLE_GRANULARITY_SLIDER_ID)

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

    const handleCanvasClick = (coordinates: ICanvasCoordinates) => {
        switch (getDrawingMode()) {
            case "TRIANGLE":
                addTriangle(coordinates)
                break

            case "CIRCLE":
                addCircle(coordinates)
                break

            default:
            case "POINT":
                clearTracking()
                addPoint(coordinates)
                break
        }

        draw()
    }
    subscribeToCanvasClick(CANVAS_ID, handleCanvasClick)

    let lastPointIndex = 0
    let lastPointColorIndex = 0
    const addPoint = ({ x, y }: ICanvasCoordinates) => {
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
    }

    let previousClicks: ICanvasCoordinates[] = []
    let previousColors = [] as string[]
    const clearTracking = () => {
        previousClicks = []
        previousColors = []
    }

    const addTriangle = (coordinates: ICanvasCoordinates) => {
        previousClicks.push(coordinates)
        previousColors.push(getPointsColor())

        if (previousColors.length < 3) {
            addPoint(coordinates)
            return
        }

        const triangleVertexArray = new Float32Array(
            ([] as number[]).concat(
                ...previousClicks.map(({ x, y }) => {
                    const u = mapRange(x, 0, canvas.width, -1, 1)
                    const v = -1 * mapRange(y, 0, canvas.height, -1, 1)

                    return vec2(u, v)
                }),
                flatten(Array(9).fill(vec2()))
            )
        )
        device.queue.writeBuffer(
            pointsBuffer,
            lastPointIndex - 2 * 6 * vectorByteLength["float32x2"],
            triangleVertexArray
        )
        lastPointIndex += vectorByteLength["float32x2"] * (3 - 2 * 6)

        const triangleColorArray = new Float32Array(
            ([] as number[]).concat(
                ...flatten(previousColors.map(c => colorToVec3(hexToColor(c)))),
                flatten(Array(9).fill(vec3()))
            )
        )
        device.queue.writeBuffer(
            pointColorsBuffer,
            lastPointColorIndex - 2 * 6 * vectorByteLength["float32x3"],
            triangleColorArray
        )
        lastPointIndex += vectorByteLength["float32x3"] * (3 - 2 * 6)

        clearTracking()
    }

    const addCircle = (coordinates: ICanvasCoordinates) => {
        previousClicks.push(coordinates)
        previousColors.push(getPointsColor())

        if (previousClicks.length < 2) {
            addPoint(coordinates)
            return
        }

        const uvPoint1 = vec2(
            mapRange(previousClicks[0].x, 0, canvas.width, -1, 1),
            -1 * mapRange(previousClicks[0].y, 0, canvas.height, -1, 1)
        )

        const uvPoint2 = vec2(
            mapRange(previousClicks[1].x, 0, canvas.width, -1, 1),
            -1 * mapRange(previousClicks[1].y, 0, canvas.height, -1, 1)
        )

        const radius = magnitude(subtact(uvPoint2, uvPoint1))
        const circle = Circle(uvPoint1, radius, getCircleGranularity())

        const vertexArray = new Float32Array(flatten(circle))
        device.queue.writeBuffer(
            pointsBuffer,
            lastPointIndex - 6 * vectorByteLength["float32x2"],
            vertexArray
        )
        lastPointIndex += vectorByteLength["float32x2"] * (circle.length - 6)

        const colorArray = new Float32Array(
            flatten(
                [...new Array(circle.length)].map((_, i) => {
                    const colorIndex = i % 3 === 0 ? 0 : 1
                    return colorToVec3(hexToColor(previousColors[colorIndex]))
                })
            )
        )

        device.queue.writeBuffer(
            pointColorsBuffer,
            lastPointColorIndex - 6 * vectorByteLength["float32x3"],
            colorArray
        )
        lastPointColorIndex += vectorByteLength["float32x3"] * (circle.length - 6)

        clearTracking()
    }

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

    subscribeToButton(CLEAR_BTN_ID, clear)
    draw()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("A simple GPU-based drawing program")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactableSection = createInteractableSection()

    const select = createSelect(DRAWING_MODE_SELECT_ID, DRAWING_MODES)
    const pointColorPicker = createInputWithLabel(
        createColorPicker(POINT_COLOR_INPUT_ID, "#000000"),
        "Points color"
    )
    const backgroundColorPicker = createInputWithLabel(
        createColorPicker(BG_COLOR_INPUT_ID, "#ffffff"),
        "Background color"
    )
    const granularitySlider = createInputWithLabel(
        createRange(CIRCLE_GRANULARITY_SLIDER_ID, 12, 4, 32),
        "Circle granularity"
    )
    const drawButton = createButton(CLEAR_BTN_ID, "Clear canvas")

    interactableSection.append(
        select,
        pointColorPicker,
        granularitySlider,
        backgroundColorPicker,
        drawButton
    )
    canvasSection.append(canvas, interactableSection)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
