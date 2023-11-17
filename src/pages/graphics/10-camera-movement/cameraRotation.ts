import {
    Executable,
    ExecutableQueue,
    ICanvasCoordinates,
    Matrix4x4,
    Vector3,
    ViewGenerator,
} from "../../../types"

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
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createRange,
    createSelect,
    createText,
    createTitle,
    createWithLabel,
    subscribeToCanvasDrag,
    subscribeToInput,
    watchInput,
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
    createRotationYMatrix,
    createRotationZMatrix,
    vectorMatrixMult,
    createRotationXMatrix,
    elementWise,
    toVec3,
    mapRange,
} from "../../../libs/util"

import shaderCode from "./shading.wgsl?raw"
import {
    quatApply,
    quatAsRotMat4x4,
    quatBetweenVectors,
    quatMultiply,
    unitQuaternion,
} from "../../../libs/util/quaternion"

const CANVAS_ID = "camera-movement"
const ROT_TYPE = "rotation-type-cam-movement"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const getRotationType = watchInput<"Euler" | "Quaternion">(ROT_TYPE)

    const monkeyObj = await parseOBJ("models/monkey.obj", 1, false)
    const monkeyDrawingInfo = getDrawingInfo(monkeyObj, { indicesIn3: true })

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
        { depthStencil, multisample }
    )

    const angle = toRadians(0)
    const r = 4
    const h = 0
    const initialEye = vec3(0, 0, 5)
    const at = vec3(0)
    const up = vec3(0, 1, 0)
    const view = lookAtMatrix(initialEye, at, up)

    const perspective = perspectiveProjection(30, canvas.width / canvas.height, 0.1, 100)
    const projection = perspective
    const projectionView = multMatrices(projection, view)

    const model = identity4x4()

    const projectionModel = multMatrices(projectionView, model)
    const {
        bindGroup: pvmBind,
        buffers: [pvmBuffer],
    } = createBind(
        device,
        pipeline,
        [new Float32Array([...flattenMatrix(projectionModel), ...initialEye, 1])],
        "UNIFORM",
        0
    )

    const movementType: "rot" | "transl" = "rot"

    const angular = 1

    let lastTickX = 0
    let lastTickY = 0
    let eulerRotX = 0
    let eulerRotY = 0
    let translX = 0
    let translY = 0
    let quatRot = unitQuaternion()

    const normalizeCoordinate = (c: number): number => mapRange(c, 0, 512, -1, 1)

    const onStart = (coordinates: ICanvasCoordinates) => {
        lastTickX = coordinates.x
        lastTickY = coordinates.y
    }

    const onMove = (coordinates: ICanvasCoordinates) => {
        if (movementType === "transl") {
            translX += coordinates.x - lastTickX
            translY += coordinates.y - lastTickY
        }
        if (movementType === "rot") {
            eulerRotX += -angular * (coordinates.x - lastTickX)
            eulerRotY += -angular * (coordinates.y - lastTickY)

            const nLastX = -normalizeCoordinate(lastTickX)
            const nLastY = normalizeCoordinate(lastTickY)
            const nCurrX = -normalizeCoordinate(coordinates.x)
            const nCurrY = normalizeCoordinate(coordinates.y)

            const dLast = Math.sqrt(nLastX * nLastX + nLastY * nLastY)
            const dCurr = Math.sqrt(nCurrX * nCurrX + nCurrY * nCurrY)

            const z = (d: number): number =>
                d > 1 / Math.sqrt(2) ? 1 / (2 * d) : Math.sqrt(1 - d * d)

            const u = vec3(nLastX, nLastY, z(dLast))
            const v = vec3(nCurrX, nCurrY, z(dCurr))
            const quatIncremental = quatBetweenVectors(u, v)

            quatRot = quatMultiply(quatRot, quatIncremental)
        }

        lastTickX = coordinates.x
        lastTickY = coordinates.y
    }

    const onEnd = (coordinates: ICanvasCoordinates) => {}

    subscribeToCanvasDrag(CANVAS_ID, { onStart, onMove, onEnd })

    const eulerView = (): { view: Matrix4x4; eye: Vector3 } => {
        const eulerRot = multMatrices(
            createRotationXMatrix(eulerRotY),
            createRotationYMatrix(eulerRotX)
        )
        const rotatedEye = vectorMatrixMult(initialEye, eulerRot)
        return { view: lookAtMatrix(rotatedEye, at, up), eye: rotatedEye }
    }

    const quatView = (): { view: Matrix4x4; eye: Vector3 } => {
        const rot = quatAsRotMat4x4(quatRot)

        const rotatedEye = vectorMatrixMult(initialEye, rot)

        // const eye = toVec3(quatApply([...up, 1], quatRot))
        // const view = lookAtMatrix(toVec3(quatApply([...initialEye, 1], quatRot)), at, eye)

        return { view: lookAtMatrix(rotatedEye, at, vectorMatrixMult(up, rot)), eye: rotatedEye }
        // return { view, eye }
    }

    const updateView = () => {
        const viewEye = (
            { Euler: eulerView, Quaternion: quatView } as {
                [key in "Euler" | "Quaternion"]: () => { view: Matrix4x4; eye: Vector3 }
            }
        )[getRotationType()]()

        const projectionView = multMatrices(projection, viewEye.view)
        const projectionModel = multMatrices(projectionView, model)

        writeToBufferF32(
            device,
            pvmBuffer,
            new Float32Array([...flattenMatrix(projectionModel), ...viewEye.eye, 1]),
            0
        )
    }

    const frame = (time: number) => {
        updateView()

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
        requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Camera movement")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID, 512, 512)
    const interactableSection = createInteractableSection()

    const rotationType = createWithLabel(
        createSelect(ROT_TYPE, ["Euler", "Quaternion"], "Quaternion"),
        "Rotation type",
        false
    )

    interactableSection.append(rotationType)
    canvasSection.append(canvas, interactableSection)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
