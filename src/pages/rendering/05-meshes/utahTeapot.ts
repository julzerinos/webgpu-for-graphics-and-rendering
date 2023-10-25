import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    createStorageBind,
    createUniformBind,
    writeToBufferU32,
} from "../../../libs/webgpu"

import {
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createSelect,
    createText,
    createTitle,
    createWithLabel,
    subscribeToInput,
} from "../../../libs/web"

import { color, flattenVector, objToShape, parseOBJ } from "../../../libs/util"

import shaderCode from "./utahTeapot.wgsl?raw"

const CANVAS_ID = "utah-teapot"
const SHADING_SELECT_TYPES = ["Flat", "Vertex normals"]
const SHADING_SELECT_TYPE_ID = "shading-select-ut"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)
    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

    const utahTeapotObj = await parseOBJ("models/bunny.obj")
    const utahTeapotShape = objToShape(utahTeapotObj, {})

    const { storageGroup: utahTrapotStorage } = createStorageBind(
        device,
        pipeline,
        [
            new Float32Array(flattenVector(utahTeapotShape.vertices)),
            new Uint32Array(flattenVector(utahTeapotShape.triangleIndices)),
            new Float32Array(flattenVector(utahTeapotShape.normals)),
        ],
        0
    )
    const { bindGroup: utahTeapotTriangleMetaBind, uniformBuffer: utahTeapotTriangleMetaBuffer } =
        createUniformBind(device, pipeline, new Uint32Array([utahTeapotShape.triangleCount, 0]), 1)

    const draw = (shadingType: "Flat" | "Vertex normals") => {
        const shadingTypeMap = {
            Flat: 0,
            "Vertex normals": 1,
        }

        writeToBufferU32(
            device,
            utahTeapotTriangleMetaBuffer,
            new Uint32Array([shadingTypeMap[shadingType]]),
            4
        )

        const { pass, executePass } = createPass(device, context, color(0.8, 0.4, 0.4, 1))

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, utahTrapotStorage)
        pass.setBindGroup(1, utahTeapotTriangleMetaBind)

        pass.draw(4)
        executePass()
    }

    const shadingType = subscribeToInput<"Flat" | "Vertex normals">(SHADING_SELECT_TYPE_ID, draw)

    draw(shadingType)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Introducing the Utah Teapot")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID, 840, 450)
    const interactables = createInteractableSection()

    const shadingSelect = createWithLabel(
        createSelect(SHADING_SELECT_TYPE_ID, SHADING_SELECT_TYPES, "Flat"),
        "Shading type",
        false
    )

    interactables.append(shadingSelect)
    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
