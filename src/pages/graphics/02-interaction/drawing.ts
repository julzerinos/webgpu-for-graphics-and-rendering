import { Executable, ExecutableQueue, ICanvasCoordinates, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    genreateVertexBuffer,
    setupShaderPipeline,
} from "../../../libs/webgpu"

import {
    createButton,
    createCanvas,
    createCanvasSection,
    createColorPicker,
    createWithLabel,
    createInteractableSection,
    createRange,
    createSelect,
    createText,
    createTitle,
    subscribeToButton,
    subscribeToCanvasClick,
    subscribeToInput,
    watchInput,
    createValueDisplay,
    createDisplaySetter,
} from "../../../libs/web"

import {
    Circle,
    Square,
    colorToVec3,
    flattenVector,
    hexToColor,
    magnitude,
    mapRange,
    subtract,
    vec2,
    vec3,
} from "../../../libs/util"

import shaderCode from "./shader.wgsl?raw"
import { vectorByteLength } from "../../../libs/util/byteLengths"

const CANVAS_ID = "drawing"
const DRAWING_MODE_SELECT_ID = "drawing-mode"
const DRAWING_MODES = ["POINT", "TRIANGLE", "CIRCLE"]
const POINT_COLOR_INPUT_ID = "points-color"
const BG_COLOR_INPUT_ID = "drawing-background-color"
const CIRCLE_GRANULARITY_SLIDER_ID = "granularity-slider"
const POINT_SIZE_SLIDER_ID = "size-slider"
const CLEAR_BTN_ID = "clear"

const execute: Executable = async () => {
    const { device, canvas, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    let backgroundColor = subscribeToInput<string>(BG_COLOR_INPUT_ID, (value: string) => {
        backgroundColor = value
        draw()
    })

    const setInstruction = createDisplaySetter("display-draw-instruction")
    const getPointsColor = watchInput<string>(POINT_COLOR_INPUT_ID)
    const getDrawingMode = watchInput<string>(DRAWING_MODE_SELECT_ID)
    const getCircleGranularity = watchInput<number>(CIRCLE_GRANULARITY_SLIDER_ID)
    const getPointSize = watchInput<number>(POINT_SIZE_SLIDER_ID)

    const maxPoints = 1000
    const pointsArray = new Float32Array(6 * maxPoints * vectorByteLength["float32x2"])
    const { buffer: pointsBuffer, bufferLayout: pointsBufferLayout } = genreateVertexBuffer(
        device,
        pointsArray,
        "float32x2"
    )
    const pointColorsArray = new Float32Array(6 * maxPoints * vectorByteLength["float32x3"])
    const { buffer: pointColorsBuffer, bufferLayout: pointColorsBufferLayout } =
        genreateVertexBuffer(device, pointColorsArray, "float32x3", 1)

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

        const point = Square(vec2(u, v), getPointSize() / canvas.height)
        const pointArray = new Float32Array(flattenVector(point))
        device.queue.writeBuffer(pointsBuffer, lastPointIndex, pointArray)
        lastPointIndex += 6 * vectorByteLength["float32x2"]

        const colors = Array(6).fill(colorToVec3(hexToColor(getPointsColor())))
        const colorArray = new Float32Array(flattenVector(colors))
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
                flattenVector(Array(9).fill(vec2()))
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
                ...flattenVector(previousColors.map(c => colorToVec3(hexToColor(c)))),
                flattenVector(Array(9).fill(vec3()))
            )
        )
        device.queue.writeBuffer(
            pointColorsBuffer,
            lastPointColorIndex - 2 * 6 * vectorByteLength["float32x3"],
            triangleColorArray
        )
        lastPointColorIndex += vectorByteLength["float32x3"] * (3 - 2 * 6)

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

        const radius = magnitude(subtract(uvPoint2, uvPoint1))
        const circle = Circle(uvPoint1, radius, getCircleGranularity())

        const vertexArray = new Float32Array(flattenVector(circle))
        device.queue.writeBuffer(
            pointsBuffer,
            lastPointIndex - 6 * vectorByteLength["float32x2"],
            vertexArray
        )
        lastPointIndex += vectorByteLength["float32x2"] * (circle.length - 6)

        const colorArray = new Float32Array(
            flattenVector(
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

    subscribeToInput(DRAWING_MODE_SELECT_ID, type => {
        setInstruction(
            {
                POINT: "Click to create a point",
                TRIANGLE: "Create three points to form a triangle",
                CIRCLE: "Create two points to form a circle",
            }[type]
        )
    })
    setInstruction("Click to create a point")

    draw()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Drawing with WebGPU")
    const description = createText(`
The basic test to validate any computer graphics framework is to check if it has all the tools to create a drawing application. A basic drawing program should be able to at least support drawing points, triangles and circles.

In the case of utilizing WebGPU, the program will be built with the following setup. Shapes will be fed into the graphics pipeline as triangles. 
The vertex buffer will be initialized with an amount of empty triangles to support creating shapes until boredom for the average human.
The interaction is powered by HTML Canvas mouse event listeners.

Starting with the easiest of the shapes to implement - points. As in the previous page, points are actually two little triangles. Six vertices (actually four unique) create a square with its center at the click point. 
This is a run and done operation, one click results in one shape. The appropriate partition in the vertex buffer is populated with the new vertex positions.

A triangle is slightly more complicated in that two operations are being made at the same time. Before the user clicks all three vertices, two points exist (to indicate previous vertices).
Once the third triangle vertex is selected, the pervious two points should be overwritten. It is important to remember that a point is already two triangles, therefore the vertex buffer is modified to replace four temporary triangles with the final single triangle (making sure to clear the previously used space in the buffer to avoid corrupting the shape data).

A circle is a fan of triangles indicated by two user-selected points. In this case, the (single) temporary point is overwritten with the required amount of triangles to create a circle with the selected granularity.
The granularity is a measure of the circle's resolution - how many triangles are used to form the shape.

Apart from the vertex buffer, a secondary color (vertex) buffer is also manipulated to store the shape's colors. The pipeline will then automatically interpolate between the user-selected points. You can observe this by changing the draw color before finishing a triangle or circle.
`)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactableSection = createInteractableSection()

    const display = createValueDisplay("display-draw-instruction")

    const select = createSelect(DRAWING_MODE_SELECT_ID, DRAWING_MODES)
    const pointColorPicker = createWithLabel(
        createColorPicker(POINT_COLOR_INPUT_ID, "#000000"),
        "Draw color"
    )
    const backgroundColorPicker = createWithLabel(
        createColorPicker(BG_COLOR_INPUT_ID, "#ffffff"),
        "Background color"
    )
    const pointSizeSlider = createWithLabel(
        createRange(POINT_SIZE_SLIDER_ID, 10, 2, 100),
        "Point size"
    )
    const granularitySlider = createWithLabel(
        createRange(CIRCLE_GRANULARITY_SLIDER_ID, 12, 4, 32),
        "Circle granularity"
    )
    const drawButton = createButton(CLEAR_BTN_ID, "Clear canvas")

    interactableSection.append(
        display,
        select,
        pointColorPicker,
        pointSizeSlider,
        granularitySlider,
        backgroundColorPicker,
        drawButton
    )
    canvasSection.append(canvas, interactableSection)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
