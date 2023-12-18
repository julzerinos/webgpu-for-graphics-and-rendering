import { Executable, ExecutableQueue, ViewGenerator } from "../../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    writeToBufferF32,
    createBind,
} from "../../../../libs/webgpu"

import {
    createCanvas,
    createCanvasSection,
    createWithLabel,
    createRange,
    createText,
    createTitle,
    createInteractableSection,
    subscribeToInput,
} from "../../../../libs/web"

import { Colors } from "../../../../libs/util"

import shaderCode from "./rayLineIntersection.wgsl?raw"

const CANVAS_ID = "ray-line-intersection"

const execute: Executable = async () => {
    const { device, context, canvas, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

    const {
        bindGroup,
        buffers: [thicknessBuffer],
    } = createBind(device, pipeline, [new Float32Array([0])], "UNIFORM")

    const draw = (thickness: number) => {
        writeToBufferF32(device, thicknessBuffer, new Float32Array([thickness / canvas.width]), 0)

        const { pass, executePass } = createPass(device, context, Colors.black)

        pass.setPipeline(pipeline)

        pass.setBindGroup(0, bindGroup)
        pass.draw(4)

        executePass()
    }

    draw(subscribeToInput<number>("line-thickness", draw))
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Creating ray-line intersection")
    const description = createText(`
Ray-line intersection is slightly more difficult to grasp than ray-plane intersection, because lines have more combinations of possible events.
It is quite difficult for two lines to actaully meet in 3D space - they have many oppurtunities not to. A better approach might be to not find the direct point of intersection,
but rather the paramters of the line for which the points on the lines are closest to each other.

The article "Intersection of two lines in three-space" by Ronald Goldman in the collection Graphics Gems (1995) describes the algorithm 
which is the computerized appraoch of solving the lienar set of equations to finding these parameters. 
It is important to remember two things - firstly, that the parameters have to stay between zero and one, that is the "intersection" is within the sections of both lines. 
Secondly, the intersection might not be an intersection at all - but a point on each line for which the distance is minimal. 
It is required to check that the distance between these two points is less than some set threshold for the thickness of the line.
    `)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)

    const interactableSection = createInteractableSection()
    const thicknessSlider = createWithLabel(
        createRange("line-thickness", 4, 2, 32, 0.1),
        "Line thickness"
    )

    interactableSection.append(thicknessSlider)
    canvasSection.append(canvas, interactableSection)
    div.append(title, description, canvasSection)
    executeQueue.push(execute)
}

export default view
