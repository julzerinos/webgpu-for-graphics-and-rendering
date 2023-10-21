import { Executable, ExecutableQueue, ViewGenerator } from "../../../types"

import {
    initializeWebGPU,
    createPass,
    genreateVertexBuffer,
    setupShaderPipeline,
    genreateIndexBuffer,
    createUniformBind,
    toNDC,
    generateDepthBuffer,
    generateMultisampleBuffer,
    writeToBufferF32,
    writeToBufferU32,
} from "../../../libs/webgpu"

import {
    createBoolInput,
    createCanvas,
    createCanvasSection,
    createColorPicker,
    createInteractableSection,
    createRange,
    createSelect,
    createText,
    createTitle,
    createWithLabel,
    subscribeMultiple,
    subscribeToInput,
    watchInput,
} from "../../../libs/web"

import {
    flattenVector,
    lookAtMatrix,
    multMatrices,
    vec3,
    perspectiveProjection,
    TetrahedronSphere,
    toVec3,
    flattenMatrix,
    vec4,
    toRadians,
    hexToColor,
    colorToVec4,
} from "../../../libs/util"

import shaderCode from "./shading.wgsl?raw"

const CANVAS_ID = "graphics-lighting"
const ROTATION_AROUND = "rotation-around-tetrahedron"
const SUBDIVISION = "subdivision-tetrahedron"
const ROT_ANIM_ENABLED = "tetrahedron-rotation-animation-enabled"
const DIFFUSE = "diffuse-reflectance-tetrahedron"
const SPECULAR = "specular-reflectance-tetrahedron"
const AMBIENT = "ambient-reflectance-tetrahedron"
const SHADING_TYPE = "shading-type-tetrahedron"
const SHININESS = "shininess-tetrahedron"
const LIGHT = "tetrahedron-light-emission"

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const getRotation = watchInput<number>(ROTATION_AROUND)
    const getSubdivision = watchInput<number>(SUBDIVISION)
    const getShadingType = watchInput<string>(SHADING_TYPE)
    const getAmbient = watchInput<number>(AMBIENT)
    const getDiffuse = watchInput<number>(DIFFUSE)
    const getSpecular = watchInput<number>(SPECULAR)
    const getShininess = watchInput<number>(SHININESS)
    const getLight = watchInput<string>(LIGHT)

    const spheres = new Array(8).fill(0).map((_, i) => TetrahedronSphere(i))
    const { buffer: indexBuffer } = genreateIndexBuffer(
        device,
        new Uint32Array(flattenVector(spheres[7].triangleIndices.map(v => toVec3(v))))
    )
    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateVertexBuffer(
        device,
        new Float32Array(flattenVector(spheres[7].vertices)),
        "float32x4"
    )
    const { buffer: colorBuffer, bufferLayout: colorBufferLayout } = genreateVertexBuffer(
        device,
        new Float32Array(
            flattenVector([
                vec4(1, 0, 0),
                vec4(0, 1, 0),
                vec4(0, 0, 1),
                vec4(1, 1, 1),
                ...new Array(spheres[7].vertices.length - 4).fill(vec4(0.4, 0.4, 0.4)),
            ])
        ),
        "float32x4",
        1
    )

    writeToBufferU32(
        device,
        indexBuffer,
        new Uint32Array(
            flattenVector(spheres[getSubdivision()].triangleIndices.map(v => toVec3(v)))
        ),
        0,
        true
    )

    const msaaCount = 4
    const { multisample, msaaTexture } = generateMultisampleBuffer(
        device,
        canvas,
        canvasFormat,
        msaaCount
    )
    const { depthStencil, depthStencilAttachment } = generateDepthBuffer(device, canvas, msaaCount)

    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout, colorBufferLayout],
        canvasFormat,
        shaderCode,
        "triangle-list",
        { multisample, depthStencil }
    )

    const angle = toRadians(getRotation())
    const eye = vec3(3 * Math.sin(angle), 0, 3 * Math.cos(angle))
    const at = vec3(0)
    const up = vec3(0, 1, 0)
    const view = lookAtMatrix(eye, at, up)

    const perspective = perspectiveProjection(45, canvas.width / canvas.height, 0.1, 100)
    const projection = multMatrices(toNDC, perspective)
    const projectionView = multMatrices(projection, view)
    const pvm = projectionView

    const shadingTypeMap = { "Gouraud shading (vertex)": 0, "Phong shading (fragment)": 1 } as {
        [key: string]: number
    }

    const { bindGroup: sceneDataBind, uniformBuffer: sceneDataBuffer } = createUniformBind(
        device,
        pipeline,
        new Float32Array([
            ...flattenMatrix(pvm),
            ...vec4(...eye),
            ...colorToVec4(hexToColor(getLight())),
            ...vec4(getAmbient(), getDiffuse(), getSpecular(), getShininess()),
            ...vec4(shadingTypeMap[getShadingType()]),
        ]),
        0
    )

    const updateRotation = (rotation: number) => {
        const angle = toRadians(rotation)
        const eye = vec3(3 * Math.sin(angle), 0, 3 * Math.cos(angle))
        const view = lookAtMatrix(eye, at, up)
        const projectionView = multMatrices(projection, view)
        const pvm = projectionView

        writeToBufferF32(
            device,
            sceneDataBuffer,
            new Float32Array([...flattenMatrix(pvm), ...vec4(...eye)]),
            0
        )
    }

    const updateSubdivision = (subdivision: number) => {
        console.log(spheres[subdivision])

        writeToBufferU32(
            device,
            indexBuffer,
            new Uint32Array(
                flattenVector(spheres[subdivision].triangleIndices.map(v => toVec3(v)))
            ),
            0,
            true
        )
    }

    subscribeToInput<number>(SUBDIVISION, updateSubdivision)
    subscribeToInput<number>(ROTATION_AROUND, updateRotation)

    let animatedRotation = true
    subscribeToInput<boolean>(
        ROT_ANIM_ENABLED,
        () =>
            (animatedRotation = (
                document.getElementById(ROTATION_AROUND) as HTMLInputElement
            ).disabled =
                !animatedRotation)
    )

    const updateSceneData = () => {
        writeToBufferF32(
            device,
            sceneDataBuffer,
            new Float32Array([
                ...colorToVec4(hexToColor(getLight())),
                ...vec4(getAmbient(), getDiffuse(), getSpecular(), getShininess()),
                ...vec4(shadingTypeMap[getShadingType()]),
            ]),
            80
        )
    }

    subscribeMultiple([SHADING_TYPE, SHININESS, SPECULAR, DIFFUSE, AMBIENT, LIGHT], updateSceneData)

    const draw = (time: number) => {
        if (animatedRotation) updateRotation(time / 5e1)

        const { pass, executePass } = createPass(device, context, vec4(0.2, 0.2, 0.2), {
            depthStencilAttachment,
            msaaTexture,
        })

        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)
        pass.setVertexBuffer(1, colorBuffer)
        pass.setIndexBuffer(indexBuffer, "uint32")
        pass.setBindGroup(0, sceneDataBind)

        pass.drawIndexed(spheres[getSubdivision()].triangleCount * 3)

        executePass()
        requestAnimationFrame(draw)
    }

    requestAnimationFrame(draw)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("A sphere")
    const description = createText("More than 7 sub crashes")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactableSection = createInteractableSection()

    const rotationAnimator = createWithLabel(
        createBoolInput(ROT_ANIM_ENABLED, true),
        "Animated rotation",
        false
    )

    const range = createRange(ROTATION_AROUND, 0, -180, 180, 1, true)
    const rotationAngleSlider = createWithLabel(range, "Rotation around the tetrahedron")

    const subdivisionInput = createWithLabel(
        createRange(SUBDIVISION, 4, 0, 7, 1),
        "Number of tetrahedron subdivisions"
    )

    const shadingType = createWithLabel(
        createSelect(
            SHADING_TYPE,
            ["Gouraud shading (vertex)", "Phong shading (fragment)"],
            "Gouraud shading"
        ),
        "Shading type",
        false
    )

    const diffuseReflectance = createWithLabel(
        createRange(DIFFUSE, 1, 0, 2, 0.1),
        "Diffuse reflectance"
    )
    const specularReflectance = createWithLabel(
        createRange(SPECULAR, 1, 0, 2, 0.1),
        "Specular reflectance"
    )
    const shininess = createWithLabel(createRange(SHININESS, 15, 0, 50, 1), "Shininess")
    const ambientReflectance = createWithLabel(
        createRange(AMBIENT, 0.1, 0, 2, 0.1),
        "Ambient reflectance"
    )

    const lightEmission = createWithLabel(
        createColorPicker(LIGHT, "#ffffff"),
        "Light emission",
        false
    )

    interactableSection.append(
        rotationAnimator,
        rotationAngleSlider,
        subdivisionInput,
        shadingType,
        diffuseReflectance,
        specularReflectance,
        ambientReflectance,
        shininess,
        lightEmission
    )
    canvasSection.append(canvas, interactableSection)
    div.append(title, description, canvasSection)

    executeQueue.push(execute)
}

export default view
