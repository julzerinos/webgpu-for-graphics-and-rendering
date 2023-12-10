import { boolToNumber } from "../../libs/util"
import { createCanvasSection, createCanvas, pointerLockCanvas } from "../../libs/web"
import { initializeWebGPU } from "../../libs/webgpu"
import { Executable, ViewGenerator, ExecutableQueue, Vector3 } from "../../types"
import {
    GameCamera,
    calculatePlayerViewMatrix,
    getCameraProjectionViewMatrix,
    initializeCamera,
} from "./logic/camera"
import { Tile, boundPositionInTile } from "./logic/tile"
import {
    GamePlayer,
    initializePlayer,
    updatePlayerLookDirection,
    calculatePlayerPosition,
} from "./logic/player"

import {
    createDungeonRender,
    generateDungeonMap,
    generateMeshFromTiles,
    worldToMap,
} from "./logic/dungeon"
import { shadowMapGenerationAllLights } from "./logic/lights"

const CANVAS_ID = "game"
const CANVAS_SIZE = 512

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const player: GamePlayer = initializePlayer()
    const camera: GameCamera = initializeCamera(player)

    const { tiles, tileMap, center } = generateDungeonMap()
    const dungeon = generateMeshFromTiles(tiles)

    let currentTile: Tile = tileMap[center[0]][center[1]]!
    let inGame = false

    const onMouseMove = (dx: number, dy: number) => {
        const maxFrameDisplacement = 24
        if (Math.abs(dx) > maxFrameDisplacement || Math.abs(dy) > maxFrameDisplacement) return

        updatePlayerLookDirection(player, -dx / CANVAS_SIZE, dy / CANVAS_SIZE)
    }

    const { keyMap } = pointerLockCanvas(CANVAS_ID, onMouseMove, {
        onStart: () => (inGame = true),
        onEnd: () => (inGame = false),
    })

    const shadowMapRenders = shadowMapGenerationAllLights(device, tiles, dungeon)

    const {
        pass: dungeonRenderPass,
        onPlayerView: dungeonOnPlayerView,
        onPlayerMove: dungeonOnPlayerMove,
    } = await createDungeonRender(dungeon, device, canvas, canvasFormat, context, shadowMapRenders)

    const updateCameraProjectionViewMatrix = () => {
        camera.extrinsics = calculatePlayerViewMatrix(player)
        const cameraMatrix = getCameraProjectionViewMatrix(camera)
        dungeonOnPlayerView?.(cameraMatrix)
    }

    const updateTile = (position: Vector3) => {
        const mapPosition = worldToMap(position)

        const nextTile = tileMap[mapPosition[0]][mapPosition[1]]
        if (nextTile === null) {
            console.error("next does not exist")
            // TODO return player to tile
            return
        }

        currentTile = nextTile
    }

    const updatePosition = (keyMap: { [key: string]: boolean }) => {
        const forward = boolToNumber(keyMap["w"]) - boolToNumber(keyMap["s"])
        const strafe = boolToNumber(keyMap["a"]) - boolToNumber(keyMap["d"])
        const moveSpeedModifier = keyMap["v"]

        if (!forward && !strafe) return

        const newPosition = calculatePlayerPosition(player, forward, strafe, moveSpeedModifier)
        boundPositionInTile(newPosition, currentTile)
        player.position = newPosition
        updateTile(newPosition)

        for (const r of shadowMapRenders) r.onPlayerMove?.(player.position)
        dungeonOnPlayerMove?.(player.position)
    }

    const frame = (time: number) => {
        updatePosition(keyMap)
        updateCameraProjectionViewMatrix()

        const encoder = device.createCommandEncoder()

        for (const r of shadowMapRenders) r.pass(encoder, time)

        dungeonRenderPass(encoder, time)

        device.queue.submit([encoder.finish()])

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
