import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    generateTexture,
    createTextureBind,
    createStorageBind,
} from "../../../libs/webgpu"

import {
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createText,
    createTitle,
} from "../../../libs/web"

import { Colors, Triangle, flattenVector, readImageData, vec3 } from "../../../libs/util"

import shaderCode from "./introducingTriangles.wgsl?raw"

const CANVAS_ID = "default-scene-as-meshes"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)
    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

    const triangle = Triangle([vec3(-0.2, 0.1, 0.9), vec3(0.2, 0.1, 0.9), vec3(-0.2, 0.1, -0.1)])
    const { storageGroup: triangleStorage } = createStorageBind(
        device,
        pipeline,
        [new Float32Array(flattenVector(triangle.vertices)), triangle.triangleIndices],
        1
    )

    const imageData = await readImageData("/grass_minecraft.png")
    const { texture: texture, sampler: sampler } = generateTexture(
        device,
        imageData.textureData,
        imageData.width,
        imageData.height,
        { addressModeU: "repeat", addressModeV: "repeat" }
    )
    const textureBindGroup = createTextureBind(device, pipeline, texture, sampler)

    const draw = () => {
        const { pass, executePass } = createPass(device, context, Colors.black)

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, textureBindGroup)
        pass.setBindGroup(1, triangleStorage)

        pass.draw(4)
        executePass()
    }

    draw()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Replacing the triangle with a triangle")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)

    const interactables = createInteractableSection()
    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
