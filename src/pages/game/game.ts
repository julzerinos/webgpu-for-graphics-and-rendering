import {
    Cube,
    add,
    flattenMatrix,
    lookAtMatrix,
    normalize,
    perspectiveProjection,
    quatApply,
    quatFromAxisAngle,
    quatMultiply,
    toVec3,
    vec3,
    vec4,
} from "../../libs/util"
import {
    createTitle,
    createText,
    createCanvasSection,
    createCanvas,
    createInteractableSection,
    pointerLockCanvas,
} from "../../libs/web"
import {
    createBind,
    createPass,
    generateDepthBuffer,
    generateMultisampleBuffer,
    genreateIndexBuffer,
    genreateVertexBuffer,
    initializeWebGPU,
    setupShaderPipeline,
    writeToBufferF32,
} from "../../libs/webgpu"
import { Executable, ViewGenerator, ExecutableQueue } from "../../types"
import {
    GameCamera,
    calculatePlayerViewMatrix,
    getCameraProjectionViewMatrix,
    initializeCamera,
} from "./logic/camera"
import { TileMeshData } from "./logic/dungeon"
import {
    GamePlayer,
    handleKeyInput,
    initializePlayer,
    updatePlayerLookDirection,
} from "./logic/player"

import tileShader from "./shaders/tile.wgsl?raw"

const CANVAS_ID = "game"
const CANVAS_SIZE = 512

const execute: Executable = async () => {
    const { device, context, canvasFormat } = await initializeWebGPU(CANVAS_ID)

    const player: GamePlayer = initializePlayer()
    const camera: GameCamera = initializeCamera(player)

    let inGame = false

    const onMouseMove = (dx: number, dy: number) => {
        updatePlayerLookDirection(player, -dx / CANVAS_SIZE, dy / CANVAS_SIZE)
    }

    const { keyMap } = pointerLockCanvas(CANVAS_ID, onMouseMove, {
        onStart: () => (inGame = true),
        onEnd: () => (inGame = false),
    })

    const tile = TileMeshData

    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateVertexBuffer(
        device,
        tile.vertices,
        "float32x4"
    )
    const { buffer: normalBuffer, bufferLayout: normalBufferLayout } = genreateVertexBuffer(
        device,
        tile.normals,
        "float32x4",
        1
    )

    // const { msaaTexture, multisample } = generateMultisampleBuffer(device, canvas, canvasFormat, 4)
    // const { createDepthTexture, depthStencil, depthStencilAttachmentFactory } = generateDepthBuffer(
    //     device,
    //     canvas,
    //     4
    // )

    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout, normalBufferLayout],
        canvasFormat,
        tileShader,
        "triangle-list",
        { primitive: { frontFace: "ccw", cullMode: "front" } }
    )

    const {
        bindGroup,
        buffers: [proj],
    } = createBind(
        device,
        pipeline,
        [new Float32Array(flattenMatrix(getCameraProjectionViewMatrix(camera)))],
        "UNIFORM"
    )

    const updateCameraProjectionViewMatrix = () => {
        camera.extrinsics = calculatePlayerViewMatrix(player)

        writeToBufferF32(
            device,
            proj,
            new Float32Array(flattenMatrix(getCameraProjectionViewMatrix(camera))),
            0
        )
    }

    const frame = (time: number) => {
        updateCameraProjectionViewMatrix()
        handleKeyInput(player, keyMap)

        const { pass, executePass } = createPass(device, context)

        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)
        pass.setVertexBuffer(1, normalBuffer)
        pass.setBindGroup(0, bindGroup)
        pass.draw(tile.vertices.length / 4)

        executePass()

        requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    // const title = createTitle("Camera movement")
    // const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactableSection = createInteractableSection()

    interactableSection.append()
    canvasSection.append(canvas, interactableSection)
    div.append(canvasSection)

    executeQueue.push(execute)
}

export default view
