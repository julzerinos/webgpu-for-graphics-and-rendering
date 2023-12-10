import { GamePlayer, GameState } from "../interfaces"
import { getTileFromMap, mapToWorld } from "./dungeon"

export const updateGameState = (gameState: GameState, player: GamePlayer) => {
    const tile = getTileFromMap(gameState.map, player.position)
    if (tile !== gameState.currentTile && tile !== null) {
        gameState.currentTile = tile
        for (const l of gameState.tileChangeListeners) l(mapToWorld(tile.position), tile.position)
    }
}
