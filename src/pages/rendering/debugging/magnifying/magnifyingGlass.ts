import { Executable, ExecutableQueue, ICanvasCoordinates, ViewGenerator } from "../../../../types"

import {
    initializeWebGPU,
    createBind,
    generatePingPongTextures,
    writeToBufferU32,
} from "../../../../libs/webgpu"

import {
    createBoolInput,
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createText,
    createTitle,
    createWithLabel,
    subscribeToInput,
    watchInput,
    subscribeToCanvasDrag,
    createValueDisplay,
    createDisplaySetter,
    asset,
    createRelevantFilesLink,
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

    const modelDrawingInfo = getDrawingInfo(
        await parseOBJ(asset("models/CornellBoxWithBlocks.obj"))
    )
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

    let pixelCount = 64
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

    updateMouseUv({ x: 256, y: 256 })

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
    const a = createRelevantFilesLink("rendering/debugging/", [
        "magnifying/magnifyingGlass.ts",
        "magnifying/progressive.wgsl",
        "magnifying/drawToDebugCanvas.wgsl",
    ])

    const title = createTitle("The magnifying glass for the debugging detective")
    const description = createText(`
The classic approach to debugging shaders is to output a variable as a color. We've all done it, as its the simplest tool at hand to quickly peer into the mind of the opaque machine that is the GPU.
This approach, as handy as it is, has many drawbacks. First and foremost - color is not a human-friendly value in terms of numbers. 
The sole reason that HSL and similar color models exist is because the machine favorite RGB is too difficult to parse for humans. 
It provides an idea of relative value but that may often be far from what is needed most. 
The second issue is negative values - or rather - the lack of their representation. Colors simply do not function in negative number spaces.
While a taking the absolute value may be solve this, it often hides the transition point. 
Another solution is to cleverly map the value to another range, but that is yet another issue in itself entirely - lack of sense of range.
The color has a rigid range between zero and one for each of its channels. 
It is extremely difficult (and frustrating) to map a variable of unknown range, moreso when that variable happens to be an unexpected erroneous value.

The creation of a friendly, easy to utilize method of reading the value in a human friendly approach just may be the powerless shader author's best tool in shed when dealing with difficult to comprehend algorithms.

Following the approach from the previous part, the primary goal is to minimize the development impact on production source code. 
The setup should be an easy to plug into an existing project and trivial to setup.
An external debug canvas is used to display the debug variable and a storage buffer is used as the data transfer middleman.

Inside the production shader a new function is introduced: store_debug_value; which aims to work much like the more familiar Javascript console log.
The function takes only one parameter - a vector of size four. Each pixel in the production shader is permitted one such vector to store a requested debug value.
Inside the implementation of the function the integer pixel coordinates are calculated from the fragment coordinates. 
The pixel coordiantes are used to set the debug value at the appropriate position in the flattened debug_canvas storage buffer. 
There are two requirements to make this function work, these are (1) the canvas dimensions must be available either as uniform values or hardcoded and 
(2) a var<private> variable named fragment_uv which is set to the fragment coordinates (mapped to the range of zero to one).

The next step is re-rendering the debug values in the debug canvas. This is simply reading from the flat debug_canvas storage buffer, querying the buffer with a flattened index from the pixel coordinates.
While simple enough, simply redrawing the canvas is not helpful. Two configuration variables are required to make the magnifying glass function - pixel_count and mouse_uv.
These can be somehow gathered from interaction with the canvas, but must be passed as uniform values to the draw debug shader. 
They are used to properly query the storage buffer with a local area of pixel count size around the mouse click position. 
The magnifying glass canvas is ready. 

A question arises whether is makes sense to write the entire production canvas-worth of values when only a subset is requested in the magnifying glass, but the benefits which arise from this severely outweigh the costs.
When using this appraoch in a progressive render setup, the render may be stopped and the debug canvas may be scrolled to view all possible corners of the debug values at one's leisure.
The efficiency cost is a moot point anyway, as these methods are created to be used in development and removed once the produciton render is fully prepared.

The cherry on top comes from the use of a two-way storage buffer. 
As the buffer has to pass through the CPU before it reaches the debug canvas, it may as well be queried in the CPU for the exact debug value stored by a position. 
The same inverse mapping has to be used as in the shader to retrieve the exact value of the pixel hovered over in the debug canvas.

Finally, the shader author is ready to tackle any numerical issues in their shaders. Right after they finally understand how to properly muliply the path factor in global illumination.

In the example below:

1) Enable progressive rendering.

2) Click on the production canvas to select a debugging position.

3) Click and drag on the debugging canvas to modify the magnifying glass scope (between 2 - 512 pixels wide).

4) Hover over a pixel in the debugging canvas to display its value.
`)

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

    div.append(title, a, description, canvasSection, debugCanvasSection)

    executeQueue.push(execute)
}

export default view
