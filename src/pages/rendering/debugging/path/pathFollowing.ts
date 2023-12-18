import { Executable, ExecutableQueue, ICanvasCoordinates, ViewGenerator } from "../../../../types"

import {
    initializeWebGPU,
    createBind,
    writeToBufferF32,
    writeToBufferU32,
} from "../../../../libs/webgpu"

import {
    asset,
    createCanvas,
    createCanvasSection,
    createCanvasStack,
    createImage,
    createInteractableSection,
    createSelect,
    createText,
    createTitle,
    createWithLabel,
    subscribeToCanvasDrag,
    watchInput,
} from "../../../../libs/web"

import {
    Colors,
    build_bsp_tree,
    computeJitters,
    flattenVector,
    getDrawingInfo,
    interleaveF32s,
    parseOBJ,
    shiftIntoU32InPlace,
    vec4,
} from "../../../../libs/util"

import shaderCode from "./pathFollowing.wgsl?raw"
import debugShaderCode from "./drawDebugRays.wgsl?raw"
import { byteLength } from "../../../../libs/util/byteLengths"

const CANVAS_ID = "path-following"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const wgsl = device.createShaderModule({
        code: shaderCode,
    })
    const pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
            module: wgsl,
            entryPoint: "main_vs",
            buffers: [],
        },
        fragment: {
            module: wgsl,
            entryPoint: "main_fs",
            targets: [{ format: canvasFormat }],
        },
        primitive: {
            topology: "triangle-strip",
        },
    })

    const debugCanvas = document.getElementById(CANVAS_ID + "-overlay") as HTMLCanvasElement
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

    const modelDrawingInfo = getDrawingInfo(await parseOBJ(asset("models/CornellBox.obj")))
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

    const { bindGroup: modelStorage } = createBind(
        device,
        pipeline,
        [
            interleavedVerticesNormals,
            interleavedIndicesMatIndices,
            lightFaceIndices,
            materialsArray,
        ],
        "STORAGE"
    )

    const { bindGroup: bspTreeStorage } = createBind(
        device,
        pipeline,
        [bspTreeResults.bspPlanes, bspTreeResults.bspTree, bspTreeResults.treeIds],
        "STORAGE",
        1
    )

    const jitters = computeJitters(canvas.height, 2)
    const {
        bindGroup: uniformsBind,
        buffers: [_, __, mouseUVBuffer, ___, storeTypeBuffer],
    } = createBind(
        device,
        pipeline,
        [
            bspTreeResults.aabb,
            new Float32Array(flattenVector(jitters.map(j => vec4(...j, 0, 0)))),
            new Float32Array([0.67, 0.18, 0, 0]),
            new Uint32Array([lightFaceIndices.length]),
            new Uint32Array([0]),
        ],
        "UNIFORM",
        2
    )

    const MAX_DEPTH = 10
    const rayPathBuffer = device.createBuffer({
        size: byteLength.float32x4 * 2 * MAX_DEPTH,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
    })
    const rayPathDisplayBuffer = device.createBuffer({
        size: byteLength.float32x4 * 2 * MAX_DEPTH,
        usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
    })
    const rayPathWriteBindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(3),
        entries: [
            {
                binding: 0,
                resource: { buffer: rayPathBuffer },
            },
        ],
    })
    const rayPathReadBindGroup = device.createBindGroup({
        layout: debugPipeline.getBindGroupLayout(0),
        entries: [
            {
                binding: 0,
                resource: { buffer: rayPathBuffer },
            },
        ],
    })

    const displayRayPath = async () => {
        if (rayPathDisplayBuffer.mapState !== "unmapped") return

        await rayPathDisplayBuffer.mapAsync(GPUMapMode.READ)
        const results = new Float32Array(rayPathDisplayBuffer.getMappedRange())
        for (let i = 0; i < results.length; i += 4 * 2) {
            console.info("[ray path details] ray no.", i / 8)
            console.info("ray line start (a)", results.slice(i, i + 4))
            console.info("ray line end (b)", results.slice(i + 4, i + 8))
        }
        rayPathDisplayBuffer.unmap()
    }

    const draw = () => {
        const encoder = device.createCommandEncoder()
        encoder.clearBuffer(rayPathBuffer)

        const pass = encoder.beginRenderPass({
            colorAttachments: [
                {
                    view: context.getCurrentTexture().createView(),
                    loadOp: "clear",
                    clearValue: Colors.black,
                    storeOp: "store",
                },
            ],
        })

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, modelStorage)
        pass.setBindGroup(1, bspTreeStorage)
        pass.setBindGroup(2, uniformsBind)
        pass.setBindGroup(3, rayPathWriteBindGroup)

        pass.draw(4)
        pass.end()

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
        debugPass.setBindGroup(0, rayPathReadBindGroup)

        debugPass.draw(4)
        debugPass.end()

        if (rayPathDisplayBuffer.mapState === "unmapped")
            encoder.copyBufferToBuffer(
                rayPathBuffer,
                0,
                rayPathDisplayBuffer,
                0,
                rayPathBuffer.size
            )

        device.queue.submit([encoder.finish()])

        displayRayPath()
    }

    requestAnimationFrame(draw)

    const getStoreType = watchInput<string>("ray-store-type")

    const updateMouseUv = (coordinates: ICanvasCoordinates) => {
        const storeType = getStoreType() === "Normal" ? 1 : 0
        writeToBufferU32(device, storeTypeBuffer, new Uint32Array([storeType]), 0)

        const u = coordinates.x / canvas.width
        const v = 1 - coordinates.y / canvas.height
        writeToBufferF32(device, mouseUVBuffer, new Float32Array([u, v, 0, 0]), 0)

        requestAnimationFrame(draw)
    }

    subscribeToCanvasDrag(
        "path-following",
        {
            onMove: updateMouseUv,
            onStart: updateMouseUv,
        },
        {}
    )
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const canvas = createCanvas(CANVAS_ID)
    const debugCanvas = createCanvas(CANVAS_ID + "-overlay", { overlay: true })
    const canvasStack = createCanvasStack()
    canvasStack.append(canvas, debugCanvas)

    const canvasSection = createCanvasSection()
    const interactables = createInteractableSection()
    const rayTypeSelect = createWithLabel(
        createSelect("ray-store-type", ["Path", "Normal"]),
        "Attribute to store",
        false
    )
    interactables.append(rayTypeSelect)
    canvasSection.append(canvasStack, interactables)

    const title = createTitle("Following along")
    const description = createText(`
I consider myself a visual learner - seeing is not only believing, but understanding. 
The building block of the rendering system is the ray and when the system becomes complicated, with many points at which a ray may continue its path it is easy to lose conceptual sight of the ray and its whereabouts.
There are still those who are confused when they see the inverted image of a glass ball and consider it a defect.

The ability to view the path a ray goes through may be a boon to those looking to debug a scene with many funky materials. 
Having already defined ray-line intersection in the previous part, we are ready to implement an overlay canvas which shows the rays of interest.

In the below example there are four spheres. Two refractive spheres to the left and one refractive with a mirror sphere hidden behind it to the right. 
Clicking on the canvas will show the path a ray takes from that coordinate on the image plane. 
The rays have a gradient applied to indicate their start and end, and each next depth is slightly less opaque. 
The rays are also logged to the browser console.

This system was implemented with ease of use in mind - as a plug and play solution. 
While not perfect, it does achieve the primary goal of not affecting the original render and using the results in the primary render as the generator for the debug (what you see is what you get).

During each render, a given pixel will check if it is the selected (clicked on pixel, where the distance to the mouse pixel is zero). 
If it is the mouse pixel, it will record each ray as a line from the ray origin to the intersection point (hit position) for every depth until either the ray is absorbed or the background is reached.
The lines are written to a write-enabled storage buffer. Apart from this, the original render shader executes as usual.

After the render pass ends, a debug pass is started. The target for this pass is a transparent canvas overlayed on top of the render canvas. 
The same camera configuration is used, but instead of intersecting the scene, the camera rays only intersect with the debug lines stored in the same storage buffer as before.
Here their configuration may be set to adjust their thickness, color and depth variation. 
The ray-line intersection has a few additional modifications applied among which the crucial one is camera ray detection to cancel that intersection. 
Intersection a line directly in the camera results in the entire image plane obstructed. 

Once the process restarts (a new render is requested), the ray lines storage buffer must be cleared to properly display shorter paths without showing the latter parts of previous longer paths.

Of course, any meaningful vector may be displayed with this method. Ray paths were of personal interest to the author, 
but another useful attribute which can be easily plugged into this algorithm are surface normals (limited to a depth of one). 
The use of a storage buffer also enables access to the ray path inside the CPU where it may be used for further debugging or as a part of an interactive simulation.
In this example the rays are simply printed to the console for further analysis.

`)

    const pitfalls1 = createText(`
Initially the appraoch was to do both the original render and debug render inside the same shader, using the same write-enabled storage buffer.
The implementation ran into interesting issues with corrupted data - or rather - a race condition with desynchronized wavefronts reaching the debug draw section before others were finished.
The end result can be seen in the image below. The debug canvas (in white) would only update in rows of chunks from the bottom right to left and up until the location of the mouse coordinate.
`)

    const image = createImage(asset("resources/storage_buffer_issue.png"))
    const pitfalls2 = createText(`
Setting the external overlay debug canvas in the end made more sense anyway, as the overlay should be easily disabled or removed - and the shader for the ray intersection as an entirely different entity helps with decoupling production code from development code.

An extension to drawing rays would be their inclusion in progressive rendering in the form of displaying one of the paths taken by a ray at that coordinate and refreshing every few seconds.
`)

    div.append(title, description, canvasSection, pitfalls1, image, pitfalls2)
    executeQueue.push(execute)
}

export default view
