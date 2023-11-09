import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    createBind,
    writeToBufferF32,
} from "../../../libs/webgpu"

import {
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createRange,
    createText,
    createTitle,
    createWithLabel,
    watchInput,
} from "../../../libs/web"

import { Colors, build_bsp_tree, getDrawingInfo, parseOBJ } from "../../../libs/util"

import shaderCode from "./partitioning.wgsl?raw"

const CANVAS_ID = "bsp"
const ANIM_SPEED = "animation-speed-bsp"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const getSpeed = watchInput<number>(ANIM_SPEED)

    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

    const modelDrawingInfo = getDrawingInfo(await parseOBJ("models/bunny.obj", 1))
    const bspTreeResults = build_bsp_tree(modelDrawingInfo)

    const { bindGroup: modelStorage } = createBind(
        device,
        pipeline,
        [bspTreeResults.vertices, bspTreeResults.normals, bspTreeResults.indices],
        "STORAGE"
    )
    const { bindGroup: bspTreeStorage } = createBind(
        device,
        pipeline,
        [bspTreeResults.bspPlanes, bspTreeResults.bspTree, bspTreeResults.treeIds],
        "STORAGE",
        1
    )
    const {
        bindGroup: aaabUniform,
        buffers: [_, timeBuffer],
    } = createBind(device, pipeline, [bspTreeResults.aabb, new Float32Array([0])], "UNIFORM", 2)

    let totalTime = 0
    const draw = () => {
        totalTime += 0.025 * getSpeed()
        writeToBufferF32(device, timeBuffer, new Float32Array([totalTime]), 0)

        const { pass, executePass } = createPass(device, context, Colors.black)

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, modelStorage)
        pass.setBindGroup(1, bspTreeStorage)
        pass.setBindGroup(2, aaabUniform)

        pass.draw(4)
        executePass()

        requestAnimationFrame(draw)
    }

    requestAnimationFrame(draw)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Using the Binary Space Partitioning tree")
    const description = createText("why dots in black?")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactables = createInteractableSection()

    const animationModifier = createWithLabel(
        createRange(ANIM_SPEED, 0, 0, 1, 0.01),
        "Speed of the animation"
    )

    interactables.append(animationModifier)
    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
