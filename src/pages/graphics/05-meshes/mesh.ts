import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    genreateVertexBuffer,
    setupShaderPipeline,
    genreateIndexBuffer,
    writeToBufferF32,
    generateDepthBuffer,
    generateMultisampleBuffer,
    createBind,
} from "../../../libs/webgpu"

import {
    asset,
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createRange,
    createRelevantFilesLink,
    createText,
    createTitle,
    createWithLabel,
    subscribeToInput,
} from "../../../libs/web"

import {
    Colors,
    lookAtMatrix,
    multMatrices,
    vec3,
    perspectiveProjection,
    parseOBJ,
    identity4x4,
    flattenMatrix,
    toRadians,
    getDrawingInfo,
} from "../../../libs/util"

import shaderCode from "./shading.wgsl?raw"

const CANVAS_ID = "monkey"
const ROTATION_AROUND = "rotation-around-monkey"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const monkeyObj = await parseOBJ(asset("models/monkey.obj"), 1, false)
    // const monkeyShape = objToShape(monkeyObj)
    const monkeyDrawingInfo = getDrawingInfo(monkeyObj, { indicesIn3: true })

    // const vertices = new Float32Array(flattenVector(monkeyShape.vertices))
    // const triangles = new Uint32Array(
    //     flattenVector(monkeyShape.triangleIndices.map(v => toVec3(v)))
    // )

    const { buffer: indexBuffer } = genreateIndexBuffer(device, monkeyDrawingInfo.indices)
    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateVertexBuffer(
        device,
        monkeyDrawingInfo.vertices,
        "float32x4"
    )
    const { buffer: normalBuffer, bufferLayout: normalBufferLayout } = genreateVertexBuffer(
        device,
        monkeyDrawingInfo.normals,
        "float32x4",
        1
    )

    const { msaaTexture, multisample } = generateMultisampleBuffer(device, canvas, canvasFormat, 4)
    const { createDepthTexture, depthStencil, depthStencilAttachmentFactory } = generateDepthBuffer(
        device,
        canvas,
        4
    )

    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout, normalBufferLayout],
        canvasFormat,
        shaderCode,
        "triangle-list",
        { depthStencil, multisample, primitive: { frontFace: "ccw", cullMode: "back" } }
    )

    createDepthTexture()

    const angle = toRadians(0)
    const r = 4
    const h = 0
    const eye = vec3(r * Math.sin(angle), h, r * Math.cos(angle))
    const at = vec3(0)
    const up = vec3(0, 1, 0)
    const view = lookAtMatrix(eye, at, up)

    const perspective = perspectiveProjection(30, canvas.width / canvas.height, 0.1, 100)
    const projection = perspective //multMatrices( perspective)
    const projectionView = multMatrices(projection, view)

    const model = identity4x4()

    const projectionModel = multMatrices(projectionView, model)
    const {
        bindGroup: pvmBind,
        buffers: [pvmBuffer],
    } = createBind(
        device,
        pipeline,
        [new Float32Array([...flattenMatrix(projectionModel), ...eye, 1])],
        "UNIFORM",
        0
    )

    const updateRotation = (rotation: number) => {
        const angle = toRadians(rotation)
        const eye = vec3(r * Math.sin(angle), h, r * Math.cos(angle))
        const view = lookAtMatrix(eye, at, up)

        const projectionView = multMatrices(projection, view)
        const projectionModel = multMatrices(projectionView, model)

        writeToBufferF32(
            device,
            pvmBuffer,
            new Float32Array([...flattenMatrix(projectionModel), ...eye, 1]),
            0
        )

        draw()
    }

    subscribeToInput<number>(ROTATION_AROUND, updateRotation)

    const draw = () => {
        const { pass, executePass } = createPass(device, context, Colors.black, {
            depthStencilAttachmentFactory,
            msaaTexture,
        })

        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)
        pass.setVertexBuffer(1, normalBuffer)
        pass.setIndexBuffer(indexBuffer, "uint32")
        pass.setBindGroup(0, pvmBind)

        pass.drawIndexed(monkeyDrawingInfo.indices.length)

        executePass()
    }

    draw()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const a = createRelevantFilesLink("graphics/05-meshes", ["/mesh.ts", "/shading.wgsl"])

    const title = createTitle("The Blender Monkey")
    const description = createText(`
More interesting than primitive shapes are models created to represent specific objects. The entire graphics pipeline is made to support the display and animation of such models.

As an example, the mascot of the 3D modelling software Blender - Suzanne - is rendered to the screen below. The same lighting set up is used as with the sphere.

Another graphics feature is added to the mix - z-buffer indexing. This is the process of creating a (temporary for the time of creating the framebuffer) z-buffer. It store the z value (depth) of a fragment when it is drawn.
Each following fragment's depth value to compared to the current closest fragment and it may either be discarded (if it is covered) or it may overwrite if it is the closer (to the viewer) fragment.
    `)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactableSection = createInteractableSection()

    const rotationAngleSlider = createWithLabel(
        createRange(ROTATION_AROUND, 0, -180, 180, 1),
        "Rotation around the monkey"
    )

    interactableSection.append(rotationAngleSlider)
    canvasSection.append(canvas, interactableSection)
    div.append(title, a, description, canvasSection)

    executeQueue.push(execute)
}

export default view
