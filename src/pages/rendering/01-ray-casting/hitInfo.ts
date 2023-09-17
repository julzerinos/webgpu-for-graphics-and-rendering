import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import { initializeWebGPU, createPass, setupShaderPipeline } from "../../../libs/webgpu"
import { createCanvas, createText, createTitle } from "../../../libs/web"
import { Colors } from "../../../libs/util"

import shaderCode from "./hitInfo.wgsl?raw"

const CANVAS_ID = "hitinfo"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

    const { pass, executePass } = createPass(device, context, Colors.black)

    pass.setPipeline(pipeline)
    pass.draw(4)

    executePass()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Interpreting hit info")
    const description = createText("No description yet")

    const canvas = createCanvas(CANVAS_ID)

    div.append(title, description, canvas)

    executeQueue.push(execute)
}

export default view
