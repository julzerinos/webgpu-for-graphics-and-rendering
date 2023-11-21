import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    createBind,
    writeToBufferU32,
} from "../../../libs/webgpu"

import {
    createBoolInput,
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createText,
    createTitle,
    createWithLabel,
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

import shaderCode from "./cbWithBalls.wgsl?raw"

const CANVAS_ID = "cornell-glass"
const JITTERING = "jittering-active-bsp-cb"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

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
    const {
        bindGroup: uniformsBind,
        buffers: [_, __, subdivisionCountBuffer],
    } = createBind(
        device,
        pipeline,
        [bspTreeResults.aabb, new Uint32Array([lightFaceIndices.length]), new Uint32Array([36])],
        "UNIFORM",
        2
    )

    const jitters = computeJitters(canvas.height, 6)
    const { bindGroup: materialsStorage } = createBind(
        device,
        pipeline,
        [materialsArray, new Float32Array(flattenVector(jitters))],
        "STORAGE",
        3
    )

    const updateSubdivisions = (jitteringEnabled: boolean) => {
        const subdivisions = jitteringEnabled ? 36 : 1
        writeToBufferU32(device, subdivisionCountBuffer, new Uint32Array([subdivisions]), 0)
        draw()
    }

    subscribeToInput<boolean>(JITTERING, updateSubdivisions, "checked")

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
    const title = createTitle("Spicing things up")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactables = createInteractableSection()

    const jitteringActive = createWithLabel(
        createBoolInput(JITTERING, true),
        "Jittering enabled",
        false
    )
    interactables.append(jitteringActive)

    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
