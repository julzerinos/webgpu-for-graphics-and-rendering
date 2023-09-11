import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import { initializeWebGPU, createPass, setupShaderPipeline, createBind } from "../../../libs/webgpu"

import {
    createCanvas,
    createCanvasSection,
    createInputWithLabel,
    createInteractableSection,
    createRange,
    createText,
    createTitle,
    watchInput,
} from "../../../libs/web"

import { Colors } from "../../../libs/util"

import shaderCode from "./light.wgsl?raw"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU("light")

    const getZoom = watchInput<number>("zoom")

    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

    const draw = () => {
        const { pass, executePass } = createPass(device, context, Colors.black)

        pass.setPipeline(pipeline)

        const viewboxOptions = new Float32Array([])
        const viewboxOptionsBind = createBind(device, pipeline)

        pass.draw(4)
        executePass()

        requestAnimationFrame(draw)
    }

    requestAnimationFrame(draw)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Let me shine some light on the situation")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas("light", 512 + 128)

    const interactables = createInteractableSection()
    const zoomRange = createInputWithLabel(
        createRange("zoom", 1, 0.1, 20, 0.1),
        "Zoom (camera constant)"
    )
    interactables.append(zoomRange)

    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)
    executeQueue.push(execute)
}

export default view
