import {
    Colors,
    boolToNumber,
    flattenMatrix,
    loadTexture,
    vec3,
    vectorsEqual,
} from "../../libs/util"
import { createCanvasSection, createCanvas, pointerLockCanvas } from "../../libs/web"
import {
    createBind,
    createPass,
    createTextureBind,
    generateDepthBuffer,
    generateMultisampleBuffer,
    genreateVertexBuffer,
    initializeWebGPU,
    setupShaderPipeline,
    writeToBufferF32,
} from "../../libs/webgpu"
import { Executable, ViewGenerator, ExecutableQueue, Vector3 } from "../../types"
import {
    GameCamera,
    calculatePlayerViewMatrix,
    getCameraProjectionViewMatrix,
    initializeCamera,
} from "./logic/camera"
import { Tile, TileType, boundPositionInTile } from "./logic/tile"
import {
    GamePlayer,
    initializePlayer,
    updatePlayerLookDirection,
    calculatePlayerPosition,
} from "./logic/player"

import dungeonShader from "./shaders/dungeon.wgsl?raw"
import { generateDungeonMap, generateMap, generateMeshFromTiles, worldToMap } from "./logic/dungeon"

const CANVAS_ID = "game"
const CANVAS_SIZE = 512

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const { texture, sampler } = await loadTexture(device, "game/dungeon_textures_albedo.png")

    const player: GamePlayer = initializePlayer()
    const camera: GameCamera = initializeCamera(player)

    const { tiles, tileMap, center } = generateDungeonMap()
    const dungeon = generateMeshFromTiles(tiles)

    let currentTile: Tile = tileMap[center[0]][center[1]]!
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
    const { buffer: uvBuffer, bufferLayout: uvBufferLayout } = genreateVertexBuffer(
        device,
        dungeon.uvs,
        "float32x2",
        2
    )

    const { multisample, msaaTexture } = generateMultisampleBuffer(device, canvas, canvasFormat, 4)
    const { depthStencil, depthStencilAttachmentFactory } = generateDepthBuffer(device, canvas, 4)

    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout, normalBufferLayout, uvBufferLayout],
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

    const textureBind = createTextureBind(device, pipeline, texture, sampler, 1)

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

    const updateTile = () => {
        const mapPosition = worldToMap(player.position)

        const nextTile = tileMap[mapPosition[0]][mapPosition[1]]
        if (nextTile === null) {
            console.error("next does not exist")
            // TODO return player to tile
            return
        }

        currentTile = nextTile
    }

    const handleKeyInput = (player: GamePlayer, keyMap: { [key: string]: boolean }) => {
        const forward = boolToNumber(keyMap["w"]) - boolToNumber(keyMap["s"])
        const strafe = boolToNumber(keyMap["a"]) - boolToNumber(keyMap["d"])
        const moveSpeedModifier = keyMap["v"]

        if (!forward && !strafe) return

        const newPosition = calculatePlayerPosition(player, forward, strafe, moveSpeedModifier)
        updateTile()
        boundPositionInTile(newPosition, currentTile)
        player.position = newPosition
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
        pass.setVertexBuffer(2, uvBuffer)
        pass.setBindGroup(0, bindGroup)
        pass.setBindGroup(1, textureBind)
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
