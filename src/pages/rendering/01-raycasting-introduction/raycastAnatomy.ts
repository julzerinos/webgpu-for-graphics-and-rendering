import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import { initializeWebGPU, createPass, setupShaderPipeline } from "../../../libs/webgpu"

import { createCanvas, createText, createTitle } from "../../../libs/web"

import { Colors } from "../../../libs/util"

import shaderCode from "./raycastAnatomy.wgsl?raw"

const CANVAS_ID = "raycast-anatomy"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

    const { pass, executePass } = createPass(device, context, Colors.black)

    pass.setPipeline(pipeline)
    pass.draw(4)

    executePass()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("The anatomy of a ray cast")
    const description = createText("No description yet")

    const canvas = createCanvas(CANVAS_ID)

    div.append(title, description, canvas)

    executeQueue.push(execute)
}

export default view
