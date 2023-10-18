import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    genreateVertexBuffer,
    setupShaderPipeline,
    genreateIndexBuffer,
    createUniformBind,
    toNDC,
    generateDepthBuffer,
    generateMultisampleBuffer,
    writeToBufferF32,
    writeToBufferU32,
} from "../../../libs/webgpu"

import {
    createBoolInput,
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createRange,
    createText,
    createTitle,
    createWithLabel,
    subscribeMultiple,
    subscribeToInput,
    watchInput,
} from "../../../libs/web"

import {
    Colors,
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
} from "../../../libs/util"

import shaderCode from "./perspective.wgsl?raw"

const CANVAS_ID = "graphics-lighting"
const ROTATION_AROUND = "rotation-around-tetrahedron"
const SUBDIVISION = "subdivision-tetrahedron"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const getRotation = watchInput<number>(ROTATION_AROUND)
    const getSubdivision = watchInput<number>(SUBDIVISION)

    const spheres = new Array(8).fill(0).map((_, i) => TetrahedronSphere(i))
    const { buffer: indexBuffer } = genreateIndexBuffer(
        device,
        new Uint32Array(flattenVector(spheres[7].triangleIndices.map(v => toVec3(v))))
    )
    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateVertexBuffer(
        device,
        new Float32Array(flattenVector(spheres[7].vertices)),
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
                ...new Array(spheres[7].vertices.length - 4).fill(vec4(0.4, 0.4, 0.4)),
            ])
        ),
        "float32x4",
        1
    )

    writeToBufferU32(
        device,
        indexBuffer,
        new Uint32Array(
            flattenVector(spheres[getSubdivision()].triangleIndices.map(v => toVec3(v)))
        ),
        0,
        true
    )

    const msaaCount = 4
    const { multisample, msaaTexture } = generateMultisampleBuffer(
        device,
        canvas,
        canvasFormat,
        msaaCount
    )
    const { depthStencil, depthStencilAttachment } = generateDepthBuffer(device, canvas, msaaCount)

    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout, colorBufferLayout],
        canvasFormat,
        shaderCode,
        "triangle-list",
        { depthStencil, multisample }
    )

    const angle = toRadians(getRotation())
    const eye = vec3(3 * Math.cos(angle), 0, 3 * Math.sin(angle))
    const at = vec3(0)
    const up = vec3(0, 1, 0)
    const view = lookAtMatrix(eye, at, up)

    const perspective = perspectiveProjection(60, canvas.width / canvas.height, 0.1, 100)
    const projection = multMatrices(toNDC, perspective)
    const projectionView = multMatrices(projection, view)
    const pvm = projectionView

    const { bindGroup: pvmBind, uniformBuffer: pvmBuffer } = createUniformBind(
        device,
        pipeline,
        new Float32Array(flattenMatrix(pvm)),
        0
    )

    const updateRotation = (rotation: number) => {
        const angle = toRadians(rotation)
        const eye = vec3(3 * Math.cos(angle), 0, 3 * Math.sin(angle))
        const view = lookAtMatrix(eye, at, up)
        const projectionView = multMatrices(projection, view)
        const pvm = projectionView
        writeToBufferF32(device, pvmBuffer, new Float32Array(flattenMatrix(pvm)), 0)
    }

    const updateSubdivision = (subdivision: number) => {
        writeToBufferU32(
            device,
            indexBuffer,
            new Uint32Array(
                flattenVector(spheres[subdivision].triangleIndices.map(v => toVec3(v)))
            ),
            0,
            true
        )
    }

    subscribeToInput<number>(SUBDIVISION, updateSubdivision)
    subscribeToInput<number>(ROTATION_AROUND, updateRotation)

    let animatedRotation = true
    subscribeToInput<boolean>(
        ROT_ANIM_ENABLED,
        () =>
            (animatedRotation = (
                document.getElementById(ROTATION_AROUND) as HTMLInputElement
            ).disabled =
                !animatedRotation)
    )

    const draw = (time: number) => {
        if (animatedRotation) updateRotation(time / 5e1)

        const { pass, executePass } = createPass(device, context, Colors.black, {
            depthStencilAttachment,
            msaaTexture,
        })

        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)
        pass.setVertexBuffer(1, colorBuffer)
        pass.setIndexBuffer(indexBuffer, "uint32")
        pass.setBindGroup(0, pvmBind)

        pass.drawIndexed(spheres[getSubdivision()].triangleCount * 3)

        executePass()
        requestAnimationFrame(draw)
    }

    requestAnimationFrame(draw)
}

const ROT_ANIM_ENABLED = "tetrahedron-rotation-animation-enabled"
const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("A sphere")
    const description = createText("More than 7 sub crashes")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactableSection = createInteractableSection()

    const rotationAnimator = createWithLabel(
        createBoolInput(ROT_ANIM_ENABLED, true),
        "Animated rotation",
        false
    )

    const range = createRange(ROTATION_AROUND, 0, -180, 180, 1, true)
    const rotationAngleSlider = createWithLabel(range, "Rotation around the tetrahedron")

    const subdivisionInput = createWithLabel(
        createRange(SUBDIVISION, 0, 0, 7, 1),
        "Number of tetrahedron subdivisions"
    )

    interactableSection.append(rotationAnimator, rotationAngleSlider, subdivisionInput)
    canvasSection.append(canvas, interactableSection)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
