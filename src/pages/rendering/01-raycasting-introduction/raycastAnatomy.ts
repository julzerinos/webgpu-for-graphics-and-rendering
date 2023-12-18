import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import { initializeWebGPU, createPass, setupShaderPipeline } from "../../../libs/webgpu"

import {
    createCanvas,
    createCanvasSection,
    createRelevantFilesLink,
    createText,
    createTitle,
} from "../../../libs/web"

import { Colors } from "../../../libs/util"

import shaderCode from "./raycastAnatomy.wgsl?raw"

const CANVAS_ID = "raycast-anatomy"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

    const { pass, executePass } = createPass(device, context, Colors.black)

    pass.setPipeline(pipeline)
    pass.draw(4)

    executePass()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    // const a = createRelevantFilesLink(["rendering/01-raycasting-introduction/raycastAnatomy.ts"])

    const title = createTitle("The anatomy of rendering")
    const description = createText(`
Before one peers into the world of rendering, ray casting, path tracing and the deep depths of global illumination - one should understand the basic building block of the rendering system - the ray.

The rendering system is built with physical constraints in mind, and so the ray is an imitation of the friendly vessels we observe in the real world - light rays. 
Computationally, generating, storing, amassing and integrating inifinte amounts of light rays and their interactions with materials is not feasible on modern hardware, 
therefore the compromise is to only handle the light and shading directly seen by the viewer (the virtual camera).

And so, the camera ray is born. Shown below is each fragment (pixel) of the the canvas in the color of the direction of its camera ray.
`)

    const canvas = createCanvas(CANVAS_ID)
    const canvasSection = createCanvasSection()
    canvasSection.append(canvas)

    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
