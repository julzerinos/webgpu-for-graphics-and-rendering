import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    generateTexture,
    createTextureBind,
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

import { Colors, readImageData } from "../../../libs/util"

import shaderCode from "./texture.wgsl?raw"
import Grass from "./grass.png"

const CANVAS_ID = "texture"
const TEX_OPT_SEL_ID = "texture-repeat-style"
const TEXTURE_OPTIONS: GPUAddressMode[] = ["clamp-to-edge", "repeat", "mirror-repeat"]

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const draw = async (textureBehavior: string) => {
        const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

        const { textureData, height, width } = await readImageData(Grass)
        const { texture, sampler } = generateTexture(device, textureData, width, height, {
            addressModeU: textureBehavior as GPUAddressMode,
            addressModeV: textureBehavior as GPUAddressMode,
        })

        const textureBindGroup = createTextureBind(device, pipeline, texture, sampler)

        const { pass, executePass } = createPass(device, context, Colors.black)

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, textureBindGroup)

        pass.draw(4)
        executePass()
    }

    draw(subscribeToInput<string>(TEX_OPT_SEL_ID, draw))
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("What is a texture")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)

    const interactables = createInteractableSection()

    const textureOptionSelect = createWithLabel(
        createSelect(TEX_OPT_SEL_ID, TEXTURE_OPTIONS, "repeat"),
        "Texture edge behavior",
        false
    )

    interactables.append(textureOptionSelect)
    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
