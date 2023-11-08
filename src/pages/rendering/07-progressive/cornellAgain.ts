import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import { initializeWebGPU, createPass, setupShaderPipeline, createBind } from "../../../libs/webgpu"

import {
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createText,
    createTitle,
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

import shaderCode from "./partitioningWithInterleave.wgsl?raw"

const CANVAS_ID = "cornell-interleave"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

    const modelDrawingInfo = getDrawingInfo(await parseOBJ("models/CornellBoxWithBlocks.obj"))
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

    const { bindGroup: modelStorage } = createBind(
        device,
        pipeline,
        [interleavedVerticesNormals, interleavedIndicesMatIndices],
        "STORAGE"
    )
    const { bindGroup: bspTreeStorage } = createBind(
        device,
        pipeline,
        [bspTreeResults.bspPlanes, bspTreeResults.bspTree, bspTreeResults.treeIds],
        "STORAGE",
        1
    )
    const { bindGroup: aaabUniform } = createBind(
        device,
        pipeline,
        [bspTreeResults.aabb],
        "UNIFORM",
        2
    )

    const { bindGroup: materialsStorage } = createBind(
        device,
        pipeline,
        [materialsArray],
        "STORAGE",
        3
    )

    const draw = () => {
        const { pass, executePass } = createPass(device, context, Colors.black)

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, modelStorage)
        pass.setBindGroup(1, bspTreeStorage)
        pass.setBindGroup(2, aaabUniform)
        pass.setBindGroup(3, materialsStorage)

        pass.draw(4)
        executePass()
    }

    draw()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Using the Binary Space Partitioning tree")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactables = createInteractableSection()

    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
