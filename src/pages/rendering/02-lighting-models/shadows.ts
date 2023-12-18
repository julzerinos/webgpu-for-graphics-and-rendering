import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    writeToBufferF32,
    createBind,
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
    createRelevantFilesLink,
} from "../../../libs/web"

import { Colors } from "../../../libs/util"

import shaderCode from "./shadows.wgsl?raw"

const CANVAS_ID = "lighting"
const LIGHT_POSX_ID = CANVAS_ID + "-light-position-x-input"
const LIGHT_POSY_ID = CANVAS_ID + "-light-position-y-input"
const LIGHT_POSZ_ID = CANVAS_ID + "-light-position-z-input"

const execute: Executable = async () => {
    const { device, context, canvas, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const getLightPosX = watchInput<number>(LIGHT_POSX_ID)
    const getLightPosY = watchInput<number>(LIGHT_POSY_ID)
    const getLightPosZ = watchInput<number>(LIGHT_POSZ_ID)

    const aspectRatio = canvas.width / canvas.height

    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

    const viewboxOptions = new Float32Array([aspectRatio])
    const { bindGroup: viewboxOptionsBind } = createBind(
        device,
        pipeline,
        [viewboxOptions],
        "UNIFORM"
    )

    const lightSettings = new Float32Array([
        getLightPosX(),
        getLightPosY(),
        getLightPosZ(),
        0,
        0,
        0,
        0,
        0,
        0,
    ])
    const {
        bindGroup: lightSettingsBind,
        buffers: [lightSettingsBuffer],
    } = createBind(device, pipeline, [lightSettings], "UNIFORM", 1)

    const draw = () => {
        writeToBufferF32(
            device,
            lightSettingsBuffer,
            new Float32Array([getLightPosX(), getLightPosY(), getLightPosZ(), 0, 0, 0, 0, 0, 0]),
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
    const a = createRelevantFilesLink("rendering/02-lighting-models", [
        "/shadows.ts",
        "/shadows.wgsl",
    ])

    const title = createTitle("Let there be shade")
    const description = createText(`
After implementing lighting, the next step is to introduce shade. An enourmous advantage rendering systems have over the rasterization pipeline is the ease with which simple physical phenomena such as obstruction of a light source can be generated.

As you may have guessed at this point, light obstruction is also a ray, but it is cast from the intersection point in the direction of the light source. 
This is another way of querying the scene for information and as will be shown in the next example, 
starting new rays or continuing rays from defined points depending on the interaction type is the bread and butter of path tracing.
`)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID, { width: 512 + 128, height: 512 - 64 })

    const interactables = createInteractableSection()

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

    interactables.append(lightPositionX, lightPositionY, lightPositionZ)

    canvasSection.append(canvas, interactables)
    div.append(title, a, description, canvasSection)
    executeQueue.push(execute)
}

export default view
