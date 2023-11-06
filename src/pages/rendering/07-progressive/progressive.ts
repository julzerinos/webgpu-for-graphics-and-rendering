import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    createBind,
    writeToBufferU32,
    generatePingPongTextures,
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

import shaderCode from "./progressive.wgsl?raw"

const CANVAS_ID = "cornell-progressive"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)
    const pipeline = setupShaderPipeline(
        device,
        [],
        canvasFormat,
        shaderCode,
        "triangle-strip",
        {},
        { fragmentOverrides: { targets: [{ format: canvasFormat }, { format: "rgba32float" }] } }
    )

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

    const { bindGroup: cornellBoxMetaBind } = createBind(
        device,
        pipeline,
        [new Uint32Array([cornellBoxShape.triangleCount, lightFaceIndices.length])],

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

    const { renderSrc, blitPingPong } = generatePingPongTextures(device, canvas)

    const draw = () => {
        const { pass, encoder } = createPass(device, context, Colors.black, {
            otherColorAttachments: [
                { view: renderSrc.createView(), loadOp: "load", storeOp: "store" },
            ],
        })

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, cornellBoxStorage)
        pass.setBindGroup(1, cornellBoxMetaBind)
        pass.setBindGroup(2, materialsStorage)

        pass.draw(4)

        pass.end()
        blitPingPong(encoder)
        device.queue.submit([encoder.finish()])
    }

    draw()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Inside the Cornell box")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    // const interactables = createInteractableSection()
    // interactables.append(shadingSelect)
    canvasSection.append(canvas)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
