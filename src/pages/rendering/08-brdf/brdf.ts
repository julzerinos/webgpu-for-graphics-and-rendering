import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    createBind,
    generatePingPongTextures,
    writeToBufferU32,
    writeToBufferF32,
} from "../../../libs/webgpu"

import {
    createBoolInput,
    createButton,
    createCanvas,
    createCanvasSection,
    createColorPicker,
    createInteractableSection,
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
    colorToVec4,
    flattenVector,
    getDrawingInfo,
    hexToColor,
    interleaveF32s,
    parseOBJ,
    shiftIntoU32InPlace,
    vec4,
} from "../../../libs/util"

import shaderCode from "./brdf.wgsl?raw"

const CANVAS_ID = "brdfs"
const PROG_ENB = "progressive-enabled-cb-" + CANVAS_ID
const SPHERE_EXT = "brdf-color-picker"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const getProgressiveEnabled = watchInput<boolean>(PROG_ENB, "checked")
    const getSphereExtinctionCoefficient = watchInput<string>(SPHERE_EXT)

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
    const {
        bindGroup: uniformsBind,
        buffers: [_, __, sceneDataBuffer, sphereExtinctionCoefficientBuffer],
    } = createBind(
        device,
        pipeline,
        [
            bspTreeResults.aabb,
            new Uint32Array([lightFaceIndices.length]),
            new Uint32Array([0, canvas.width, canvas.height]),
            new Float32Array(colorToVec4(hexToColor(getSphereExtinctionCoefficient()))),
        ],
        "UNIFORM",
        2
    )

    const renderTextureBind = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(3),
        entries: [
            {
                binding: 0,
                resource: renderDst.createView(),
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
        writeToBufferF32(
            device,
            sphereExtinctionCoefficientBuffer,
            new Float32Array(colorToVec4(hexToColor(getSphereExtinctionCoefficient()))),
            0
        )

        const { pass, encoder } = createPass(device, context, Colors.black, {
            otherColorAttachments: [
                { view: renderSrc.createView(), loadOp: "load", storeOp: "store" },
            ],
        })

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, modelStorage)
        pass.setBindGroup(1, bspTreeStorage)
        pass.setBindGroup(2, uniformsBind)
        pass.setBindGroup(3, renderTextureBind)

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

    let restart = false
    subscribeToButton("restart-progressive-brdf", () => (restart = true))

    progress()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Progressive rendering, the basics")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactables = createInteractableSection()

    const progressiveEnabled = createWithLabel(
        createBoolInput(PROG_ENB, true),
        "Progressive rendering enabled",
        false
    )
    const sphereExtinctionPicker = createWithLabel(
        createColorPicker(SPHERE_EXT, "#1a3205"),
        "Sphere extinction coefficient"
    )
    const restart = createButton("restart-progressive-brdf", "Restart progressive")

    interactables.append(progressiveEnabled, sphereExtinctionPicker, restart)

    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
