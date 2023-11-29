import { add, vec2, vec3 } from "../../../libs/util"
import { Vector2, Vector3 } from "../../../types"
import {
    Directions,
    TILE_SIZE,
    Tile,
    TileMeshData,
    TileType,
    getRandomCardinality,
    reverseDirection,
} from "./tile"

const DUNGEON_DIMENSION = 8

const cardinalityToOffsetMap = {
    1: vec2(0, -1),
    2: vec2(1, 0),
    4: vec2(0, 1),
    8: vec2(-1, 0),
} as { [key in Directions]: Vector2 }

export const generateMap = (): { tiles: Tile[]; dungeonMap: (Tile | null)[][] } => {
    const tiles = [] as Tile[]
    const dungeonMap = Array.from(Array(DUNGEON_DIMENSION).fill(null), () =>
        Array(DUNGEON_DIMENSION).fill(null)
    ) as (Tile | null)[][]

    const setTile = (tile: Tile) => {
        dungeonMap[tile.position[1]][tile.position[0]] = tile
        tiles.push(tile)
    }
    const getTile = (position: Vector2): number =>
        position[1] >= 0 &&
        position[1] < DUNGEON_DIMENSION &&
        position[0] >= 0 &&
        position[0] < DUNGEON_DIMENSION
            ? dungeonMap[position[1]][position[0]]
                ? dungeonMap[position[1]][position[0]]!.type
                : 0
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

    return { tiles, dungeonMap }
}

export const worldToMap = (world: Vector3): Vector2 =>
    vec2(
        Math.round(world[0] / TILE_SIZE + DUNGEON_DIMENSION / 2),
        Math.round(-world[2] / TILE_SIZE + DUNGEON_DIMENSION / 2)
    )

export const mapToWorld = (map: Vector2): Vector3 =>
    vec3(
        TILE_SIZE * (map[0] - DUNGEON_DIMENSION / 2),
        0,
        -TILE_SIZE * (map[1] - DUNGEON_DIMENSION / 2)
    )

export const generateMeshFromTiles = (
    tiles: Tile[]
): { vertices: Float32Array; normals: Float32Array } => {
    let dungeonVertices = new Float32Array()
    let dunegonNormals = new Float32Array()

    for (const t of tiles) {
        const mesh = TileMeshData(mapToWorld(t.position), t.cardinality)
        dungeonVertices = new Float32Array([...dungeonVertices, ...mesh.vertices])
        dunegonNormals = new Float32Array([...dunegonNormals, ...mesh.normals])
    }

    return { vertices: dungeonVertices, normals: dunegonNormals }
}
