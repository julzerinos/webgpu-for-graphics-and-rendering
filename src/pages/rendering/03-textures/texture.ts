import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    createUniformBind,
    generateTexture,
    createTextureBind,
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
    createSelect,
} from "../../../libs/web"

import { Colors, readImageData } from "../../../libs/util"

import shaderCode from "./texture.wgsl?raw"
import Grass from "./grass.png"

const CANVAS_ID = "textures"

const execute: Executable = async () => {
    const { device, context, canvas, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const { textureData, height, width } = await readImageData(Grass)
    const { texture, sampler } = generateTexture(device, textureData, width, height)

    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")
    const textureBindGroup = createTextureBind(device, pipeline, texture, sampler)

    const draw = (time: number) => {
        const { pass, executePass } = createPass(device, context, Colors.black)

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, textureBindGroup)

        pass.draw(4)
        executePass()

        requestAnimationFrame(draw)
    }

    requestAnimationFrame(draw)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Applying textures in rendering")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID, 512, 512)

    const interactables = createInteractableSection()

    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)
    executeQueue.push(execute)
}

export default view
