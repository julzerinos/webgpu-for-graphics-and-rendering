import { add, vec2 } from "../../../libs/util"
import { Vector2 } from "../../../types"
import { Directions, Tile, TileType, getRandomCardinality, reverseDirection } from "./tile"

const DUNGEON_DIMENSION = 24

const cardinalityToOffsetMap = {
    [Directions.NORTH]: vec2(0, -1),
    [Directions.EAST]: vec2(1, 0),
    [Directions.SOUTH]: vec2(0, 1),
    [Directions.WEST]: vec2(-1, 0),
} as { [key in Directions]: Vector2 }

export const generateMap = (): { tiles: Tile[] } => {
    const tiles = [] as Tile[]

    const dungeonMap = Array.from(Array(DUNGEON_DIMENSION).fill(null), () =>
        Array(DUNGEON_DIMENSION).fill(TileType.EMPTY)
    ) as TileType[][]

    const setTile = (tile: Tile) => {
        dungeonMap[tile.position[1]][tile.position[0]] = tile.type
        tiles.push(tile)
    }
    const getTile = (position: Vector2): number =>
        position[1] >= 0 &&
        position[1] < DUNGEON_DIMENSION &&
        position[0] >= 0 &&
        position[0] < DUNGEON_DIMENSION
            ? dungeonMap[position[1]][position[0]]
            : -1
    const isTileEmpty = (position: Vector2): boolean => !Boolean(getTile(position))
    const randomizeTileOpenWalls = (position: Vector2) => {
        let legal = 0

        const North =
            isTileEmpty(add(position, vec2(-1, -1))) &&
            isTileEmpty(add(position, vec2(0, -1))) &&
            isTileEmpty(add(position, vec2(1, -1)))
        if (North) legal += Directions.NORTH

        const East =
            isTileEmpty(add(position, vec2(1, 1))) &&
            isTileEmpty(add(position, vec2(1, 0))) &&
            isTileEmpty(add(position, vec2(1, -1)))
        if (East) legal += Directions.EAST

        const South =
            isTileEmpty(add(position, vec2(-1, 1))) &&
            isTileEmpty(add(position, vec2(0, 1))) &&
            isTileEmpty(add(position, vec2(1, 1)))
        if (South) legal += Directions.SOUTH

        const West =
            isTileEmpty(add(position, vec2(-1, 1))) &&
            isTileEmpty(add(position, vec2(-1, 0))) &&
            isTileEmpty(add(position, vec2(-1, -1)))
        if (West) legal += Directions.WEST

        const cardinality = getRandomCardinality(legal)

        return cardinality
    }

    const followPath = (tile: Tile) => {
        const position = tile.position
        const cardinality = randomizeTileOpenWalls(position)
        tile.cardinality = tile.cardinality | cardinality

        const paths = []

        for (let i = 0; i < 4; i++) {
            const direction = (cardinality & (1 << i)) as Directions
            if (!direction) continue

            const offset = cardinalityToOffsetMap[direction]
            const nextTilePosition = add(position, offset)

            const nextTile: Tile = {
                cardinality: reverseDirection[direction],
                position: nextTilePosition,
                type: TileType.NORMAL,
            }

            setTile(nextTile)
            paths.push(nextTile)
        }

        for (const t of paths) followPath(t)
    }

    const centerTile: Tile = {
        cardinality: Directions.NORTH,
        position: vec2(DUNGEON_DIMENSION / 2, DUNGEON_DIMENSION / 2),
        type: TileType.SPAWN,
    }
    setTile(centerTile)
    followPath(centerTile)

    for (const t of tiles)
        t.position = add(
            t.position,
            vec2(-(DUNGEON_DIMENSION) / 2, -(DUNGEON_DIMENSION) / 2)
        )

    return { tiles }
}
