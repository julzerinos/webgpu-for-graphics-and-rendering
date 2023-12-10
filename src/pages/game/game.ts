import { createCanvasSection, createCanvas } from "../../libs/web"
import { Executable, ViewGenerator, ExecutableQueue } from "../../types"
import { initializePlayer, updatePlayerLookDirection, updatePlayerPosition } from "./logic/player"
import {
    createDungeonRender,
    generateDungeonMap,
    generateMeshFromTiles,
    getTileFromMap,
} from "./logic/dungeon"
import { defineLightsFromTiles, createShadowMapPass } from "./logic/lights"
import { createPortalRender } from "./logic/portal"
import { setupEngine } from "./engine/engine"
import { BufferedMesh, GamePlayer, GameState } from "./interfaces"
import { updateGameState } from "./logic/gameState"
import { Cube, vec3, flattenVector, toVec3, nSmallestElementsIndices } from "../../libs/util"
import { genreateVertexBuffer, genreateIndexBuffer } from "../../libs/webgpu"

const execute: Executable = async () => {
    const gameEngine = await setupEngine()

    const player: GamePlayer = initializePlayer()
    gameEngine.input.mouseMoveListeners.push((dx, dy) => updatePlayerLookDirection(player, dx, dy))

    const { tileSet, tileMap } = generateDungeonMap()
    const dungeon = generateMeshFromTiles(tileSet.allTiles)

    const gameState: GameState = {
        map: tileMap,
        currentTile: null, // getTileFromMap(tileMap, player.position),
        tileChangeListeners: [],
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

    const playerPlaceholder = Cube(vec3(0, 0, 0), 1)
    const { buffer: playerVertexBuffer, bufferLayout: playerLayout } = genreateVertexBuffer(
        gameEngine.device,
        new Float32Array(flattenVector(playerPlaceholder.vertices)),
        "float32x4",
        0
    )
    const { buffer: playerIndexBuffer } = genreateIndexBuffer(
        gameEngine.device,
        new Uint32Array(flattenVector(playerPlaceholder.triangleIndices.map(f => toVec3(f))))
    )

    const playerBufferedMesh: BufferedMesh = {
        vertexBuffer: playerVertexBuffer,
        vertexBufferLayout: playerLayout,
        indexBuffer: playerIndexBuffer,
        vertexCount: playerPlaceholder.vertices.length,

        triangleCount: playerPlaceholder.triangleCount,
    }

    const { renderable: shadowMapPass, lightData } = createShadowMapPass(
        gameEngine,
        defineLightsFromTiles(tileSet.lightTiles),
        [dungeonBufferedMesh, playerBufferedMesh]
    )
    gameState.tileChangeListeners.push(shadowMapPass.onTileChange!)

    const {
        pass: dungeonRenderPass,
        onPlayerView: dungeonOnPlayerView,
        onPlayerMove: dungeonOnPlayerMove,
    } = await createDungeonRender(gameEngine, dungeon, lightData)
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

        shadowMapPass.pass(encoder, time)

        dungeonRenderPass(encoder, time)
        // portalRenderPass(encoder, time)

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
