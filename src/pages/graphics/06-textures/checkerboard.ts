import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    generateTexture,
    createTextureBind,
    genreateIndexBuffer,
    genreateVertexBuffer,
} from "../../../libs/webgpu"

import {
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createRelevantFilesLink,
    createSelect,
    createText,
    createTitle,
    createWithLabel,
    subscribeMultiple,
    watchInput,
} from "../../../libs/web"

import {
    Colors,
    checkerboardTexture,
    flattenVector,
    generateMips,
    vec2,
    vec4,
} from "../../../libs/util"

import shaderCode from "./checkerboard.wgsl?raw"

const CANVAS_ID = "checkerboard-test"
const TEX_OPT_SEL_ID = "texture-repeat-style"
const TEXTURE_OPTIONS: GPUAddressMode[] = ["clamp-to-edge", "repeat", "mirror-repeat"]
const MAG_FILTER = "magnification-checkerboard"
const MIN_FILTER = "minification-checkerboard"
const FILTER_MODES: GPUFilterMode[] = ["linear", "nearest"]

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const getTextureMode = watchInput<GPUAddressMode>(TEX_OPT_SEL_ID)
    const getMinFilter = watchInput<GPUFilterMode>(MIN_FILTER)
    const getMagFilter = watchInput<GPUFilterMode>(MAG_FILTER)
    const getMipMapFilter = watchInput<GPUFilterMode>(MIPMAP_SEL)

    const rectangleVertices = new Float32Array(
        flattenVector([vec4(-4, -1, -1), vec4(4, -1, -1), vec4(4, -1, -21), vec4(-4, -1, -21)])
    )
    const rectangleIndices = new Uint32Array([0, 1, 2, 0, 2, 3])
    const rectangleUvs = new Float32Array(
        flattenVector([vec2(-1.5, 0), vec2(2.5, 0), vec2(2.5, 10), vec2(-1.5, 10)])
    )

    const { buffer: indexBuffer } = genreateIndexBuffer(device, rectangleIndices)
    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateVertexBuffer(
        device,
        rectangleVertices,
        "float32x4"
    )
    const { buffer: uvBuffer, bufferLayout: uvBufferLayout } = genreateVertexBuffer(
        device,
        rectangleUvs,
        "float32x2",
        1
    )

    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout, uvBufferLayout],
        canvasFormat,
        shaderCode,
        "triangle-list"
    )

    const textureData = checkerboardTexture(64, 8, 8)
    const mips = generateMips(textureData, 64, true)

    const draw = async () => {
        const { texture, sampler } = generateTexture(
            device,
            textureData,
            64,
            64,
            {
                addressModeU: getTextureMode(),
                addressModeV: getTextureMode(),
                minFilter: getMinFilter(),
                magFilter: getMagFilter(),
                mipmapFilter: getMipMapFilter(),
            },
            { mips }
        )

        const textureBindGroup = createTextureBind(device, pipeline, texture, sampler)
        const { pass, executePass } = createPass(device, context, Colors.blueScreenBlue)

        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)
        pass.setVertexBuffer(1, uvBuffer)
        pass.setIndexBuffer(indexBuffer, "uint32")

        pass.setBindGroup(0, textureBindGroup)

        pass.drawIndexed(6)
        executePass()
    }

    subscribeMultiple([TEX_OPT_SEL_ID, MAG_FILTER, MIN_FILTER, MIPMAP_SEL], draw)

    draw()
}

const MIPMAP_SEL = "mipmap-select-checkerboard"
const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const a = createRelevantFilesLink("graphics/06-textures", [
        "/checkerboard.ts",
        "/checkerboard.wgsl",
    ])

    const title = createTitle("The unseen end of the checkers board")
    const description = createText(`
Applying texture to objects is rather trivial. The hard part comes with trying to make the texture work properly in the scene and fighting at the same time with the two elements of texture space immutability - magnification and minification or in simple words, when a texel and a pixel are not of the same size (or even aligned for that matter).

Magnification happens when texture elements (texels) cover multiple pixels. This means that many pixels have to be the color of the single texel they correlate to. Blurring can be used to smooth the rough edges created by the enlarged texture objects.

The more complex counterpart is minification, which means that a single pixel contains more than one texel. In this case color mixing (averaging) has to be applied to get a single deterministic result.

Another method for manipulating textures in space is mipmapping (mip from the latin phrase multum in parvo, "much in a small space"). Mip maps are multiple variants of the same texture in different levels of details (ie. resolution).
According to the need, a lower resolution texture can be selected to address the phenomenon of aliasing or moiré patterns. 

In the example below, the checkerboard texture has a couple levels of mipmaps created. Each level has a different color to more easily observe the transition.
The latter layers (where the texture is the farthest from the camera and therefore a lower resolution texture is called for) is just a grey blob. At this point, the checkerboard pattern has been averaged into grey.
`)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)

    const interactables = createInteractableSection()

    const textureOptionSelect = createWithLabel(
        createSelect(TEX_OPT_SEL_ID, TEXTURE_OPTIONS, "repeat"),
        "Texture edge behaviour",
        false
    )
    const minFilterOptionSelect = createWithLabel(
        createSelect(MIN_FILTER, FILTER_MODES, "nearest"),
        "Minification behaviour",
        false
    )
    const magFilterOptionSelect = createWithLabel(
        createSelect(MAG_FILTER, FILTER_MODES, "nearest"),
        "Magnification behaviour",
        false
    )
    const mipmapOptionsSelect = createWithLabel(
        createSelect(MIPMAP_SEL, FILTER_MODES, "nearest"),
        "Mipmap behaviour",
        false
    )

    interactables.append(
        textureOptionSelect,
        minFilterOptionSelect,
        magFilterOptionSelect,
        mipmapOptionsSelect
    )
    canvasSection.append(canvas, interactables)
    div.append(title, a, description, canvasSection)

    executeQueue.push(execute)
}

export default view
