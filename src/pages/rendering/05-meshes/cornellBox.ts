import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    createStorageBind,
    createUniformBind,
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

import { color, Colors, flattenVector, objToShape, objToShapes } from "../../../libs/util"

import shaderCode from "./cornellBox.wgsl?raw"
import cornellBoxWithBlocksObjFile from "./CornellBoxWithBlocks.obj?raw"

const CANVAS_ID = "cornell-box"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)
    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

    const cornellBoxShape = objToShape(cornellBoxWithBlocksObjFile) // #todo: replace with public file link
    console.log(cornellBoxShape)

    const { storageGroup: cornellBoxStorage } = createStorageBind(
        device,
        pipeline,
        [
            new Float32Array(flattenVector(cornellBoxShape.vertices)),
            cornellBoxShape.triangleIndices,
        ],
        0
    )
    const { bindGroup: cornellBoxMetaBind } = createUniformBind(
        device,
        pipeline,
        new Uint32Array([cornellBoxShape.triangleCount]),
        1
    )

    const draw = () => {
        const { pass, executePass } = createPass(device, context, Colors.black)

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, cornellBoxStorage)
        pass.setBindGroup(1, cornellBoxMetaBind)

        pass.draw(4)
        executePass()
    }

    draw()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Inside the Cornell box")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactables = createInteractableSection()

    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
