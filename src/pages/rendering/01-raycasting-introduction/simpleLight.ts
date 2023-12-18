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
    createBoolInput,
} from "../../../libs/web"

import { Colors } from "../../../libs/util"

import shaderCode from "./simpleLight.wgsl?raw"

const CANVAS_ID = "light"
const ZOOM_RANGE_ID = "zoom"
const LIGHT_RANGE_ID = "light-intensity-slider"
const LIGHT_POSX_ID = "light-position-x-input"
const LIGHT_POSY_ID = "light-position-y-input"
const LIGHT_POSZ_ID = "light-position-z-input"
const SHADE_ALL_ID = "shade-all-visible-objects"
const DIFFUSE_REFLECTANCE_ID = "refractive-index-slider"

const execute: Executable = async () => {
    const { device, context, canvas, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const getZoom = watchInput<number>(ZOOM_RANGE_ID)
    const getLightIntensity = watchInput<number>(LIGHT_RANGE_ID)
    const getdiffuseReflectance = watchInput<number>(DIFFUSE_REFLECTANCE_ID)
    const getLightPosX = watchInput<number>(LIGHT_POSX_ID)
    const getLightPosY = watchInput<number>(LIGHT_POSY_ID)
    const getLightPosZ = watchInput<number>(LIGHT_POSZ_ID)
    const shadeAllObjects = watchInput<boolean>(SHADE_ALL_ID, "checked")

    const aspectRatio = canvas.width / canvas.height

    const pipeline = setupShaderPipeline(device, [], canvasFormat, shaderCode, "triangle-strip")

    const {
        bindGroup: viewboxOptionsBind,
        buffers: [viewboxOptionsBuffer],
    } = createBind(device, pipeline, [new Float32Array([getZoom(), aspectRatio])], "UNIFORM")

    const lightSettings = new Float32Array([
        getLightPosX(),
        getLightPosY(),
        getLightPosZ(),
        getLightIntensity(),
        shadeAllObjects() ? 1.0 : 0.0,
        getdiffuseReflectance(),
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
            viewboxOptionsBuffer,
            new Float32Array([getZoom(), aspectRatio]),
            0
        )
        writeToBufferF32(
            device,
            lightSettingsBuffer,
            new Float32Array([
                getLightPosX(),
                getLightPosY(),
                getLightPosZ(),
                getLightIntensity(),
                shadeAllObjects() ? 1.0 : 0.0,
                getdiffuseReflectance(),
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
    const title = createTitle("Let there be light")
    const description = createText(`
With the ability to query the world with ray casts, the most primitive intersecting shapes can be introduced. These are:

1) The plane - an intersection of a ray (line) and a plane. Nothing too complicated - every line will at some point intersect a given plane, unless they are strictly parallel. The only question is at which distance (ray line parameter) does the intersection occur?

2) The triangle - an extension to the plane intersection with the addition of validating the triangle's Barycentric coordinates remain in the appropriate threshold. 
Mathematically, these coordinates can be larger than one or smaller than 0, but this just means the point is outside of the canonical triangle and somewhere in the triangle's shadow copy on the same plane.

3) The sphere - an interesting case which is more specifically comprised of three cases: no intersection (missing the sphere), one intersection (grazing the sphere's surface) and two intersections (entering and leaving the sphere).
There can also be (as will be vital in constructing refraction events) a ray starting inside the sphere with only one proper intersection in the direction of the ray.
Solving for these intersections is a case of handling quadratic formula roots, in an algorithmically friendly way.

For each point of the intersection with an object's surface, that fragement may be shaded based on the information from the intersection - supplied by the prominent hit info data structure, which is key in passing information from the intersecting phase to the shading phase.
`)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID, { width: 512 + 128, height: 512 - 64 })

    const interactables = createInteractableSection()

    const zoomRange = createWithLabel(
        createRange(ZOOM_RANGE_ID, 1, 0.1, 10, 0.1),
        "Zoom (camera constant)"
    )
    const lightIntensity = createWithLabel(
        createRange(LIGHT_RANGE_ID, 3.14, 0, 10, 0.01),
        "Light intensity"
    )
    const diffuseReflectance = createWithLabel(
        createRange(DIFFUSE_REFLECTANCE_ID, 1, -1, 10, 0.1),
        "Diffuse reflectance"
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
    const shadeAllCheck = createWithLabel(createBoolInput(SHADE_ALL_ID, true), "Shading on", false)

    interactables.append(
        zoomRange,
        lightIntensity,
        diffuseReflectance,
        lightPositionX,
        lightPositionY,
        lightPositionZ,
        shadeAllCheck
    )

    canvasSection.append(canvas, interactables)
    div.append(title, description, canvasSection)
    executeQueue.push(execute)
}

export default view
