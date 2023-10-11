import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    generateTexture,
    createTextureBind,
    createUniformBind,
    writeToBuffer,
    createStorageBind,
} from "../../../libs/webgpu"

import {
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createRange,
    createSelect,
    createText,
    createTitle,
    createWithLabel,
    subscribeMultiple,
    subscribeToInput,
    watchInput,
} from "../../../libs/web"

import { Colors, computeJitters, flattenVector, readImageData } from "../../../libs/util"

import shaderCode from "./texturing.wgsl?raw"
import Grass from "./grass.jpg"
import GrassMC from "./grass_minecraft.png"

const CANVAS_ID = "texturing"
const TEXTURE_SCALE_RANGE_ID = "grass-texture-scale"
const JITTER_SUBD_SLIDER_ID = "subdivision-jitter-slider"
const TEXTURE_SELECT_ID = "grass-texture-select"
const TEX_OPT_SEL_ID = "texture-repeat-style-on-plane"
const TEXTURE_OPTIONS: GPUAddressMode[] = ["clamp-to-edge", "repeat", "mirror-repeat"]
const execute: Executable = async () => {
    const { device, canvas, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const getScale = watchInput<number>(TEXTURE_SCALE_RANGE_ID)
    const getSubdivisions = watchInput<number>(JITTER_SUBD_SLIDER_ID)
    const getTexture = watchInput<string>(TEXTURE_SELECT_ID) as () =>
        | "grass.jpg"
        | "grass_minecraft.png"

    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

    let textureBindGroup: GPUBindGroup, textureMCBindGroup: GPUBindGroup

    const loadImages = async (textureMode: GPUAddressMode) => {
        const imageLoaders = [readImageData(Grass), readImageData(GrassMC)]
        const imageData = await Promise.all(imageLoaders)

        const { texture, sampler } = generateTexture(
            device,
            imageData[0].textureData,
            imageData[0].width,
            imageData[0].height,
            { addressModeU: textureMode, addressModeV: textureMode }
        )
        const { texture: textureMC, sampler: samplerMC } = generateTexture(
            device,
            imageData[1].textureData,
            imageData[1].width,
            imageData[1].height,
            { addressModeU: textureMode, addressModeV: textureMode }
        )
        textureBindGroup = createTextureBind(device, pipeline, texture, sampler)
        textureMCBindGroup = createTextureBind(device, pipeline, textureMC, samplerMC)
    }

    await loadImages("repeat")

    const { bindGroup: globalsBind, uniformBuffer: globalsBuffer } = createUniformBind(
        device,
        pipeline,
        new Float32Array([getScale(), getSubdivisions() * getSubdivisions()]),
        1
    )

    const { storageGroup: jittersBind, storageBuffers: [jittersBuffer] } = createStorageBind(
        device,
        pipeline,
        [new Float32Array(200)],
        2
    )

    const draw = () => {
        writeToBuffer(
            device,
            globalsBuffer,
            new Float32Array([getScale(), getSubdivisions() * getSubdivisions()]),
            0
        )

        const selectedTextureBindGroup = {
            "grass.jpg": textureBindGroup,
            "grass_minecraft.png": textureMCBindGroup,
        }[getTexture()]

        const { pass, executePass } = createPass(device, context, Colors.black)

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, selectedTextureBindGroup)
        pass.setBindGroup(1, globalsBind)
        pass.setBindGroup(2, jittersBind)

        pass.draw(4)
        executePass()
    }

    const setSubdivisions = (subdivisions: number) => {
        const jitters = computeJitters(canvas.height, subdivisions)
        writeToBuffer(device, jittersBuffer, new Float32Array(flattenVector(jitters)), 0, 0)
    }

    const subdivisions = subscribeToInput<number>(JITTER_SUBD_SLIDER_ID, setSubdivisions)
    setSubdivisions(subdivisions)

    subscribeMultiple([TEXTURE_SCALE_RANGE_ID, TEXTURE_SELECT_ID, JITTER_SUBD_SLIDER_ID], draw)
    subscribeToInput(TEX_OPT_SEL_ID, async textureMode => {
        await loadImages(textureMode as GPUAddressMode)
        draw()
    })

    draw()
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
    const subdivisionRange = createWithLabel(
        createRange(JITTER_SUBD_SLIDER_ID, 1, 1, 10, 1),
        "Subdivisions for stratisfied jitter"
    )
    const textureSelect = createWithLabel(
        createSelect(
            TEXTURE_SELECT_ID,
            ["grass.jpg", "grass_minecraft.png"],
            "grass_minecraft.png"
        ),
        "Grass texture",
        false
    )
    const textureOptionSelect = createWithLabel(
        createSelect(TEX_OPT_SEL_ID, TEXTURE_OPTIONS, "repeat"),
        "Texture edge behavior",
        false
    )

    interactables.append(textureSelect, textureScaleRange, textureOptionSelect, subdivisionRange)
    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
