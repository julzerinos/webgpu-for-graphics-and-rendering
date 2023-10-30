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
    createSelect,
    createText,
    createTitle,
    createWithLabel,
    subscribeMultiple,
    subscribeToInput,
    watchInput,
} from "../../../libs/web"

import {
    Colors,
    checkerboardTexture,
    flattenMatrix,
    flattenVector,
    generateMips,
    perspectiveProjection,
    readImageData,
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
    const mips = generateMips(textureData, 64)

    console.log(mips)

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
    const title = createTitle("Applying textures")
    const description = createText("No description yet")

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
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
