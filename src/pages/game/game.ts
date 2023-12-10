import { createCanvasSection, createCanvas } from "../../libs/web"
import { Executable, ViewGenerator, ExecutableQueue, Vector3 } from "../../types"
import { Tile } from "./logic/tile"
import { initializePlayer, updatePlayerLookDirection, updatePlayerPosition } from "./logic/player"
import {
    createDungeonRender,
    generateDungeonMap,
    generateMeshFromTiles,
    getTileFromMap,
    worldToMap,
} from "./logic/dungeon"
import { shadowMapGenerationAllLights } from "./logic/lights"
import { createPortalRender } from "./logic/portal"
import { setupEngine } from "./engine/engine"
import { GamePlayer, GameState } from "./interfaces"
import { updateGameState } from "./logic/gameState"

const execute: Executable = async () => {
    const gameEngine = await setupEngine()

    const player: GamePlayer = initializePlayer()
    gameEngine.input.onMouseMoveListeners.push((dx, dy) =>
        updatePlayerLookDirection(player, dx, dy)
    )

    const { tileSet, tileMap, center } = generateDungeonMap()
    const dungeon = generateMeshFromTiles(tileSet.allTiles)

    const gameState: GameState = {
        map: tileMap,
        currentTile: getTileFromMap(tileMap, player.position),
        tileChangeListeners: [],
    }

    const shadowMapRenders = shadowMapGenerationAllLights(
        gameEngine.device,
        tileSet.lightTiles,
        dungeon
    )
    player.playerMoveListeners.push(...shadowMapRenders.map(smr => smr.onPlayerMove!))

    const {
        pass: dungeonRenderPass,
        onPlayerView: dungeonOnPlayerView,
        onPlayerMove: dungeonOnPlayerMove,
    } = await createDungeonRender(gameEngine, dungeon, shadowMapRenders)
    player.playerViewListeners.push(dungeonOnPlayerView!)
    player.playerMoveListeners.push(dungeonOnPlayerMove!)

    const { pass: portalRenderPass, onPlayerView: portalOnPlayerView } = await createPortalRender(
        gameEngine
    )
    player.playerViewListeners.push(portalOnPlayerView!)

    const handleKeys = () => {
        updatePlayerPosition(player, gameEngine.input.keyMap)
    }

    const frame = (time: number) => {
        handleKeys()
        updateGameState(gameState, player)

        const encoder = gameEngine.device.createCommandEncoder()

        for (const r of shadowMapRenders) r.pass(encoder, time)

        dungeonRenderPass(encoder, time)
        portalRenderPass(encoder, time)

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
