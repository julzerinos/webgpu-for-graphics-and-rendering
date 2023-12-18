import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    createBind,
    generatePingPongTextures,
    writeToBufferU32,
} from "../../../libs/webgpu"

import {
    asset,
    createBoolInput,
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createSelect,
    createText,
    createTitle,
    createWithLabel,
    subscribeToInput,
    watchInput,
} from "../../../libs/web"

import {
    Colors,
    build_bsp_tree,
    flattenVector,
    getDrawingInfo,
    interleaveF32s,
    parseOBJ,
    shiftIntoU32InPlace,
    vec4,
} from "../../../libs/util"

import shaderCodeProgressiveSimple from "./progressiveSimple.wgsl?raw"
import shaderCodeProgressiveSoftShadows from "./progressiveSoftShadows.wgsl?raw"
import shaderCodeProgressiveWithIndirect from "./progressiveWithIndirect.wgsl?raw"

const CANVAS_ID = "cornell-progressive"
const PROG_ENB = "progressive-enabled-cb"
const SEL_SHDR = "select-shader-cb-progressive"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const getProgressiveEnabled = watchInput<boolean>(PROG_ENB, "checked")

    const modelDrawingInfo = getDrawingInfo(
        await parseOBJ(asset("models/CornellBoxWithBlocks.obj"))
    )
    const bspTreeResults = build_bsp_tree(modelDrawingInfo)

    const interleavedVerticesNormals = interleaveF32s([
        bspTreeResults.vertices,
        bspTreeResults.normals,
    ])

    const interleavedIndicesMatIndices = new Uint32Array(bspTreeResults.indices)
    shiftIntoU32InPlace(interleavedIndicesMatIndices, modelDrawingInfo.matIndices, 4)
    const lightFaceIndices = new Uint32Array(modelDrawingInfo.lightIndices)

    const materialsArray = new Float32Array(
        modelDrawingInfo.materials.reduce(
            (arr, mat) => [
                ...arr,
                ...flattenVector([
                    mat.color,
                    mat.specular,
                    mat.emission,
                    vec4(mat.illum, mat.shininess, mat.ior),
                ]),
            ],
            [] as number[]
        )
    )

    const shaderMap = {
        "Simple progressive": shaderCodeProgressiveSimple,
        "Simple progressive with soft shadows": shaderCodeProgressiveSoftShadows,
        "Complex progressive": shaderCodeProgressiveWithIndirect,
    } as { [key: string]: string }

    const startProgressive = { f: () => {} }

    const setupPipelineAndScene = (shaderType: string) => {
        const { renderSrc, renderDst, blitPingPong } = generatePingPongTextures(device, canvas)

        const wgsl = device.createShaderModule({
            code: shaderMap[shaderType],
        })
        const pipeline = device.createRenderPipeline({
            layout: "auto",
            vertex: {
                module: wgsl,
                entryPoint: "main_vs",
            },
            fragment: {
                module: wgsl,
                entryPoint: "main_fs",
                targets: [{ format: canvasFormat }, { format: "rgba32float" }],
            },
            primitive: {
                topology: "triangle-strip",
            },
        })

        const { bindGroup: modelStorage } = createBind(
            device,
            pipeline,
            [
                interleavedVerticesNormals,
                interleavedIndicesMatIndices,
                lightFaceIndices,
                materialsArray,
            ],
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
            bindGroup: uniformsBind,
            buffers: [_, __, sceneDataBuffer],
        } = createBind(
            device,
            pipeline,
            [
                bspTreeResults.aabb,
                new Uint32Array([lightFaceIndices.length]),
                new Uint32Array([0, canvas.width, canvas.height]),
            ],
            "UNIFORM",
            2
        )

        const renderTextureBind = device.createBindGroup({
            layout: pipeline.getBindGroupLayout(3),
            entries: [
                {
                    binding: 0,
                    resource: renderDst.createView(),
                },
            ],
        })

        let framesWhileProgressive = 0
        const progress = () => {
            if (!getProgressiveEnabled()) return

            framesWhileProgressive += 1
            writeToBufferU32(device, sceneDataBuffer, new Uint32Array([framesWhileProgressive]), 0)
            const { pass, encoder } = createPass(device, context, Colors.black, {
                otherColorAttachments: [
                    { view: renderSrc.createView(), loadOp: "load", storeOp: "store" },
                ],
            })

            pass.setPipeline(pipeline)
            pass.setBindGroup(0, modelStorage)
            pass.setBindGroup(1, bspTreeStorage)
            pass.setBindGroup(2, uniformsBind)
            pass.setBindGroup(3, renderTextureBind)

            pass.draw(4)
            pass.end()

            blitPingPong(encoder)
            device.queue.submit([encoder.finish()])

            requestAnimationFrame(progress)
        }

        startProgressive.f = () => requestAnimationFrame(progress)
        requestAnimationFrame(progress)
    }

    setupPipelineAndScene(subscribeToInput<string>(SEL_SHDR, setupPipelineAndScene))
    subscribeToInput<boolean>(PROG_ENB, () => startProgressive.f(), "checked")
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Progressive rendering - the rendering ritual")
    const description = createText(`
This section takes a big leap compared to the previous section. 
Whereas the previous sections revolved around displaying the scene and perhaps manipulating it with animation,
progressive rendering is definite step towards realism and time-consuming rendering rituals which require the author to adopt the patience of a monk.

The concept behind progressive rendering is simple - create the next render and use the previous output to average the result. 
What's more important is that this process enables the use of sampling in renders to achieve realism. 
There are three key components to break down when it comes to sampling in progressive rendering, these are:

1) Per frame jittering - instead of using precomputed jitters for each pixel substrata, now a jitter may be generated per frame for each pixel. 
That jittered direction contributes to the end result when progressive rendering commits its value to the built result. 
The effect this has can be seen in the "Simple progressive" mode.

2) Area light sampling - the area light may finally unleash its full potential. 
Instead of treating the area light as a point light, each position on the light surface is a valid source of light. 
Whenever a light has to be queried, it's position is any point on the light surface. 
Of course, the sampling process has to account for the omega set - all the points on the surface - and divide accordingly (principles of probability).
The effect this has can be seen in the "Simple progressive with soft shadows" mode. 
Soft shadows are generated by the points on the shadow edges being either obstructed or not (depending on the light position sampled), whereas inner shadows are stronger as those points are always obstructed.

3) Indirect illumination - the precursor to global illumination. Up to now, all rays hitting a surface with a Lambertian diffuse material were absorbed into the material's surface.
A ray being absorbed results in the color of that material being seen in the camera. With sampling an event can be created to test for the reflection of a ray on the surface of a Lambertian material.
In the real world most light rays will reflect until they run out of energy, thus the introduction of such a phenomenon to the rendering system will create a more realistic imitation of light in the render.
The effect of adding random reflections on lambertian surfaces can be seen in the "Complex progressive" mode.

The key concept behind points (2) and (3) is Monte Carlo integration. 
Physical models (radiometry and photometry) describe light as integrals over areas or solid angles (as flux expands outwards), but integrals are difficult to compute.
In a progressive framework, each next frame is another sample in Monte Carlo integration, each next decision of a jitter direction, a light position choice or ray reflection is a valid sample which converges to a physically realistic output. 

There is a considerable amount of noise in the inital renders. This is the price to progressive rendering, as it takes time for the frame to smoothen and converge.
`)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactables = createInteractableSection()

    const progressiveEnabled = createWithLabel(
        createBoolInput(PROG_ENB, true),
        "Progressive rendering enabled",
        false
    )
    const shaderSelect = createWithLabel(
        createSelect(
            SEL_SHDR,
            ["Simple progressive", "Simple progressive with soft shadows", "Complex progressive"],
            "Complex progressive"
        ),
        "Progressive shader type",
        false
    )
    interactables.append(progressiveEnabled, shaderSelect)

    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
