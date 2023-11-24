import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    createBind,
    generatePingPongTextures,
    writeToBufferU32,
} from "../../../libs/webgpu"

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
} from "../../../libs/web"

import {
    Colors,
    build_bsp_tree,
    flattenVector,
    getDrawingInfo,
    interleaveF32s,
    parseOBJ,
    shiftIntoU32InPlace,
    vec4,
} from "../../../libs/util"

import shaderCodeProgressiveSimple from "./progressiveSimple.wgsl?raw"
import shaderCodeProgressiveSoftShadows from "./progressiveSoftShadows.wgsl?raw"
import shaderCodeProgressiveWithIndirect from "./progressiveWithIndirect.wgsl?raw"

const CANVAS_ID = "cornell-progressive"
const PROG_ENB = "progressive-enabled-cb"
const SEL_SHDR = "select-shader-cb-progressive"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const getProgressiveEnabled = watchInput<boolean>(PROG_ENB, "checked")

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

    const shaderMap = {
        "Simple progressive": shaderCodeProgressiveSimple,
        "Simple progressive with soft shadows": shaderCodeProgressiveSoftShadows,
        "Complex progressive": shaderCodeProgressiveWithIndirect,
    } as { [key: string]: string }

    const startProgressive = { f: () => {} }

    const setupPipelineAndScene = (shaderType: string) => {
        const { renderSrc, renderDst, blitPingPong } = generatePingPongTextures(device, canvas)

        const wgsl = device.createShaderModule({
            code: shaderMap[shaderType],
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
            pass.setBindGroup(3, renderTextureBind)

            pass.draw(4)
            pass.end()

            blitPingPong(encoder)
            device.queue.submit([encoder.finish()])

            requestAnimationFrame(progress)
        }

        startProgressive.f = () => requestAnimationFrame(progress)
        requestAnimationFrame(progress)
    }

    setupPipelineAndScene(subscribeToInput<string>(SEL_SHDR, setupPipelineAndScene))
    subscribeToInput<boolean>(PROG_ENB, () => startProgressive.f(), "checked")
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
    const shaderSelect = createWithLabel(
        createSelect(
            SEL_SHDR,
            ["Simple progressive", "Simple progressive with soft shadows", "Complex progressive"],
            "Simple Progressive"
        ),
        "Progressive shader type",
        false
    )
    interactables.append(progressiveEnabled, shaderSelect)

    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
