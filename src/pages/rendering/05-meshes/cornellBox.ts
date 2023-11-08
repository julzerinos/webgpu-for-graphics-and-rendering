import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    createBind,
    writeToBufferU32,
} from "../../../libs/webgpu"

import {
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createSelect,
    createText,
    createTitle,
    createWithLabel,
    subscribeToInput,
} from "../../../libs/web"

import { Colors, flattenVector, objToShape, parseOBJ, vec4 } from "../../../libs/util"

import shaderCode from "./cornellBox.wgsl?raw"

const CANVAS_ID = "cornell-box"
const SHADING_SELECT_TYPES = ["Flat", "Lambertian"]
const SHADING_SELECT_TYPE_ID = "shading-select-cb"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)
    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

    const conrellBoxObj = await parseOBJ("models/CornellBoxWithBlocks.obj")
    const cornellBoxShape = objToShape(conrellBoxObj, {})
    const materialsArray = new Float32Array(
        conrellBoxObj.mtls[0].materials.reduce(
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

    const lightFaceIndices = (cornellBoxShape.materialIndices as number[]).reduce(
        (illuminatedIndices, m, i) => {
            if (conrellBoxObj.mtls[0].materials[m].illum >= 1) illuminatedIndices.push(i)
            return illuminatedIndices
        },
        [] as number[]
    )

    const { bindGroup: cornellBoxStorage } = createBind(
        device,
        pipeline,
        [
            new Float32Array(flattenVector(cornellBoxShape.vertices)),
            new Uint32Array(flattenVector(cornellBoxShape.triangleIndices)),
            new Uint32Array(cornellBoxShape.materialIndices as number[]),
            new Uint32Array(lightFaceIndices),
        ],
        "STORAGE",
        0
    )

    const {
        bindGroup: cornellBoxMetaBind,
        buffers: [cornellBoxMetaBuffer],
    } = createBind(
        device,
        pipeline,
        [new Uint32Array([cornellBoxShape.triangleCount, lightFaceIndices.length, 0])],

        "UNIFORM",
        1
    )
    const { bindGroup: materialsStorage } = createBind(
        device,
        pipeline,
        [materialsArray],
        "STORAGE",
        2
    )

    const draw = (shadingType: "Flat" | "Lambertian") => {
        const shadingTypeCode = { Flat: 0, Lambertian: 1 }[shadingType]
        writeToBufferU32(device, cornellBoxMetaBuffer, new Uint32Array([shadingTypeCode]), 2 * 4)

        const { pass, executePass } = createPass(device, context, Colors.black)

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, cornellBoxStorage)
        pass.setBindGroup(1, cornellBoxMetaBind)
        pass.setBindGroup(2, materialsStorage)

        pass.draw(4)
        executePass()
    }

    const shadingType = subscribeToInput<"Flat" | "Lambertian">(SHADING_SELECT_TYPE_ID, draw)

    draw(shadingType)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Inside the Cornell box")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactables = createInteractableSection()

    const shadingSelect = createWithLabel(
        createSelect(SHADING_SELECT_TYPE_ID, SHADING_SELECT_TYPES, "Lambertian"),
        "Shading type",
        false
    )

    interactables.append(shadingSelect)
    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
