import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    generateTexture,
    createTextureBind,
    createBind,
} from "../../../libs/webgpu"

import {
    asset,
    createCanvas,
    createCanvasSection,
    createRelevantFilesLink,
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
    const { bindGroup: triangleStorage } = createBind(
        device,
        pipeline,
        [
            new Float32Array(flattenVector(triangle.vertices)),
            new Uint32Array(flattenVector(triangle.triangleIndices)),
        ],
        "STORAGE",
        1
    )

    const imageData = await readImageData(asset("textures/grass_minecraft.png"))
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
    const a = createRelevantFilesLink("rendering/05-meshes", [
        "/introducingTriangles.ts",
        "/introducingTriangles.wgsl",
    ])

    const title = createTitle("Replacing the triangle with a triangle")
    const description = createText(`
As a first step towards the introduction of triangle-based mesh model data to the rendering system, we will first replace the triangle... with a triangle.
Up to this point, all the shapes were conceptual - living only in the mind of the GPU, defined as mathematical parameterizations of objects.

But interesting meshes are more commonly not mathematical monstrosities, but artistic sculptures carved in polygons. These have to be passed to the GPU from the CPU.
The triangle in the scene below is defined as a vertex buffer, but passed to the GPU as a uniform/storage buffer. The shader loops over each of these triangles when intersecting a ray.

Inefficient? Absolutely, but that is a worry for a later chapter.
`)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)

    canvasSection.append(canvas)
    div.append(title, a, description, canvasSection)

    executeQueue.push(execute)
}

export default view
