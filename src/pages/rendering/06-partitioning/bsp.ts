import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    createBind,
} from "../../../libs/webgpu"

import {
    asset,
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createText,
    createTitle,
} from "../../../libs/web"

import { Colors, build_bsp_tree, getDrawingInfo, parseOBJ } from "../../../libs/util"

import shaderCode from "./partitioning.wgsl?raw"

const CANVAS_ID = "bsp"
// const ANIM_SPEED = "animation-speed-bsp"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    // const getSpeed = watchInput<number>(ANIM_SPEED)

    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

    const modelDrawingInfo = getDrawingInfo(await parseOBJ(asset("models/bunny.obj"), 1))
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
        buffers: [_],
    } = createBind(device, pipeline, [bspTreeResults.aabb, new Float32Array([950.5])], "UNIFORM", 2)

    // let totalTime = 0
    const draw = () => {
        // totalTime += 0.025 * getSpeed()
        // writeToBufferF32(device, timeBuffer, new Float32Array([totalTime]), 0)

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
    const title = createTitle("Barking up the correct tree")
    const description = createText(`
One of the standard spatial data structures which can be used to optimize ray intersections is the binary space partitioning tree (BSP).
Instead of looping over all of the possible triangles (which in the case of the bunny model used below is already quite high),
a ray can traverse through the tree to find its intersection point more quickly.

Before going into the details of the tree it is important to understand the concept of a bounding box. 
The bounding box (otherwise referred to as AABB) is a three dimensional rectangular prism. 
It defines a bounding box for a given context and is generated by a minimum-component point and a maximum-component point.

When applied to rendering, rays can be instructed to only be interested in intersections inside the bounding box to constrain the limits of searching.
The first quick fix is to create a bounding box for the entire scene - the bunny. Anything outside of the bounding box should be discarded (treated as background).

How about taking the bounding box a step further? It is possible to define a more granular bounding shape by stacking multiple bounding boxes together.
The binary space partitioning tree does this by subdividing a model's initial bounding box into clusters of smaller and smaller (until a predefined threshold) boxes.
The binary tree is referred to as "axis-aligned", as each bounding box remains aligned to the canonical axes of the reference system.

Once this collection of small AABBs is prepared (by the CPU), the tree can be transferred to the GPU for use in intersections. 
In the intersection phase, if a ray intersects a model's initial bounding box, the ray will continiue to "fold into" the model's smaller bounding boxes by traversing the tree.
Once a leaf node has been reached - that is a bounding box of the smallest size - the ray may intersect with all of the triangles contained inside that box.
`)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactables = createInteractableSection()

    // const animationModifier = createWithLabel(
    //     createRange(ANIM_SPEED, 0, 0, 1, 0.01),
    //     "Speed of the animation"
    // )

    // interactables.append(animationModifier)
    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
