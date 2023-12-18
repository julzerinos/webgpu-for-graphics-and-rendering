import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    setupShaderPipeline,
    createBind,
    writeToBufferU32,
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
    subscribeToInput,
} from "../../../libs/web"

import { color, flattenVector, objToShape, parseOBJ } from "../../../libs/util"

import shaderCode from "./utahTeapot.wgsl?raw"

const CANVAS_ID = "utah-teapot"
const SHADING_SELECT_TYPES = ["Flat", "Vertex normals"]
const SHADING_SELECT_TYPE_ID = "shading-select-ut"

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)
    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

    const utahTeapotObj = await parseOBJ(asset("models/teapot.obj"))
    const utahTeapotShape = objToShape(utahTeapotObj, {})

    const { bindGroup: utahTrapotStorage } = createBind(
        device,
        pipeline,
        [
            new Float32Array(flattenVector(utahTeapotShape.vertices)),
            new Uint32Array(flattenVector(utahTeapotShape.triangleIndices)),
            new Float32Array(flattenVector(utahTeapotShape.normals)),
        ],
        "STORAGE",
        0
    )
    const {
        bindGroup: utahTeapotTriangleMetaBind,
        buffers: [utahTeapotTriangleMetaBuffer],
    } = createBind(
        device,
        pipeline,
        [new Uint32Array([utahTeapotShape.triangleCount, 0])],
        "UNIFORM",
        1
    )

    const draw = (shadingType: "Flat" | "Vertex normals") => {
        const shadingTypeMap = {
            Flat: 0,
            "Vertex normals": 1,
        }

        writeToBufferU32(
            device,
            utahTeapotTriangleMetaBuffer,
            new Uint32Array([shadingTypeMap[shadingType]]),
            4
        )

        const { pass, executePass } = createPass(device, context, color(0.8, 0.4, 0.4, 1))

        pass.setPipeline(pipeline)
        pass.setBindGroup(0, utahTrapotStorage)
        pass.setBindGroup(1, utahTeapotTriangleMetaBind)

        pass.draw(4)
        executePass()
    }

    const shadingType = subscribeToInput<"Flat" | "Vertex normals">(SHADING_SELECT_TYPE_ID, draw)

    draw(shadingType)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const a = createRelevantFilesLink("rendering/05-meshes", ["/utahTeapot.ts", "/utahTeapot.wgsl"])

    const title = createTitle("Introducing the Utah Teapot")
    const description = createText(`
As the first rendered mesh we shall have no other than the computer graphics mascot itself - the Utah Teapot. Despite not even being a large mesh (by today's standards), the teapot already takes a moment to load into the GPU and for all the triangles to be tested for in the intersection phase of the rendering pipeline.

The teapot can be rendered in flat shading or vertex shading mode. A differentiation should be made at this point, as there are actually two types of surface normals to pick form. These are

1) Render triangle normals - the triangle face normal as calculated during ray-triangle intersection. Thes could be seen as the "mathematically true" normals of the shape.

2) Vertex normals - the normals as vertex attributes, provided together with the vertex buffer. These are the "artistically true" normals of the shape, as decided by the author of the shape.
Usually these smoothed normals are algorithmically adjusted in 3D modelling software to avoid sharp edges. 
To maintain the smooth surface when rendering the shape, the vertex normals are interpolated using the Barycentric coordainates of the points as interpolation factors.
`)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID, { width: 840, height: 450 })
    const interactables = createInteractableSection()

    const shadingSelect = createWithLabel(
        createSelect(SHADING_SELECT_TYPE_ID, SHADING_SELECT_TYPES, "Flat"),
        "Shading type",
        false
    )

    interactables.append(shadingSelect)
    canvasSection.append(canvas, interactables)
    div.append(title, a, description, canvasSection)

    executeQueue.push(execute)
}

export default view
