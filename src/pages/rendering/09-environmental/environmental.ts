import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    createBind,
    generatePingPongTextures,
    writeToBufferU32,
    writeToBufferF32,
} from "../../../libs/webgpu"

import {
    asset,
    createBoolInput,
    createButton,
    createCanvas,
    createCanvasSection,
    createInteractableSection,
    createRelevantFilesLink,
    createSelect,
    createText,
    createTitle,
    createWithLabel,
    subscribeToButton,
    subscribeToInput,
    watchInput,
} from "../../../libs/web"

import {
    Colors,
    build_bsp_tree,
    flattenVector,
    getDrawingInfo,
    interleaveF32s,
    loadTexture,
    parseOBJ,
    shiftIntoU32InPlace,
    vec4,
} from "../../../libs/util"

import shaderCode from "./environmental.wgsl?raw"

const CANVAS_ID = "environmental"
const PROG_ENB = "progressive-enabled-cb-" + CANVAS_ID

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const getProgressiveEnabled = watchInput<boolean>(PROG_ENB, "checked")
    const getTextureType = watchInput<"Low dynamic range" | "High dynamic range">(
        "environmental-texture-type"
    )
    const { texture: environmentTextureLDR, sampler: environmentSamplerLDR } = await loadTexture(
        device,
        asset("textures/luxo_pxr_campus.jpg")
    )
    const { texture: environmentTextureHDR, sampler: environmentSamplerHDR } = await loadTexture(
        device,
        asset("textures/luxo_pxr_campus.hdr.png")
    )

    const modelDrawingInfo = getDrawingInfo(await parseOBJ(asset("models/teapot.obj"), 1))
    const bspTreeResults = build_bsp_tree(modelDrawingInfo)

    const interleavedVerticesNormals = interleaveF32s([
        bspTreeResults.vertices,
        bspTreeResults.normals,
    ])

    const interleavedIndicesMatIndices = new Uint32Array(bspTreeResults.indices)
    shiftIntoU32InPlace(interleavedIndicesMatIndices, modelDrawingInfo.matIndices, 4)

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

    let { renderSrc, renderDst, blitPingPong } = generatePingPongTextures(device, canvas)

    const wgsl = device.createShaderModule({
        code: shaderCode,
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
        [interleavedVerticesNormals, interleavedIndicesMatIndices, materialsArray],
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
        buffers: [
            _,
            sceneDataBuffer,
            shaderTypeBuffer,
            includeSunlightModifierBuffer,
            hdrFlagBuffer,
        ],
    } = createBind(
        device,
        pipeline,
        [
            bspTreeResults.aabb,
            new Uint32Array([0, canvas.width, canvas.height]),
            new Uint32Array([3, 0, 0, 0]),
            new Float32Array([1, 0, 0, 0]),
            new Uint32Array([0, 0, 0, 0]),
        ],
        "UNIFORM",
        2
    )

    const hdrTexturesBind = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(3),
        entries: [
            {
                binding: 0,
                resource: renderDst.createView(),
            },
            {
                binding: 1,
                resource: environmentSamplerHDR,
            },
            {
                binding: 2,
                resource: environmentTextureHDR.createView(),
            },
        ],
    })

    const ldrTexturesBind = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(3),
        entries: [
            {
                binding: 0,
                resource: renderDst.createView(),
            },
            {
                binding: 1,
                resource: environmentSamplerLDR,
            },
            {
                binding: 2,
                resource: environmentTextureLDR.createView(),
            },
        ],
    })

    let framesWhileProgressive = 0
    const progress = () => {
        if (!getProgressiveEnabled()) return

        if (restart === true) {
            restart = false
            framesWhileProgressive = 0
        }

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
        pass.setBindGroup(
            3,
            getTextureType() === "High dynamic range" ? hdrTexturesBind : ldrTexturesBind
        )

        pass.draw(4)
        pass.end()

        blitPingPong(encoder)

        device.queue.submit([encoder.finish()])

        requestAnimationFrame(progress)
    }

    subscribeToInput<boolean>(
        PROG_ENB,
        (enabled: boolean) => {
            if (enabled) requestAnimationFrame(progress)
        },
        "checked"
    )

    const updateShaderType = (type: "Base color" | "Lambertian" | "Mirror") => {
        const typeToCodeMapped = (
            { "Base color": 3, Lambertian: 0, Mirror: 1 } as {
                [key in "Base color" | "Lambertian" | "Mirror"]: number
            }
        )[type]

        writeToBufferU32(device, shaderTypeBuffer, new Uint32Array([typeToCodeMapped]), 0)
    }

    updateShaderType(
        subscribeToInput<"Base color" | "Lambertian" | "Mirror">(
            "model-shader-select-env",
            updateShaderType
        )
    )

    const updateSunlightModifier = (include: boolean) => {
        writeToBufferF32(
            device,
            includeSunlightModifierBuffer,
            new Float32Array([include ? 1 : 0, 0, 0, 0]),
            0
        )
    }

    updateSunlightModifier(
        subscribeToInput<boolean>("include-sunlight", updateSunlightModifier, "checked")
    )

    const updateHdrFlagBuffer = (textureType: "Low dynamic range" | "High dynamic range") => {
        const flag = textureType === "High dynamic range" ? 1 : 0
        writeToBufferU32(device, hdrFlagBuffer, new Uint32Array([flag]), 0)
    }

    updateHdrFlagBuffer(subscribeToInput("environmental-texture-type", updateHdrFlagBuffer))

    let restart = false
    subscribeToButton("restart-progressive-env", () => (restart = true))

    progress()
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const a = createRelevantFilesLink("rendering/09-environmental", [
        "/environmental.ts",
        "/environmental.wgsl",
    ])

    const title = createTitle("Leaking into reality")
    const description = createText(`
A strong suit of rendering is the ability to place artifical objects into real scenes and for them to imitate the scene's lighting and environment. 
Environment maps are used to create a skybox, but in a global illumination configuration they can also be used to query the environment for lighting.

Shadows are more tricky, as they no longer have a shadow catching object. 
The skybox is just fills out the empty void beneath the model as a background color would.
To solve this "hold out" geometry is introduced. These are transparent objects which imitate objects visible in the scene (such as a plane for the ground).
They are transparent as far as they are not shaded, where they otherwise apply a semi-transparent filter over whatever it is they are imitating.
Planes are the most simply to create, but hold out geometry could be used for any shape.

HDR images work well as environmental textures as they carry a lot of information about the scene light sources. 
When using a low dynamic range map, a light source has to be modelled with the traditional setup (directional light).

Note: the environmental HDR image is very large and may take time to load into the browser and device.
`)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactables = createInteractableSection()

    const progressiveEnabled = createWithLabel(
        createBoolInput(PROG_ENB, true),
        "Progressive rendering enabled",
        false
    )

    const modelShaderSelect = createWithLabel(
        createSelect(
            "model-shader-select-env",
            ["Base color", "Lambertian", "Mirror"],
            "Lambertian"
        ),
        "Model shader type",
        false
    )

    const includeSunlight = createWithLabel(
        createBoolInput("include-sunlight", true),
        "Sun light on",
        false
    )
    const environemntalType = createWithLabel(
        createSelect(
            "environmental-texture-type",
            ["Low dynamic range", "High dynamic range"],
            "Low dynamic range"
        ),
        "Environmental texture type",
        false
    )

    const restart = createButton("restart-progressive-env", "Restart progressive")

    interactables.append(
        progressiveEnabled,
        modelShaderSelect,
        includeSunlight,
        environemntalType,
        restart
    )

    canvasSection.append(canvas, interactables)
    div.append(title, a, description, canvasSection)

    executeQueue.push(execute)
}

export default view
