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
    const {
        bindGroup: viewboxOptionsBind,
        buffers: [viewboxOptionsBuffer],
    } = createBind(device, pipeline, [viewboxOptions], "UNIFORM")

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
    const {
        bindGroup: lightSettingsBind,
        buffers: [lightSettingsBuffer],
    } = createBind(device, pipeline, [lightSettings], "UNIFORM", 1)

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
    const title = createTitle('Putting physics in "physically-based rendering"')
    const description = createText(`
A completely black sphere consuming all light that is unfortunate enough to fall into its grasp is no fun. Let's change it to something more interesting, something physically-based rendering excels at - reflection and refraction.

Reflection, the easier to conceptually grasp of the two, is the mirroring of an incident ray about the surface normal on a surface which perfectly reflects all light (does not absorb).

Refraction, following Snell's laws, occurs when a ray reaches a medium with a different refractive index. The simulation below represents a glass sphere,
therefore the transition happens between the medium of air (refractive index equal to 1.0) and the medium of glass (refractive index equal to 1.5). 
The index is a ratio of the speed of light, so within a medium with a higher refractive index light travels slower. 
When a ray reaches the intersection at a surface it will refract into the new medium, with the new angle dependent on the ratio of the two mediums' refractive indices. 
The higher the new medium's index is - the sharper the refraction angle becomes.
Note that the same case, but in reverse, occurs when the ray leaves the refraction medium. 

For such cases it is important to consider the multiple possible intersection points a line may have with an object, such as with a sphere. 
If a ray is cast from the sphere's surface inward, the closer intersection point is the ray's origin point. 
These cases can be handled by carefully managing the minimum and maximum values the ray parameter may assume.

At the intersection with one of these two types of materials, the is not absorbed and no light is returned. 
Instead the ray is continued (either recursively or - in the case of WebGPU's non-state-machine-like structure - looped until a max depth) from that position in the direction generated by the physical event.

A new lighting model is introduced to the below - the Phong lighting model which addresses the specular reflectance of objects. 
It can be matched with the refractive model (as additive light) to create a glossy material for the sphere surface, which imitates the reflection of some of the light source rays.

While these simulations are still primitive and computationally simple, they may still be animated (such as the sphere's orbit).
`)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID, { width: 512 + 128, height: 512 - 64 })

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
