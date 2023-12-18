import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    generateTexture,
    createTextureBind,
    writeToBufferF32,
    createBind,
} from "../../../libs/webgpu"

import {
    asset,
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
        const imageLoaders = [
            readImageData(asset("textures/grass.jpg")),
            readImageData(asset("textures/grass_minecraft.png")),
        ]
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

    const {
        bindGroup: globalsBind,
        buffers: [globalsBuffer],
    } = createBind(
        device,
        pipeline,
        [new Float32Array([getScale(), getSubdivisions() * getSubdivisions()])],
        "UNIFORM",
        1
    )

    const {
        bindGroup: jittersBind,
        buffers: [jittersBuffer],
    } = createBind(device, pipeline, [new Float32Array(200)], "STORAGE", 2)

    const draw = () => {
        writeToBufferF32(
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
        writeToBufferF32(device, jittersBuffer, new Float32Array(flattenVector(jitters)), 0, true)
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
    const title = createTitle("Textures in rendering, jittering to solve aliasing")
    const description = createText(`
In rendering textures are applied much like in the standard rasterization pipeline. 
Either provided uv coordinates are used to extract the color from the texture (as vertex attributes) or a mathematical equation is used to retrieve a deterministic result.
In the case of the plane, this process is simplified to mapping the plane coordiantes directly to uv coordinates with a linear scale factor.

A powerful tool to combat aliasing in renders is introduced in the form of stratified jittering. This is the proces of subdividing a fragment (pixel) into a grid. 
These cells (substrata) each query the scene with their own ray cast offset by a random amount (a jitter). 
The values of all of the cells are later averaged to create a smoothened single color.

The result is dampening the effects of aliasing. 
Edges will have contributions from each color in the vicinity, as some jittered rays may, for example, miss an object and contribute the color of the background.
Texture magnification and minification are also addressed by jittering. In the example below, for the grass.jpg texture, the grainy overlay in the distance vanishes when the jittering count is increased.
This is more pronounced for large resolutions of the subdivision grid, but comes at a computational cost, as the number of ray casts for each pixel rises quadratically.

At this point all the jitters are precalculated on the CPU and provided to the GPU in the form of a uniform (or storage) buffer. 
At a later point random sampling will be introduced to offset the jitter generation to the GPU instead.
`)

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
