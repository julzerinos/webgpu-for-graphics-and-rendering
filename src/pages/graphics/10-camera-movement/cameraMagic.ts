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
    asset,
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createRelevantFilesLink,
    createSelect,
    createText,
    createTitle,
    createWithLabel,
    subscribeToCanvasDrag,
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
    getDrawingInfo,
    createRotationYMatrix,
    vectorMatrixMult,
    createRotationXMatrix,
    toVec3,
    mapRange,
    add,
    normalize,
    subtract,
    vec4,
    scale,
    vec2,
    magnitude,
    vectorsEqual,
} from "../../../libs/util"

import shaderCode from "./shading.wgsl?raw"
import {
    quatApply,
    quatBetweenVectors,
    quatMultiply,
    unitQuaternion,
} from "../../../libs/util/quaternion"

const CANVAS_ID = "camera-movement"
const MOV_TYPE = "movement-type-cam-movement"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const getMovementType = watchInput<
        "Euler rotation" | "Quaternion rotation" | "Dollying" | "Panning"
    >(MOV_TYPE)

    const monkeyObj = await parseOBJ(asset("models/monkey.obj"), 1, false)
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
    const { depthStencil, depthStencilAttachmentFactory } = generateDepthBuffer(device, canvas, 4)

    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout, normalBufferLayout],
        canvasFormat,
        shaderCode,
        "triangle-list",
        { depthStencil, multisample }
    )

    const initialEye = vec3(0, 0, 5)
    let eye = vec3(0, 0, 5)
    const initialAt = vec3(0)
    let at = vec3()
    const initialUp = vec3(0, 1, 0)
    let up = vec3(0, 1, 0)
    const view = lookAtMatrix(initialEye, initialAt, initialUp)

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

    const angular = 1
    const planar = 1e-2

    let movementType = getMovementType()

    let lastTickX = 0
    let lastTickY = 0
    let eulerRotX = 0
    let eulerRotY = 0
    let translX = 0
    let translY = 0
    let quatRot = unitQuaternion()

    const normalizeCoordinate = (c: number): number => mapRange(c, 0, 512, -1, 1)

    let animatedRotateStartCoordinates = vec2()
    let animatedRotateEndCoordinates = vec2()
    let animatedRotateStrength = 0

    const onStart = (coordinates: ICanvasCoordinates) => {
        animatedRotateStrength = 0
        animatedRotateStartCoordinates = vec2(coordinates.x, coordinates.y)
        spinTime = 0

        lastTickX = coordinates.x
        lastTickY = coordinates.y

        movementType = getMovementType()
    }

    const onMove = (coordinates: ICanvasCoordinates) => {
        if (movementType === "Dollying" || movementType === "Panning") {
            translX = planar * (coordinates.x - lastTickX)
            translY = -planar * (coordinates.y - lastTickY)
        }
        if (movementType === "Quaternion rotation" || movementType === "Euler rotation") {
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

    const onEnd = (coordinates: ICanvasCoordinates) => {
        translX = 0
        translY = 0

        if (movementType !== "Quaternion rotation") return

        animatedRotateEndCoordinates = vec2(coordinates.x, coordinates.y)
        if (vectorsEqual(animatedRotateStartCoordinates, animatedRotateEndCoordinates)) return

        const animatedRotateDirection = subtract(
            animatedRotateEndCoordinates,
            animatedRotateStartCoordinates
        )
        animatedRotateStrength = Math.min(magnitude(animatedRotateDirection), 20)
    }

    let spinTime = 0

    const updateSpin = () => {
        if (movementType !== "Quaternion rotation") {
            animatedRotateStrength = 0
            return
        }

        lastTickX = animatedRotateStartCoordinates[0]
        lastTickY = animatedRotateStartCoordinates[1]

        const diminishedStrength = animatedRotateStrength * Math.exp(-spinTime / 150)
        const coordinates = add(
            animatedRotateStartCoordinates,
            scale(
                normalize(subtract(animatedRotateEndCoordinates, animatedRotateStartCoordinates)),
                diminishedStrength
            )
        )

        if (animatedRotateStrength < 0.2) animatedRotateStrength = 0

        spinTime += 1
        onMove({ x: coordinates[0], y: coordinates[1] })
    }

    subscribeToCanvasDrag(CANVAS_ID, { onStart, onMove, onEnd })

    const eulerView = (): { view: Matrix4x4; eye: Vector3 } => {
        const eulerRot = multMatrices(
            createRotationXMatrix(eulerRotY),
            createRotationYMatrix(eulerRotX)
        )
        const rotatedEye = vectorMatrixMult(initialEye, eulerRot)
        const rotatedUp = vectorMatrixMult(initialUp, eulerRot)
        return { view: lookAtMatrix(rotatedEye, initialAt, rotatedUp), eye: rotatedEye }
    }

    const quatView = (): { view: Matrix4x4; eye: Vector3 } => {
        const rotatedUp = toVec3(quatApply([...up, 1], quatRot))
        const rotatedEye = toVec3(quatApply([...eye, 1], quatRot))
        const view = lookAtMatrix(rotatedEye, at, rotatedUp)

        return { view, eye: rotatedEye }
    }

    const dollyingView = (): { view: Matrix4x4; eye: Vector3 } => {
        eye[2] += translY

        return quatView()
    }

    const panningView = (): { view: Matrix4x4; eye: Vector3 } => {
        const right = scale(toVec3(quatApply(vec4(1), quatRot)), translX)
        const upwards = scale(toVec3(quatApply(vec4(0, 1), quatRot)), translY)

        at = subtract(at, add(right, upwards))

        return quatView()
    }

    const updateView = () => {
        const viewEye = (
            {
                "Euler rotation": eulerView,
                "Quaternion rotation": quatView,
                Dollying: dollyingView,
                Panning: panningView,
            } as {
                [key in "Euler rotation" | "Quaternion rotation" | "Dollying" | "Panning"]?: () => {
                    view: Matrix4x4
                    eye: Vector3
                }
            }
        )[getMovementType()]!()

        const projectionView = multMatrices(projection, viewEye.view)
        const projectionModel = multMatrices(projectionView, model)

        writeToBufferF32(
            device,
            pvmBuffer,
            new Float32Array([...flattenMatrix(projectionModel), ...viewEye.eye, 1]),
            0
        )
    }

    const frame = () => {
        if (animatedRotateStrength > 0) updateSpin()
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
    const a = createRelevantFilesLink("graphics/10-camera-movement", [
        "/cameraMagic.ts",
        "/shading.wgsl",
    ])

    const title = createTitle("Quaternions - engineering space magic")
    const description = createText(`
Quaternions get a bad reputation due their abstract complexity and use of spooky imaginary numbers. But looking past the quaternion mathematical definition, it helps to understand the concept and foremost, the purpose of the enigmatic quaternion.

The quaternion addresses an issue which was mentioned earlier - Gimbal's lock. Using only three degrees of freedom to control rotation results in two axis "overpowering" the third - or in other words, rotations are local and impact each other.
Quaternions allow "absolute" rotation where the reference is world space. 
The fourth degree enables the quaternion to store more information about the rotation which in turn enables the rotation to always be in the correct direction relative to the camera or world space.

In the example below it is easy to obfuscate up one of the axes of rotation (where only two are being manipulated). One half rotation around the y-axis will flip the direction of rotation, while the acting "force" did not change its form. Changing to quaternion rotation solves this issue. the applied rotation is always the same, no matter what the previous rotation was.

The quaternion rotation is implemented with trackball movement which simulates the use of trackball peripheral device. The trackball allows the user to rotate in three directions unlike the mouse which is bound to the two dimensional plane. In the canvas below (when in quaternion rotation mode), the moving along the center axes of the canvas will rotated strictly about the respective axis, whereas movement along the edges of the canvas will generate more complex rotations involving the third rotation axis (depth).

Two more camera movement options are implemented - panning and dollying - which are translational movements along the parallel plane and along the perpendicular plane respectively.
`)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactableSection = createInteractableSection()

    const movementType = createWithLabel(
        createSelect(
            MOV_TYPE,
            ["Euler rotation", "Quaternion rotation", "Dollying", "Panning"],
            "Quaternion rotation"
        ),
        "Movement type",
        false
    )

    interactableSection.append(movementType)
    canvasSection.append(canvas, interactableSection)
    div.append(title, a, description, canvasSection)

    executeQueue.push(execute)
}

export default view
