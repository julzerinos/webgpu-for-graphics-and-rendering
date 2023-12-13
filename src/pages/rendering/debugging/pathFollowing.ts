import { Executable, ExecutableQueue, ICanvasCoordinates, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    createBind,
    writeToBufferU32,
    writeToBufferF32,
} from "../../../libs/webgpu"

import {
    createBoolInput,
    createCanvas,
    createCanvasSection,
    createCanvasStack,
    createInteractableSection,
    createText,
    createTitle,
    createWithLabel,
    subscribeToCanvasDrag,
    subscribeToInput,
} from "../../../libs/web"

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
} from "../../../libs/util"

import shaderCode from "./pathFollowing.wgsl?raw"
import { byteLength } from "../../../libs/util/byteLengths"

const CANVAS_ID = "path-following"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const debugCanvas = document.getElementById(CANVAS_ID + "-overlay") as HTMLCanvasElement
    const debugContext = (debugCanvas.getContext("gpupresent") ||
        debugCanvas.getContext("webgpu")) as GPUCanvasContext
    debugContext.configure({
        device,
        format: canvasFormat,
        alphaMode: "premultiplied",
    })

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
            targets: [{ format: canvasFormat }, { format: canvasFormat }],
        },
        primitive: {
            topology: "triangle-strip",
        },
    })

    const modelDrawingInfo = getDrawingInfo(await parseOBJ("models/CornellBox.obj"))
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
        buffers: [_, __, mouseUVBuffer],
    } = createBind(
        device,
        pipeline,
        [
            bspTreeResults.aabb,
            new Float32Array(flattenVector(jitters.map(j => vec4(...j, 0, 0)))),
            new Float32Array([0.34765625, 0.387603759765625, 0, 0]),
            new Uint32Array([lightFaceIndices.length]),
        ],
        "UNIFORM",
        2
    )

    const MAX_DEPTH = 10
    const rayPathBuffer = device.createBuffer({
        size: byteLength.float32x4 * 2 * MAX_DEPTH,
        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST,
    })
    writeToBufferF32(device, rayPathBuffer, new Float32Array(4 * 2 * MAX_DEPTH), 0)
    const rayPathDisplayBuffer = device.createBuffer({
        size: (byteLength.float32x4 * 2 + byteLength.float32 * 4) * MAX_DEPTH,
        usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST,
    })
    const rayPathBindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(3),
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
            console.info("[ray path details]", i / 8)
            console.info("a", results.slice(i, i + 4))
            console.info("b", results.slice(i + 4, i + 8))
            // console.info("depth, thickness, exists, opacity", results.slice(i + 8, i + 12))
        }
        rayPathDisplayBuffer.unmap()
    }

    const draw = () => {
        const { pass, encoder } = createPass(device, context, Colors.black, {
            otherColorAttachments: [
                {
                    view: debugContext.getCurrentTexture().createView(),
                    loadOp: "clear",
                    clearValue: Colors.transparent,
                    storeOp: "store",
                },
            ],
        })

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, modelStorage)
        pass.setBindGroup(1, bspTreeStorage)
        pass.setBindGroup(2, uniformsBind)
        pass.setBindGroup(3, rayPathBindGroup)

        pass.draw(4)
        pass.end()

        if (rayPathDisplayBuffer.mapState === "unmapped")
            encoder.copyBufferToBuffer(
                rayPathBuffer,
                0,
                rayPathDisplayBuffer,
                0,
                rayPathBuffer.size
            )
        // encoder.clearBuffer(rayPathBuffer)
        device.queue.submit([encoder.finish()])

        displayRayPath()
    }

    requestAnimationFrame(draw)

    subscribeToCanvasDrag(
        "path-following",
        {
            onMove: (coordinates: ICanvasCoordinates) => {
                const u = coordinates.x / canvas.width
                const v = 1 - coordinates.y / canvas.height
                writeToBufferF32(device, mouseUVBuffer, new Float32Array([u, v, 0, 0]), 0)

                requestAnimationFrame(draw)
            },
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
    interactables.append()
    canvasSection.append(canvasStack, interactables)

    const title = createTitle("Tracing the ray path")
    const description = createText("No description yet")
    div.append(title, description, canvasSection)
    executeQueue.push(execute)
}

export default view
