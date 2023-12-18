import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    genreateVertexBuffer,
    setupShaderPipeline,
    genreateIndexBuffer,
    generateDepthBuffer,
    generateMultisampleBuffer,
    writeToBufferF32,
    createBind,
    generateTexture,
    createTextureBind,
} from "../../../libs/webgpu"

import {
    asset,
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createRelevantFilesLink,
    createText,
    createTitle,
} from "../../../libs/web"

import {
    flattenVector,
    lookAtMatrix,
    multMatrices,
    vec3,
    perspectiveProjection,
    TetrahedronSphere,
    toVec3,
    flattenMatrix,
    vec4,
    toRadians,
    readImageData,
} from "../../../libs/util"

import shaderCode from "./earth.wgsl?raw"

const CANVAS_ID = "earth"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)
    const { textureData, width, height } = await readImageData(asset("textures/earth.jpg"))

    const sphere = TetrahedronSphere(7)
    const { buffer: indexBuffer } = genreateIndexBuffer(
        device,
        new Uint32Array(flattenVector(sphere.triangleIndices.map(v => toVec3(v))))
    )
    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateVertexBuffer(
        device,
        new Float32Array(flattenVector(sphere.vertices)),
        "float32x4"
    )
    const { buffer: colorBuffer, bufferLayout: colorBufferLayout } = genreateVertexBuffer(
        device,
        new Float32Array(
            flattenVector([
                vec4(1, 0, 0),
                vec4(0, 1, 0),
                vec4(0, 0, 1),
                vec4(1, 1, 1),
                ...new Array(sphere.vertices.length - 4).fill(vec4(0.4, 0.4, 0.4)),
            ])
        ),
        "float32x4",
        1
    )

    const msaaCount = 4
    const { multisample, msaaTexture } = generateMultisampleBuffer(
        device,
        canvas,
        canvasFormat,
        msaaCount
    )
    const { depthStencil, depthStencilAttachmentFactory } = generateDepthBuffer(
        device,
        canvas,
        msaaCount
    )

    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout, colorBufferLayout],
        canvasFormat,
        shaderCode,
        "triangle-list",
        { multisample, depthStencil }
    )

    const { sampler, texture } = generateTexture(device, textureData, width, height, {
        minFilter: "nearest",
        magFilter: "nearest",
    })
    const textureBind = createTextureBind(device, pipeline, texture, sampler, 1)

    const angle = toRadians(0)
    const eye = vec3(3 * Math.sin(angle), 0, 3 * Math.cos(angle))
    const at = vec3(0)
    const up = vec3(0, 1, 0)
    const view = lookAtMatrix(eye, at, up)

    const perspective = perspectiveProjection(45, canvas.width / canvas.height, 0.1, 100)
    const projection = perspective
    const projectionView = multMatrices(projection, view)
    const pvm = projectionView

    const {
        bindGroup: sceneDataBind,
        buffers: [sceneDataBuffer],
    } = createBind(device, pipeline, [new Float32Array(flattenMatrix(pvm))], "UNIFORM", 0)

    const updateRotation = (rotation: number) => {
        const angle = toRadians(rotation)
        const eye = vec3(3 * Math.sin(angle), Math.cos(angle), 3 * Math.cos(angle))
        const view = lookAtMatrix(eye, at, up)
        const projectionView = multMatrices(projection, view)
        const pvm = projectionView

        writeToBufferF32(device, sceneDataBuffer, new Float32Array(flattenMatrix(pvm)), 0)
    }

    const draw = (time: number) => {
        updateRotation(time / 5e1)

        const { pass, executePass } = createPass(device, context, vec4(0.5, 0.1, 0.5), {
            depthStencilAttachmentFactory,
            msaaTexture,
        })

        pass.setPipeline(pipeline)

        pass.setVertexBuffer(0, vertexBuffer)
        pass.setVertexBuffer(1, colorBuffer)
        pass.setIndexBuffer(indexBuffer, "uint32")

        pass.setBindGroup(0, sceneDataBind)
        pass.setBindGroup(1, textureBind)

        pass.drawIndexed(sphere.triangleCount * 3)

        executePass()
        requestAnimationFrame(draw)
    }

    requestAnimationFrame(draw)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const a = createRelevantFilesLink("graphics/06-textures", ["/earth.ts", "/earth.wgsl"])

    const title = createTitle("Earth ball")
    const description = createText(`
Using the sphere algorithm from the previous section combined with the ability to apply textures, a simplified model of the Earth can be created.

The sphere texture is a two dimensional rectangle and has to be mapped to a sphere. This is done with a uv-mapping function, which in this case is spherical uv-mapping.

To address magnification and minification, settings can be fiddled with, but in some cases it may not be possible to find a perfect solution.
With the earth texture, certain regions with high elevation are prone to aliasing issues due to many sudden changes in color values. 
This could be fixed by applying a heightmap which could stretch the crowded texels over a larger surface, but on a flat surface could instead be treated with applied smoothing filters.

Note: the earth texture is quite large and may take some time to load into the browser.
`)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactableSection = createInteractableSection()

    interactableSection.append()
    canvasSection.append(canvas, interactableSection)
    div.append(title, a, description, canvasSection)

    executeQueue.push(execute)
}

export default view
