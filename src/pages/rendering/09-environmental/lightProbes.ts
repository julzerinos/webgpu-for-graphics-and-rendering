import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    createBind,
    generatePingPongTextures,
    writeToBufferU32,
} from "../../../libs/webgpu"

import {
    asset,
    createBoolInput,
    createButton,
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createRelevantFilesLink,
    createSelect,
    createText,
    createTitle,
    createWithLabel,
    subscribeToButton,
    subscribeToInput,
    watchInput,
} from "../../../libs/web"

import {
    Colors,
    build_bsp_tree,
    flattenVector,
    getDrawingInfo,
    interleaveF32s,
    loadTexture,
    parseOBJ,
    shiftIntoU32InPlace,
    vec4,
} from "../../../libs/util"

import shaderCode from "./lightProbes.wgsl?raw"

const CANVAS_ID = "light-probes"
const PROG_ENB = "progressive-enabled-cb-" + CANVAS_ID

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const getProgressiveEnabled = watchInput<boolean>(PROG_ENB, "checked")

    const { texture: environmentTextureHDR, sampler: environmentSamplerHDR } = await loadTexture(
        device,
        asset("textures/burnt_warehouse.hdr.png")
    )

    const modelDrawingInfo = getDrawingInfo(await parseOBJ(asset("models/teapot.obj"), 1))
    const bspTreeResults = build_bsp_tree(modelDrawingInfo)

    const interleavedVerticesNormals = interleaveF32s([
        bspTreeResults.vertices,
        bspTreeResults.normals,
    ])

    const interleavedIndicesMatIndices = new Uint32Array(bspTreeResults.indices)
    shiftIntoU32InPlace(interleavedIndicesMatIndices, modelDrawingInfo.matIndices, 4)

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

    let { renderSrc, renderDst, blitPingPong } = generatePingPongTextures(device, canvas)

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

    const { bindGroup: modelStorage } = createBind(
        device,
        pipeline,
        [interleavedVerticesNormals, interleavedIndicesMatIndices, materialsArray],
        "STORAGE"
    )
    const { bindGroup: bspTreeStorage } = createBind(
        device,
        pipeline,
        [bspTreeResults.bspPlanes, bspTreeResults.bspTree, bspTreeResults.treeIds],
        "STORAGE",
        1
    )
    const {
        bindGroup: uniformsBind,
        buffers: [_, sceneDataBuffer, shaderTypeBuffer],
    } = createBind(
        device,
        pipeline,
        [
            bspTreeResults.aabb,
            new Uint32Array([0, canvas.width, canvas.height]),
            new Uint32Array([3, 0, 0, 0]),
        ],
        "UNIFORM",
        2
    )

    const hdrTexturesBind = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(3),
        entries: [
            {
                binding: 0,
                resource: renderDst.createView(),
            },
            {
                binding: 1,
                resource: environmentSamplerHDR,
            },
            {
                binding: 2,
                resource: environmentTextureHDR.createView(),
            },
        ],
    })

    let framesWhileProgressive = 0
    const progress = () => {
        if (!getProgressiveEnabled()) return

        if (restart === true) {
            restart = false
            framesWhileProgressive = 0
        }

        framesWhileProgressive += 1
        writeToBufferU32(device, sceneDataBuffer, new Uint32Array([framesWhileProgressive]), 0)

        const { pass, encoder } = createPass(device, context, Colors.black, {
            otherColorAttachments: [
                { view: renderSrc.createView(), loadOp: "load", storeOp: "store" },
            ],
        })

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, modelStorage)
        pass.setBindGroup(1, bspTreeStorage)
        pass.setBindGroup(2, uniformsBind)
        pass.setBindGroup(3, hdrTexturesBind)

        pass.draw(4)
        pass.end()

        blitPingPong(encoder)

        device.queue.submit([encoder.finish()])

        requestAnimationFrame(progress)
    }

    subscribeToInput<boolean>(
        PROG_ENB,
        (enabled: boolean) => {
            if (enabled) requestAnimationFrame(progress)
        },
        "checked"
    )

    const updateShaderType = (type: "Base color" | "Lambertian" | "Mirror") => {
        const typeToCodeMapped = (
            { "Base color": 3, Lambertian: 0, Mirror: 1 } as {
                [key in "Base color" | "Lambertian" | "Mirror"]: number
            }
        )[type]

        writeToBufferU32(device, shaderTypeBuffer, new Uint32Array([typeToCodeMapped]), 0)
    }

    updateShaderType(
        subscribeToInput<"Base color" | "Lambertian" | "Mirror">(
            "model-shader-select-env",
            updateShaderType
        )
    )

    let restart = false
    subscribeToButton("restart-progressive-env", () => (restart = true))

    progress()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const a = createRelevantFilesLink("rendering/09-environmental", [
        "/lightProbes.ts",
        "/lightProbes.wgsl",
    ])

    const title = createTitle("Custom light probes")
    const description = createText(`
With the setup ready, the reapot can be placed into any environment and reflect its lighting quite well.
An HDR probe representing a burnt warehouse was selected (https://polyhaven.com/a/burnt_warehouse).

This is a dark environment with a single doorway through which sunlight comes through. The teapot is shaded from the top and front,
but elements facing the doorway are slightly lit with the bottom also lit by the reflections of light from the warehouse floor which is lit by the doorway sun rays.
`)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID, { width: 1028 })
    const interactables = createInteractableSection()

    const progressiveEnabled = createWithLabel(
        createBoolInput(PROG_ENB, true),
        "Progressive rendering enabled",
        false
    )

    const modelShaderSelect = createWithLabel(
        createSelect(
            "model-shader-select-env",
            ["Base color", "Lambertian", "Mirror"],
            "Lambertian"
        ),
        "Model shader type",
        false
    )

    const restart = createButton("restart-progressive-env", "Restart progressive")

    interactables.append(progressiveEnabled, modelShaderSelect, restart)

    canvasSection.append(canvas, interactables)
    div.append(title, a, description, canvasSection)

    executeQueue.push(execute)
}

export default view
