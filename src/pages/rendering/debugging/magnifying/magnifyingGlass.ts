import { Executable, ExecutableQueue, ICanvasCoordinates, ViewGenerator } from "../../../../types"

import {
    initializeWebGPU,
    createPass,
    createBind,
    generatePingPongTextures,
    writeToBufferU32,
    writeToBufferF32,
} from "../../../../libs/webgpu"

import {
    createBoolInput,
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createSelect,
    createText,
    createTitle,
    createWithLabel,
    subscribeToInput,
    watchInput,
    createCanvasStack,
    subscribeToCanvasDrag,
    createValueDisplay,
    createDisplaySetter,
} from "../../../../libs/web"

import {
    Colors,
    build_bsp_tree,
    clamp,
    flattenVector,
    getDrawingInfo,
    interleaveF32s,
    parseOBJ,
    shiftIntoU32InPlace,
    vec4,
} from "../../../../libs/util"
import { byteLength } from "../../../../libs/util/byteLengths"

import shaderCode from "./progressive.wgsl?raw"
import debugShaderCode from "./drawToDebugCanvas.wgsl?raw"

const CANVAS_ID = "drawing-to-debug-canvas"
const PROG_ENB = "progressive-enabled"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const getProgressiveEnabled = watchInput<boolean>(PROG_ENB, "checked")
    const pixelValueDisplaySetter = createDisplaySetter("pixel-value-debug")
    const pixelCountDisplaySetter = createDisplaySetter("pixel-count-debug")

    const modelDrawingInfo = getDrawingInfo(await parseOBJ("models/CornellBoxWithBlocks.obj"))
    const bspTreeResults = build_bsp_tree(modelDrawingInfo)

    const interleavedVerticesNormals = interleaveF32s([
        bspTreeResults.vertices,
        bspTreeResults.normals,
    ])

    const interleavedIndicesMatIndices = new Uint32Array(bspTreeResults.indices)
    shiftIntoU32InPlace(interleavedIndicesMatIndices, modelDrawingInfo.matIndices, 4)
    const lightFaceIndices = new Uint32Array(modelDrawingInfo.lightIndices)

    const materialsArray = new Float32Array(
        modelDrawingInfo.materials.reduce(
            (arr, mat) => [
                ...arr,
                ...flattenVector([
                    mat.color,
                    mat.specular,
                    mat.emission,
                    vec4(mat.illum, mat.shininess, mat.ior),
                ]),
            ],
            [] as number[]
        )
    )

    const { renderSrc, renderDst, blitPingPong } = generatePingPongTextures(device, canvas)

    const wgsl = device.createShaderModule({
        code: shaderCode,
    })
    const pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
            module: wgsl,
            entryPoint: "main_vs",
        },
        fragment: {
            module: wgsl,
            entryPoint: "main_fs",
            targets: [{ format: canvasFormat }, { format: "rgba32float" }],
        },
        primitive: {
            topology: "triangle-strip",
        },
    })

    const debugCanvas = document.getElementById(CANVAS_ID + "-debug") as HTMLCanvasElement
    const debugContext = (debugCanvas.getContext("gpupresent") ||
        debugCanvas.getContext("webgpu")) as GPUCanvasContext
    debugContext.configure({
        device,
        format: canvasFormat,
        alphaMode: "premultiplied",
    })

    const debugWgsl = device.createShaderModule({
        code: debugShaderCode,
    })
    const debugPipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
            module: debugWgsl,
            entryPoint: "main_vs",
            buffers: [],
        },
        fragment: {
            module: debugWgsl,
            entryPoint: "main_fs",
            targets: [{ format: canvasFormat }],
        },
        primitive: {
            topology: "triangle-strip",
        },
    })

    const { bindGroup: modelStorage } = createBind(
        device,
        pipeline,
        [
            interleavedVerticesNormals,
            interleavedIndicesMatIndices,
            lightFaceIndices,
            materialsArray,
            bspTreeResults.bspPlanes,
            bspTreeResults.bspTree,
            bspTreeResults.treeIds,
        ],
        "STORAGE"
    )

    const renderTextureBind = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(1),
        entries: [
            {
                binding: 0,
                resource: renderDst.createView(),
            },
        ],
    })

    const {
        bindGroup: uniformsBind,
        buffers: [_, __, sceneDataBuffer],
    } = createBind(
        device,
        pipeline,
        [
            bspTreeResults.aabb,
            new Uint32Array([lightFaceIndices.length]),
            new Uint32Array([0, canvas.width, canvas.height]),
        ],
        "UNIFORM",
        2
    )

    const debugCanvasBuffer = device.createBuffer({
        size: byteLength.float32x4 * canvas.height * canvas.width,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC,
    })
    const debugCanvasPixelDisplayBuffer = device.createBuffer({
        size: byteLength.float32x4,
        usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
    })

    const displayPixel = async () => {
        await debugCanvasPixelDisplayBuffer.mapAsync(GPUMapMode.READ)

        const pixel = new Float32Array(debugCanvasPixelDisplayBuffer.getMappedRange())
        pixelValueDisplaySetter([...pixel].map(v => v.toFixed(2)).join(", "))
        debugCanvasPixelDisplayBuffer.unmap()
    }

    const debugCanvasWriteBind = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(3),
        entries: [
            {
                binding: 0,
                resource: { buffer: debugCanvasBuffer },
            },
        ],
    })

    const mouseUVBuffer = device.createBuffer({
        size: byteLength.float32x2,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })

    let pixelCount = 16
    const pixelCountBuffer = device.createBuffer({
        size: new Uint32Array(1).byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })
    writeToBufferU32(device, pixelCountBuffer, new Uint32Array([pixelCount]), 0)

    const debugCanvasReadBind = device.createBindGroup({
        layout: debugPipeline.getBindGroupLayout(0),
        entries: [
            {
                binding: 0,
                resource: { buffer: debugCanvasBuffer },
            },
            {
                binding: 1,
                resource: { buffer: mouseUVBuffer },
            },
            { binding: 2, resource: { buffer: pixelCountBuffer } },
        ],
    })

    const updateDebugCanvas = (encoder: GPUCommandEncoder) => {
        const debugPass = encoder.beginRenderPass({
            colorAttachments: [
                {
                    view: debugContext.getCurrentTexture().createView(),
                    loadOp: "clear",
                    clearValue: Colors.transparent,
                    storeOp: "store",
                },
            ],
        })

        debugPass.setPipeline(debugPipeline)
        debugPass.setBindGroup(0, debugCanvasReadBind)

        debugPass.draw(4)
        debugPass.end()
    }

    let framesWhileProgressive = 0
    const progress = () => {
        if (!getProgressiveEnabled()) return
        framesWhileProgressive += 1
        writeToBufferU32(device, sceneDataBuffer, new Uint32Array([framesWhileProgressive]), 0)

        const encoder = device.createCommandEncoder()

        const pass = encoder.beginRenderPass({
            colorAttachments: [
                {
                    view: context.getCurrentTexture().createView(),
                    loadOp: "clear",
                    clearValue: Colors.black,
                    storeOp: "store",
                },
                { view: renderSrc.createView(), loadOp: "load", storeOp: "store" },
            ],
        })

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, modelStorage)
        pass.setBindGroup(1, renderTextureBind)
        pass.setBindGroup(2, uniformsBind)
        pass.setBindGroup(3, debugCanvasWriteBind)

        pass.draw(4)
        pass.end()

        updateDebugCanvas(encoder)

        blitPingPong(encoder)
        device.queue.submit([encoder.finish()])

        requestAnimationFrame(progress)
    }

    requestAnimationFrame(progress)

    subscribeToInput<boolean>(PROG_ENB, () => requestAnimationFrame(progress), "checked")

    let debugCenterAt: ICanvasCoordinates = { x: 0, y: 0 }
    const updateMouseUv = (coordinates: ICanvasCoordinates) => {
        const u = coordinates.x
        const v = canvas.height - coordinates.y
        debugCenterAt.x = Math.floor(u)
        debugCenterAt.y = Math.floor(v)
        writeToBufferU32(device, mouseUVBuffer, new Uint32Array([u, v]), 0)

        const encoder = device.createCommandEncoder()
        updateDebugCanvas(encoder)
        device.queue.submit([encoder.finish()])
    }

    subscribeToCanvasDrag(
        CANVAS_ID,
        {
            onMove: updateMouseUv,
            onStart: updateMouseUv,
        },
        {}
    )

    let zooming = false
    let lastDragY = 0
    const onDebugMouseMove = (coordinates: ICanvasCoordinates) => {
        const encoder = device.createCommandEncoder()

        if (!zooming) {
            const mouseU =
                Math.floor((coordinates.x / 512) * pixelCount) + debugCenterAt.x - pixelCount / 2
            const mouseV =
                Math.floor((1 - coordinates.y / 512) * pixelCount) +
                debugCenterAt.y -
                pixelCount / 2
            const index = mouseV * 512 + mouseU

            encoder.copyBufferToBuffer(
                debugCanvasBuffer,
                byteLength.float32x4 * index,
                debugCanvasPixelDisplayBuffer,
                0,
                byteLength.float32x4
            )
            device.queue.submit([encoder.finish()])

            displayPixel()
            return
        }

        const offset = 2 * Math.round((coordinates.y - lastDragY) / 2)
        pixelCount = clamp(pixelCount + offset, 2, 512)
        writeToBufferU32(device, pixelCountBuffer, new Uint32Array([pixelCount]), 0)
        pixelCountDisplaySetter(pixelCount.toString())

        updateDebugCanvas(encoder)
        device.queue.submit([encoder.finish()])

        lastDragY = coordinates.y
    }

    subscribeToCanvasDrag(
        CANVAS_ID + "-debug",
        {
            onMove: onDebugMouseMove,
            onStart: coordinates => {
                lastDragY = coordinates.y
                zooming = true
            },
            onEnd: () => (zooming = false),
        },
        { alwaysMouseMove: true }
    )
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Progressive rendering, the basics")
    const description = createText("No description yet")

    const canvas = createCanvas(CANVAS_ID)

    const progressiveEnabled = createWithLabel(
        createBoolInput(PROG_ENB, false),
        "Progressive rendering enabled",
        false
    )

    const interactables = createInteractableSection()
    interactables.append(progressiveEnabled)

    const canvasSection = createCanvasSection()
    canvasSection.append(canvas, interactables)

    const debugCanvas = createCanvas(CANVAS_ID + "-debug")
    const debugCanvasSection = createCanvasSection()
    const pixelCountValueDisplay = createWithLabel(
        createValueDisplay("pixel-count-debug"),
        "Debug canvas dimension"
    )
    const debugValueDisplay = createWithLabel(
        createValueDisplay("pixel-value-debug"),
        "Pixel value"
    )
    const debugInteractables = createInteractableSection()
    debugInteractables.append(pixelCountValueDisplay, debugValueDisplay)
    debugCanvasSection.append(debugCanvas, debugInteractables)

    div.append(title, description, canvasSection, debugCanvasSection)

    executeQueue.push(execute)
}

export default view
