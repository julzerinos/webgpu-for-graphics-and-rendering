import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import { initializeWebGPU, createPass, setupShaderPipeline, createBind } from "../../../libs/webgpu"

import {
    asset,
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

    const { bindGroup: modelStorage } = createBind(
        device,
        pipeline,
        [interleavedVerticesNormals, interleavedIndicesMatIndices, lightFaceIndices],
        "STORAGE"
    )
    const { bindGroup: bspTreeStorage } = createBind(
        device,
        pipeline,
        [bspTreeResults.bspPlanes, bspTreeResults.bspTree, bspTreeResults.treeIds],
        "STORAGE",
        1
    )
    const { bindGroup: uniformsBind } = createBind(
        device,
        pipeline,
        [bspTreeResults.aabb, new Uint32Array([lightFaceIndices.length])],
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
        pass.setBindGroup(2, uniformsBind)
        pass.setBindGroup(3, materialsStorage)

        pass.draw(4)
        executePass()
    }

    draw()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Back to the box")
    const description = createText(`
The binary space partitioning tree algorithm can be applied to practically any model, but there is a consideration which arises when using WebGPU - the limitation on the number of storage buffers.
The BSP requires three arrays alone - one for the bounding box planes, one for the tree nodes and another for a mapping to the model triangles.

A solution to the claustrophobic space limitations on storage buffers may be alleviated with the help of interleaving (or interweaving if you prefer). 
The process is to mix (deterministically) two or more arrays into a single longer one, thereby sneaking it into the shader programs past the strict WebGPU bus customs.
A basic approach is to take two arrays of the same length and place their elements in alternating sequence. 
Luckily this doesn't require any complicated index manipulation, because the shader may be told to expect an array of data structure (structs) with two elements.
But, with the use of uniform buffers to carry meta data, any number of arrays of different lengths may be in fact weaved together or even glued in sequential order. The only constraint then is the data type (eg. floats float with floats, integers integrate with integers).

The example below not only recreates the Cornell box with the BSP tree, but also handles the weaving of the vertex and normal buffers as well as triangle indices and material indices together. This scene also includes an area light source model, but more about that in the next part.
`)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactables = createInteractableSection()

    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
