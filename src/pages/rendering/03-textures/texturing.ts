import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    generateTexture,
    createTextureBind,
    createUniformBind,
} from "../../../libs/webgpu"

import {
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createRange,
    createText,
    createTitle,
    createWithLabel,
    watchInput,
} from "../../../libs/web"

import { Colors, readImageData } from "../../../libs/util"

import shaderCode from "./texturing.wgsl?raw"
import Grass from "./grass.png"

const CANVAS_ID = "texturing"
const TEXTURE_SCALE_RANGE_ID = "grass-texture-scale"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const getScale = watchInput<number>(TEXTURE_SCALE_RANGE_ID)

    const { textureData, height, width } = await readImageData(Grass)
    const { texture, sampler } = generateTexture(device, textureData, width, height)

    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")
    const textureBindGroup = createTextureBind(device, pipeline, texture, sampler)

    const draw = () => {
        const { pass, executePass } = createPass(device, context, Colors.black)
        
        const globals = createUniformBind(device, pipeline, new Float32Array([getScale()]), 1)

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, textureBindGroup)
        pass.setBindGroup(1, globals)

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
    const canvas = createCanvas(CANVAS_ID)

    const interactables = createInteractableSection()

    const textureScaleRange = createWithLabel(
        createRange(TEXTURE_SCALE_RANGE_ID, 0.2, 0.1, 2, 0.1),
        "Texture scale"
    )

    interactables.append(textureScaleRange)
    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
