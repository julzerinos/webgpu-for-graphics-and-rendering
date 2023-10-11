import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    createUniformBind,
    writeToBuffer,
} from "../../../libs/webgpu"

import {
    createCanvas,
    createCanvasSection,
    createWithLabel,
    createInteractableSection,
    createRange,
    createText,
    createTitle,
    watchInput,
} from "../../../libs/web"

import { Colors } from "../../../libs/util"

import shaderCode from "./shadows.wgsl?raw"

const CANVAS_ID = "lighting"
const LIGHT_POSX_ID = CANVAS_ID + "-light-position-x-input"
const LIGHT_POSY_ID = CANVAS_ID + "-light-position-y-input"
const LIGHT_POSZ_ID = CANVAS_ID + "-light-position-z-input"

const execute: Executable = async () => {
    const { device, context, canvas, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const getLightPosX = watchInput<number>(LIGHT_POSX_ID)
    const getLightPosY = watchInput<number>(LIGHT_POSY_ID)
    const getLightPosZ = watchInput<number>(LIGHT_POSZ_ID)

    const aspectRatio = canvas.width / canvas.height

    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

    const viewboxOptions = new Float32Array([aspectRatio])
    const { bindGroup: viewboxOptionsBind } = createUniformBind(device, pipeline, viewboxOptions)

    const lightSettings = new Float32Array([
        getLightPosX(),
        getLightPosY(),
        getLightPosZ(),
        0,
        0,
        0,
        0,
        0,
        0,
    ])
    const { bindGroup: lightSettingsBind, uniformBuffer: lightSettingsBuffer } = createUniformBind(
        device,
        pipeline,
        lightSettings,
        1
    )

    const draw = () => {
        writeToBuffer(
            device,
            lightSettingsBuffer,
            new Float32Array([getLightPosX(), getLightPosY(), getLightPosZ(), 0, 0, 0, 0, 0, 0]),
            0
        )

        const { pass, executePass } = createPass(device, context, Colors.black)

        pass.setPipeline(pipeline)

        pass.setBindGroup(0, viewboxOptionsBind)
        pass.setBindGroup(1, lightSettingsBind)

        pass.draw(4)
        executePass()

        requestAnimationFrame(draw)
    }

    requestAnimationFrame(draw)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("A simple lighting system")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID, 512 + 128, 512 - 64)

    const interactables = createInteractableSection()

    const lightPositionX = createWithLabel(
        createRange(LIGHT_POSX_ID, 0, -5, 5, 0.1),
        "Light X position"
    )
    const lightPositionY = createWithLabel(
        createRange(LIGHT_POSY_ID, 1, 0, 5, 0.1),
        "Light Y position"
    )
    const lightPositionZ = createWithLabel(
        createRange(LIGHT_POSZ_ID, 0, -5, 5, 0.1),
        "Light Z position"
    )

    interactables.append(lightPositionX, lightPositionY, lightPositionZ)

    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)
    executeQueue.push(execute)
}

export default view
