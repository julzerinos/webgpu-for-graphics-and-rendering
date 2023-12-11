import { createCanvasSection, createCanvas } from "../../libs/web"
import { Executable, ViewGenerator, ExecutableQueue } from "../../types"
import { initializePlayer, updatePlayerLookDirection, updatePlayerPosition } from "./logic/player"
import { createDungeonRender, generateDungeonMap, generateMeshFromTiles } from "./logic/dungeon"
import { createShadowMapPass } from "./logic/lights"
import { createPortalRender, generatePortalMesh } from "./logic/portal"
import { setupEngine } from "./engine/engine"
import { BufferedMesh, GamePlayer, GameState } from "./interfaces"
import { updateGameState } from "./logic/gameState"
import { genreateVertexBuffer } from "../../libs/webgpu"
import { createTorchesRenderPass, generateTorchesInstancedMesh } from "./logic/torch"

const execute: Executable = async () => {
    const gameEngine = await setupEngine()

    const player: GamePlayer = initializePlayer(gameEngine)
    gameEngine.input.mouseMoveListeners.push((dx, dy) =>
        updatePlayerLookDirection(gameEngine, player, dx, dy)
    )

    const { tileSet, tileMap } = generateDungeonMap()
    const dungeon = generateMeshFromTiles(tileSet.allTiles)

    const gameState: GameState = {
        map: tileMap,
        currentTile: null,
        tileChangeListeners: [],
        cheats: {
            noClip: false,
        },
    }

    const { buffer, bufferLayout } = genreateVertexBuffer(
        gameEngine.device,
        dungeon.vertices,
        "float32x4",
        0
    )
    const dungeonBufferedMesh: BufferedMesh = {
        vertexBuffer: buffer,
        vertexBufferLayout: bufferLayout,
        vertexCount: dungeon.vertices.length / 4,
    }

    const portalMesh = generatePortalMesh(tileSet.endTile!)
    const torchBMesh = generateTorchesInstancedMesh(gameEngine, dungeon.lights)

    const { renderable: shadowMapPass, lightData } = createShadowMapPass(
        gameEngine,
        [...dungeon.lights, ...portalMesh.lights],
        [dungeonBufferedMesh, player.shadowBufferedMesh, torchBMesh]
    )
    gameState.tileChangeListeners.push(shadowMapPass.onTileChange!)

    const { pass: dungeonRenderPass } = await createDungeonRender(
        gameEngine,
        dungeon,
        lightData,
        player
    )

    const { pass: portalRenderPass } = await createPortalRender(gameEngine, portalMesh, player)

    const { pass: torchesRenderPass } = createTorchesRenderPass(
        gameEngine,
        torchBMesh,
        player,
        lightData
    )

    const handleKeys = () => {
        updatePlayerPosition(gameEngine, player, gameState, gameEngine.input.keyMap)

        if (gameEngine.input.keyMap["p"]) {
            gameState.cheats.noClip = !gameState.cheats.noClip
            gameEngine.input.keyMap["p"] = false
            console.info("[cheats]: no clip toggled to", gameState.cheats.noClip)
        }
    }

    updatePlayerLookDirection(gameEngine, player, 0, 0)
    const frame = (time: number) => {
        handleKeys()
        updateGameState(gameState, player)

        const encoder = gameEngine.device.createCommandEncoder()

        shadowMapPass.pass(encoder, time)

        dungeonRenderPass(encoder, time)
        portalRenderPass(encoder, time)
        torchesRenderPass(encoder, time)

        gameEngine.device.queue.submit([encoder.finish()])

        requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const canvasSection = createCanvasSection()
    const canvas = createCanvas("game")
    canvasSection.append(canvas)
    div.append(canvasSection)
    executeQueue.push(execute)
}

export default view
