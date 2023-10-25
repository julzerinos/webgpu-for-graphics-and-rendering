import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    createStorageBind,
    createUniformBind,
    writeToBufferU32,
    genreateVertexBuffer,
    genreateIndexBuffer,
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
    watchInput,
} from "../../../libs/web"

import {
    Colors,
    DrawingInfo,
    flattenVector,
    getDrawingInfo,
    objToShape,
    parseOBJ,
    vec4,
} from "../../../libs/util"

import shaderCode from "./partitioning.wgsl?raw"

const CANVAS_ID = "bsp"
const MODELS = {
    Teapot: "models/teapot.obj",
    Bunny: "models/bunny.obj",
    Dragon: "models/dragon.obj",
} as { [key: string]: string }
const MODEL_SELECT_ID = "model-select-bsp"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const modelRenderInfo = {} as {
        [key: string]: {
            storageGroup: GPUBindGroup
            bindGroup: GPUBindGroup
            pipeline: GPURenderPipeline
        }
    }

    // const [m1, m2, m3] = await Promise.all(Object.values(MODELS).map(m => parseOBJ(m)))
    // const modelObjs = { Bunny: m1, Teapot: m2, Dragon: m3 } as { [key: string]: OBJDoc }

    for (const m in MODELS) {
        const drawingInfo = getDrawingInfo(await parseOBJ(MODELS[m]))
        const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-list")

        console.log(drawingInfo);
        

        const { storageGroup } = createStorageBind(device, pipeline, [
            drawingInfo.indices,
            drawingInfo.vertices,
            drawingInfo.normals,
        ])
        const { bindGroup } = createUniformBind(
            device,
            pipeline,
            new Uint32Array(vec4(drawingInfo.indices.length / 3)),
            1
        )

        modelRenderInfo[m] = {
            storageGroup,
            bindGroup,
            pipeline,
        }

        break
    }

    const draw = (model: string) => {
        const { pass, executePass } = createPass(device, context, Colors.black)

        const { pipeline, storageGroup, bindGroup } = modelRenderInfo[model]

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, storageGroup)
        pass.setBindGroup(1, bindGroup)

        pass.draw(4)
        executePass()
    }

    draw(subscribeToInput<string>(MODEL_SELECT_ID, draw))
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Using the Binary Space Partitioning tree")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactables = createInteractableSection()

    const modelSelect = createWithLabel(
        createSelect(MODEL_SELECT_ID, Object.keys(MODELS)),
        "Model to display",
        false
    )

    interactables.append(modelSelect)
    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
