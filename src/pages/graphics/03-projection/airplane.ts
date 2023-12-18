import { Executable, ExecutableQueue, Matrix4x4, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    genreateVertexBuffer,
    setupShaderPipeline,
    genreateIndexBuffer,
    toNDC,
    createBind,
    writeToBufferF32,
} from "../../../libs/webgpu"

import {
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createRange,
    createRelevantFilesLink,
    createText,
    createTitle,
    createWithLabel,
    watchInput,
} from "../../../libs/web"

import {
    Colors,
    Cube,
    flattenVector,
    lookAtMatrix,
    multMatrices,
    vec3,
    createTranslateMatrix,
    perspectiveProjection,
    flattenMatrices,
    createScaleMatrix,
    flattenMatrix,
    createRotationYMatrix,
    vec4,
    identity4x4,
    createRotationXMatrix,
    createRotationZMatrix,
} from "../../../libs/util"

import shaderCode from "./airplane.wgsl?raw"
import { IShapeInfo } from "../../../types/shapes"

const CANVAS_ID = "airplane"
const YAW_SLIDER = "yaw-slider-airplane"
const PITCH_SLIDER = "pitch-slider-airplane"
const ROLL_SLIDER = "roll-slider-airplane"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const getYaw = watchInput<number>(YAW_SLIDER)
    const getPitch = watchInput<number>(PITCH_SLIDER)
    const getRoll = watchInput<number>(ROLL_SLIDER)

    const cube: IShapeInfo = Cube(vec3(0), 1)
    const lineIndices = cube.lineIndices as Uint32Array

    const vertices = new Float32Array(flattenVector(cube.vertices))
    const { buffer: indexBuffer } = genreateIndexBuffer(device, lineIndices)
    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateVertexBuffer(
        device,
        vertices,
        "float32x4"
    )

    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout],
        canvasFormat,
        shaderCode,
        "line-list"
    )

    const eye = vec3(5, 5, 5)
    const at = vec3(0)
    const up = vec3(0, 1, 0)
    const view = lookAtMatrix(eye, at, up)
    const perspective = perspectiveProjection(35, canvas.width / canvas.height, 0.1, 100)
    const projection = multMatrices(toNDC, perspective)

    const {
        bindGroup: uniformsBind,
        buffers: [uniformsBuffer],
    } = createBind(
        device,
        pipeline,
        [new Float32Array([0, 0, 0, 0, ...flattenMatrix(view), ...flattenMatrix(projection)])],
        "UNIFORM",
        0
    )

    const modelColors = []

    const fusealgeModel = createScaleMatrix(0.4, 0.4, 2)
    const cockpitModel = multMatrices(
        createScaleMatrix(0.35, 0.25, 0.35),
        createTranslateMatrix(vec3(0, -0.2, 3.3))
    )
    const wingLeftModel = multMatrices(
        createScaleMatrix(1.7, 0.2, 1.1),
        createTranslateMatrix(vec3(0.6))
    )
    const wingRightModel = multMatrices(
        createScaleMatrix(1.7, 0.2, 1.1),
        createTranslateMatrix(vec3(-0.6))
    )
    const verticalStabilizerModel = multMatrices(
        createScaleMatrix(0.2, 0.5, 0.3),
        createTranslateMatrix(vec3(0, 0.5, -3.3))
    )
    const horizontalStabilizerLeftModel = multMatrices(
        createScaleMatrix(0.5, 0.1, 0.2),
        createTranslateMatrix(vec3(-0.9, 0.4, -4.3))
    )
    const horizontalStabilizerRightModel = multMatrices(
        createScaleMatrix(0.5, 0.1, 0.2),
        createTranslateMatrix(vec3(0.9, 0.4, -4.3))
    )

    const staticModels = [
        fusealgeModel,
        cockpitModel,
        wingLeftModel,
        wingRightModel,
        verticalStabilizerModel,
        horizontalStabilizerLeftModel,
        horizontalStabilizerRightModel,
    ]
    modelColors.push(...new Array(staticModels.length).fill(vec4(0.7, 0.7, 0.7)))

    const createRudderModel = (rotationMatrix: Matrix4x4 = identity4x4()) =>
        multMatrices(
            multMatrices(createScaleMatrix(0.1, 0.3, 0.2), rotationMatrix),
            createTranslateMatrix(vec3(0, 0.5, -6))
        )
    modelColors.push(vec4(0, 1, 0))

    const createElevatorLeft = (rotationMatrix: Matrix4x4 = identity4x4()) =>
        multMatrices(
            multMatrices(createScaleMatrix(0.25, 0.05, 0.2), rotationMatrix),
            createTranslateMatrix(vec3(2, 0.4, -5.3))
        )
    const createElevatorRight = (rotationMatrix: Matrix4x4 = identity4x4()) =>
        multMatrices(
            multMatrices(createScaleMatrix(0.25, 0.05, 0.2), rotationMatrix),
            createTranslateMatrix(vec3(-2, 0.4, -5.3))
        )
    modelColors.push(vec4(1, 0, 0), vec4(1, 0, 0))

    const createAileronLeft = (rotationMatrix: Matrix4x4 = identity4x4()) =>
        multMatrices(
            multMatrices(createTranslateMatrix(vec3(-1, 0.1, -0.5)), rotationMatrix),
            createScaleMatrix(1, 0.1, 0.3)
        )
    const createAileronRight = (rotationMatrix: Matrix4x4 = identity4x4()) =>
        multMatrices(
            multMatrices(createTranslateMatrix(vec3(1, 0.1, -0.5)), rotationMatrix),
            createScaleMatrix(1, 0.1, 0.3)
        )
    modelColors.push(vec4(0.4, 0.4, 1), vec4(0.4, 0.4, 1))

    const allModels = [
        ...staticModels,
        createRudderModel(),
        createElevatorLeft(),
        createElevatorRight(),
        createAileronLeft(),
        createAileronRight(),
    ]

    const { bindGroup: modelsStorage, buffers: modelsBuffers } = createBind(
        device,
        pipeline,
        [
            new Float32Array(flattenMatrices(allModels)),
            new Float32Array(flattenVector(modelColors)),
        ],
        "STORAGE",
        1
    )

    let totalYaw = 0,
        totalPitch = 0,
        totalRoll = 0
    let yawSpeed = 0,
        pitchSpeed = 0,
        rollSpeed = 0
    const lerpFactor = 0.1

    const draw = (time: number) => {
        writeToBufferF32(device, uniformsBuffer, new Float32Array([time]), 0)

        const targetYawSpeed = 1 * getYaw()
        yawSpeed = yawSpeed * (1 - lerpFactor) + targetYawSpeed * lerpFactor
        totalYaw += yawSpeed

        const targetPitchSpeed = 1 * getPitch()
        pitchSpeed = pitchSpeed * (1 - lerpFactor) + targetPitchSpeed * lerpFactor
        totalPitch += pitchSpeed

        const targetRollSpeed = 1 * getRoll()
        rollSpeed = rollSpeed * (1 - lerpFactor) + targetRollSpeed * lerpFactor
        totalRoll += rollSpeed

        const rudderRotation = createRotationYMatrix(-yawSpeed * 20)
        const elevatorsRotation = createRotationXMatrix(-pitchSpeed * 20)
        const aileronLeftRotation =
            rollSpeed > 0 ? createRotationXMatrix(rollSpeed * 60) : identity4x4()
        const aileronRightRotation =
            rollSpeed < 0 ? createRotationXMatrix(-rollSpeed * 60) : identity4x4()
        const totalRotation = multMatrices(
            multMatrices(createRotationXMatrix(totalPitch), createRotationYMatrix(totalYaw)),
            createRotationZMatrix(totalRoll)
        )

        const allModels = [
            ...staticModels.map(m => multMatrices(totalRotation, m)),
            multMatrices(totalRotation, createRudderModel(rudderRotation)),
            multMatrices(totalRotation, createElevatorLeft(elevatorsRotation)),
            multMatrices(totalRotation, createElevatorRight(elevatorsRotation)),
            multMatrices(totalRotation, createAileronLeft(aileronLeftRotation)),
            multMatrices(totalRotation, createAileronRight(aileronRightRotation)),
        ]

        const rotatedModels = allModels.map(m => multMatrices(totalRotation, m))
        writeToBufferF32(
            device,
            modelsBuffers[0],
            new Float32Array(flattenMatrices(rotatedModels)),
            0
        )

        const { pass, executePass } = createPass(device, context, Colors.black)

        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)
        pass.setIndexBuffer(indexBuffer, "uint32")
        pass.setBindGroup(0, uniformsBind)
        pass.setBindGroup(1, modelsStorage)

        pass.drawIndexed(lineIndices.length, allModels.length)

        executePass()
        requestAnimationFrame(draw)
    }

    requestAnimationFrame(draw)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const a = createRelevantFilesLink("graphics/03-projection", ["/airplane.ts", "/airplane.wgsl"])

    const title = createTitle("About Gimbal's lock")
    const description = createText(`
As we descend into the depths of computer graphics, rotations of objects in three dimensions will become a big part of creating interactive showcases.

An issue which appears when using Euler angles with only three angle axes (three units of freedom) is a phenomenon known as Gimbal's lock. 
The short version is that a three-axes system cannot guarantee independent rotations. Each rotation is "local" to the previous rotations.
This can be observed when making half-rotations around two axess, which eliminates the third axis (ie. it does not have an effect).

In a later section, quaternions are introduced which are four dimensional abstractions of vectors. The fourth dimension allows the rotation information to remain absolute (without a reference system). 
One may think of these are homogeneous Euler angles.
    `)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactableSection = createInteractableSection()

    const yawSlider = createWithLabel(
        createRange(YAW_SLIDER, 0, -1, 1, 0.1),
        "Green rudder control (yaw)"
    )
    const pitchSlider = createWithLabel(
        createRange(PITCH_SLIDER, 0, -1, 1, 0.1),
        "Red elevators control (pitch)"
    )
    const rollSlider = createWithLabel(
        createRange(ROLL_SLIDER, 0, -0.5, 0.5, 0.1),
        "Blue ailerons control (roll)"
    )
    interactableSection.append(yawSlider, pitchSlider, rollSlider)

    canvasSection.append(canvas, interactableSection)
    div.append(title, a, description, canvasSection)

    executeQueue.push(execute)
}

export default view
