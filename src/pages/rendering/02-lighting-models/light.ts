import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    createUniformBind,
    writeToBufferF32,
} from "../../../libs/webgpu"

import {
    createCanvas,
    createCanvasSection,
    createWithLabel,
    createInteractableSection,
    createRange,
    createText,
    createTitle,
    watchInput,
    createSelect,
} from "../../../libs/web"

import { Colors } from "../../../libs/util"

import shaderCode from "./light.wgsl?raw"

const CANVAS_ID = "mirrors"
const SHADER_TYPE_MAP: { [key: string]: number } = {
    "Base color": 0,
    Lambertian: 1,
    Mirror: 2,
    Refractive: 3,
    Phong: 4,
    Glossy: 5,
}
const SPHERE_SHADER_SELECT_ID = CANVAS_ID + "-sphere-shader"
const TRIANGLE_SHADER_SELECT_ID = CANVAS_ID + "-triangle-shader"
const PLANE_SHADER_SELECT_ID = CANVAS_ID + "-plane-shader"
const LIGHT_POSX_ID = CANVAS_ID + "-light-position-x-input"
const LIGHT_POSY_ID = CANVAS_ID + "-light-position-y-input"
const LIGHT_POSZ_ID = CANVAS_ID + "-light-position-z-input"
const ANIM_SPEED_SLIDER_ID = CANVAS_ID + "-animation-slider"

const execute: Executable = async () => {
    const { device, context, canvas, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const getLightPosX = watchInput<number>(LIGHT_POSX_ID)
    const getLightPosY = watchInput<number>(LIGHT_POSY_ID)
    const getLightPosZ = watchInput<number>(LIGHT_POSZ_ID)
    const getSphereShaderType = watchInput<string>(SPHERE_SHADER_SELECT_ID)
    const getTriangleShaderType = watchInput<string>(TRIANGLE_SHADER_SELECT_ID)
    const getPlaneShaderType = watchInput<string>(PLANE_SHADER_SELECT_ID)
    const getAnimationSpeed = watchInput<number>(ANIM_SPEED_SLIDER_ID)

    const aspectRatio = canvas.width / canvas.height

    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

    const viewboxOptions = new Float32Array([aspectRatio, 0])
    const { bindGroup: viewboxOptionsBind, uniformBuffer: viewboxOptionsBuffer } =
        createUniformBind(device, pipeline, viewboxOptions)

    const lightSettings = new Float32Array([
        getLightPosX(),
        getLightPosY(),
        getLightPosZ(),
        SHADER_TYPE_MAP[getSphereShaderType()],
        SHADER_TYPE_MAP[getTriangleShaderType()],
        SHADER_TYPE_MAP[getPlaneShaderType()],
        0,
        0,
        0,
    ])
    const { bindGroup: lightSettingsBind, uniformBuffer: lightSettingsBuffer } = createUniformBind(
        device,
        pipeline,
        lightSettings,
        1
    )

    const draw = (time: number) => {
        writeToBufferF32(
            device,
            viewboxOptionsBuffer,
            new Float32Array([aspectRatio, (time * getAnimationSpeed()) / 512]),
            0
        )
        writeToBufferF32(
            device,
            lightSettingsBuffer,
            new Float32Array([
                getLightPosX(),
                getLightPosY(),
                getLightPosZ(),
                SHADER_TYPE_MAP[getSphereShaderType()],
                SHADER_TYPE_MAP[getTriangleShaderType()],
                SHADER_TYPE_MAP[getPlaneShaderType()],
                0,
                0,
                0,
            ]),
            0
        )

        const { pass, executePass } = createPass(device, context, Colors.black)

        pass.setPipeline(pipeline)

        pass.setBindGroup(0, viewboxOptionsBind)
        pass.setBindGroup(1, lightSettingsBind)

        pass.draw(4)
        executePass()

        requestAnimationFrame(draw)
    }

    requestAnimationFrame(draw)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Mirrors")
    const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID, 512 + 128, 512 - 64)

    const interactables = createInteractableSection()

    const selectSphereShaderType = createWithLabel(
        createSelect(SPHERE_SHADER_SELECT_ID, Object.keys(SHADER_TYPE_MAP), "Refractive"),
        "Sphere shader type",
        false
    )
    const selectTriangleShaderType = createWithLabel(
        createSelect(TRIANGLE_SHADER_SELECT_ID, Object.keys(SHADER_TYPE_MAP), "Lambertian"),
        "Triangle shader type",
        false
    )
    const selectPlaneShaderType = createWithLabel(
        createSelect(PLANE_SHADER_SELECT_ID, Object.keys(SHADER_TYPE_MAP), "Lambertian"),
        "Plane shader type",
        false
    )
    const lightPositionX = createWithLabel(
        createRange(LIGHT_POSX_ID, 0, -5, 5, 0.1),
        "Light X position"
    )
    const lightPositionY = createWithLabel(
        createRange(LIGHT_POSY_ID, 1, 0, 5, 0.1),
        "Light Y position"
    )
    const lightPositionZ = createWithLabel(
        createRange(LIGHT_POSZ_ID, 0, -5, 5, 0.1),
        "Light Z position"
    )
    const animationSpeedSlider = createWithLabel(
        createRange(ANIM_SPEED_SLIDER_ID, 0, 0, 1, 0.1),
        "Orbit animation speed"
    )

    interactables.append(
        selectSphereShaderType,
        selectTriangleShaderType,
        selectPlaneShaderType,
        lightPositionX,
        lightPositionY,
        lightPositionZ,
        animationSpeedSlider
    )

    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)
    executeQueue.push(execute)
}

export default view
