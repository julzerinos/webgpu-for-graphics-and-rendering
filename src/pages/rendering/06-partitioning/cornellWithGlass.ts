import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    createBind,
    writeToBufferU32,
} from "../../../libs/webgpu"

import {
    asset,
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

import shaderCode from "./cornellWithGlass.wgsl?raw"

const CANVAS_ID = "cornell-glass"
const JITTERING = "jittering-active-bsp-cb"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

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
    const title = createTitle("Light as an area")
    const description = createText(`
So far lights have been either points or directions without physical representations. 
A point light may be represented by a light bulb, but the light model and bulb model are no dependent on each other. 
The light may still emit without the bulb model, just as the bulb model may be bright without having to imitate a point light. 
It may not come as a surprise, but in most skyboxes the sun is just an image, the light is generated by a directional light model.

The area light model aims to connect the two worlds by considering only a light (triangle) surface emission. 
In the Cornell box below, the light is a quad made up of two triangles. 
Their total area and pose has an impact on the light strength and light flux on object surfaces the light source emits to. 
In this example the light source position is still modelled by the center of the area light (distant area light approximation), 
but in the next section the area light will reach its full potential.

Jittering is also enabled to smoothen edges. It is still powered by pre-computed jitters, but will be repalced in the next section.
`)

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
