import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import { initializeWebGPU, createPass, setupShaderPipeline, createBind } from "../../../libs/webgpu"

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

import { Colors, build_bsp_tree, getDrawingInfo, parseOBJ } from "../../../libs/util"

import shaderCode from "./partitioning.wgsl?raw"

const CANVAS_ID = "bsp"
const MODELS = {
    Bunny: "models/bunny.obj",
    Teapot: "models/teapot.obj",
    Dragon: "models/dragon.obj",
} as { [key: string]: string }
const MODEL_SELECT_ID = "model-select-bsp"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

    const modelDrawingInfo = getDrawingInfo(await parseOBJ(MODELS["Teapot"], 0.02))
    const bspTreeResults = build_bsp_tree(modelDrawingInfo)

    const { bindGroup: modelStorage } = createBind(
        device,
        pipeline,
        [bspTreeResults.positions, bspTreeResults.normals, bspTreeResults.indices],
        "STORAGE"
    )
    const { bindGroup: bspTreeStorage } = createBind(
        device,
        pipeline,
        [bspTreeResults.bspPlanes, bspTreeResults.bspTree, bspTreeResults.treeIds],
        "STORAGE"
    )
    const { bindGroup: aaabUniform } = createBind(
        device,
        pipeline,
        [bspTreeResults.aabb],
        "UNIFORM"
    )

    const draw = (model: string) => {
        const { pass, executePass } = createPass(device, context, Colors.black)

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, modelStorage)
        pass.setBindGroup(1, bspTreeStorage)
        pass.setBindGroup(2, aaabUniform)

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
