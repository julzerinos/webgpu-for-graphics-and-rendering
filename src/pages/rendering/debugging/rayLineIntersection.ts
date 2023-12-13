import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    writeToBufferF32,
    createBind,
} from "../../../libs/webgpu"

import {
    createCanvas,
    createCanvasSection,
    createWithLabel,
    createRange,
    createText,
    createTitle,
    createInteractableSection,
    subscribeToInput,
} from "../../../libs/web"

import { Colors } from "../../../libs/util"

import shaderCode from "./rayLineIntersection.wgsl?raw"

const CANVAS_ID = "ray-line-intersection"

const execute: Executable = async () => {
    const { device, context, canvas, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

    const {
        bindGroup,
        buffers: [thicknessBuffer],
    } = createBind(device, pipeline, [new Float32Array([0])], "UNIFORM")

    const draw = (thickness: number) => {
        writeToBufferF32(device, thicknessBuffer, new Float32Array([thickness / canvas.width]), 0)

        const { pass, executePass } = createPass(device, context, Colors.black)

        pass.setPipeline(pipeline)

        pass.setBindGroup(0, bindGroup)
        pass.draw(4)

        executePass()
    }

    draw(subscribeToInput<number>("line-thickness", draw))
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Ray line intersection")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID, 512, 512)

    const interactableSection = createInteractableSection()
    const thicknessSlider = createWithLabel(
        createRange("line-thickness", 4, 2, 32, 0.1),
        "Line thickness"
    )

    interactableSection.append(thicknessSlider)
    canvasSection.append(canvas, interactableSection)
    div.append(title, description, canvasSection)
    executeQueue.push(execute)
}

export default view
