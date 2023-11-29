import {
    Colors,
    createTranslateMatrix,
    flattenMatrix,
    scale,
    sqrMagnitude,
    subtract,
    vec2,
    vec3,
} from "../../libs/util"
import {
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
    genreateVertexBuffer,
    initializeWebGPU,
    setupShaderPipeline,
    writeToBufferF32,
    writeToBufferU32,
} from "../../libs/webgpu"
import { Executable, ViewGenerator, ExecutableQueue } from "../../types"
import {
    GameCamera,
    calculatePlayerViewMatrix,
    getCameraProjectionViewMatrix,
    initializeCamera,
} from "./logic/camera"
import { TILE_SIZE, Tile, TileMeshData } from "./logic/tile"
import {
    GamePlayer,
    handleKeyInput,
    initializePlayer,
    updatePlayerLookDirection,
} from "./logic/player"

import dungeonShader from "./shaders/dungeon.wgsl?raw"
import { generateMap, generateMeshFromTiles } from "./logic/dungeon"

const CANVAS_ID = "game"
const CANVAS_SIZE = 512

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const player: GamePlayer = initializePlayer()
    const camera: GameCamera = initializeCamera(player)

    let tiles = [] as Tile[]
    while (tiles.length < 32) ({ tiles } = generateMap())
    const dungeon = generateMeshFromTiles(tiles)

    let inGame = false

    const onMouseMove = (dx: number, dy: number) => {
        updatePlayerLookDirection(player, -dx / CANVAS_SIZE, dy / CANVAS_SIZE)
    }

    const { keyMap } = pointerLockCanvas(CANVAS_ID, onMouseMove, {
        onStart: () => (inGame = true),
        onEnd: () => (inGame = false),
    })

    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateVertexBuffer(
        device,
        dungeon.vertices,
        "float32x4"
    )
    const { buffer: normalBuffer, bufferLayout: normalBufferLayout } = genreateVertexBuffer(
        device,
        dungeon.normals,
        "float32x4",
        1
    )

    const { multisample, msaaTexture } = generateMultisampleBuffer(device, canvas, canvasFormat, 4)
    const { depthStencil, depthStencilAttachmentFactory } = generateDepthBuffer(device, canvas, 4)

    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout, normalBufferLayout],
        canvasFormat,
        dungeonShader,
        "triangle-list",
        { primitive: { frontFace: "ccw", cullMode: "front" }, depthStencil, multisample },
        {
            blend: {
                color: {
                    operation: "add",
                    srcFactor: "src-alpha",
                    dstFactor: "one-minus-src-alpha",
                },
                alpha: { operation: "add", srcFactor: "one", dstFactor: "zero" },
            },
        }
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

    const models = new Float32Array(tiles.length * 16)
    const cardinalities = new Uint32Array(tiles.length)

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

        const { pass, executePass } = createPass(device, context, Colors.black, {
            depthStencilAttachmentFactory,
            msaaTexture,
        })

        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)
        pass.setVertexBuffer(1, normalBuffer)
        pass.setBindGroup(0, bindGroup)
        pass.draw(dungeon.vertices.length / 4)

        executePass()

        requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    canvasSection.append(canvas)
    div.append(canvasSection)

    executeQueue.push(execute)
}

export default view
