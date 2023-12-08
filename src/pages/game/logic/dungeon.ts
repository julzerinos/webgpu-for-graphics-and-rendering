import { add, vec2, vec3 } from "../../../libs/util"
import { Vector2, Vector3 } from "../../../types"
import {
    Direction,
    TILE_SIZE,
    Tile,
    TileMeshData,
    TileType,
} from "./tile"

const DUNGEON_DIMENSION = 8

const directionToMapOffset = {
    1: vec2(0, 1),
    2: vec2(1, 0),
    4: vec2(0, -1),
    8: vec2(-1, 0),
} as { [key in Direction]: Vector2 }

const setTile = (map: TileType[][], position: Vector2, tile: TileType) => {
    map[position[0]][position[1]] = tile
}
const getTile = (map: TileType[][], position: Vector2): TileType =>
    position[1] >= 0 &&
    position[1] < DUNGEON_DIMENSION &&
    position[0] >= 0 &&
    position[0] < DUNGEON_DIMENSION
        ? map[position[0]][position[1]]
        : TileType.OUT_OF_BOUNDS
const isTileEmpty = (map: TileType[][], position: Vector2): boolean =>
    getTile(map, position) === TileType.EMPTY
const isDirectionEmpty = (map: TileType[][], position: Vector2, direction: Direction): boolean => {
    switch (direction) {
        case Direction.NORTH:
            return (
                isTileEmpty(map, add(position, vec2(-1, 1))) &&
                isTileEmpty(map, add(position, vec2(0, 1))) &&
                isTileEmpty(map, add(position, vec2(1, 1)))
            )

        case Direction.EAST:
            return (
                isTileEmpty(map, add(position, vec2(1, 1))) &&
                isTileEmpty(map, add(position, vec2(1, 0))) &&
                isTileEmpty(map, add(position, vec2(1, -1)))
            )

        case Direction.SOUTH:
            return (
                isTileEmpty(map, add(position, vec2(-1, -1))) &&
                isTileEmpty(map, add(position, vec2(0, -1))) &&
                isTileEmpty(map, add(position, vec2(1, -1)))
            )

        case Direction.WEST:
            return (
                isTileEmpty(map, add(position, vec2(-1, 1))) &&
                isTileEmpty(map, add(position, vec2(-1, 0))) &&
                isTileEmpty(map, add(position, vec2(-1, -1)))
            )
    }

    return false
}

export const generateMap = (): { map: TileType[][]; center: Vector2 } => {
    const map = Array.from(Array(DUNGEON_DIMENSION).fill(null), () =>
        Array(DUNGEON_DIMENSION).fill(TileType.EMPTY)
    ) as TileType[][]
    const center = vec2(DUNGEON_DIMENSION / 2, DUNGEON_DIMENSION / 2)

    const followPath = (position: Vector2) => {
        // TODO randomize tiletype
        const tileType = TileType.NORMAL
        setTile(map, position, tileType)

        for (let i = 0; i < 4; i++) {
            const direction = (1 << i) as Direction
            if (!isDirectionEmpty(map, position, direction)) continue

            // TODO random chance to not go in that direction proportional to distance from center

            const nextTilePosition = add(position, directionToMapOffset[direction])
            followPath(nextTilePosition)
        }
    }

    followPath(center)

    return { map, center }
}

const generateDebugMap = (): { map: TileType[][]; center: Vector2 } => {
    const map = Array.from(Array(DUNGEON_DIMENSION).fill(null), () =>
        Array(DUNGEON_DIMENSION).fill(TileType.EMPTY)
    ) as TileType[][]
    const center = vec2(DUNGEON_DIMENSION / 2, DUNGEON_DIMENSION / 2)

    for (let col = 0; col < map.length; col++)
        for (let row = 0; row < map[col].length; row++) {
            if (col === center[1] || row === center[0]) map[row][col] = TileType.NORMAL
        }

    return { map, center }
}

export const populateTiles = (
    dungeonMap: TileType[][]
): { tiles: Tile[]; tileMap: (Tile | null)[][] } => {
    const tiles = [] as Tile[]
    const tileMap = Array.from(Array(DUNGEON_DIMENSION).fill(null), () =>
        Array(DUNGEON_DIMENSION).fill(null)
    ) as (Tile | null)[][]

    for (let col = 0; col < dungeonMap.length; col++)
        for (let row = 0; row < dungeonMap[col].length; row++) {
            const position = vec2(row, col)
            const tileType = getTile(dungeonMap, position)
            if (tileType !== TileType.NORMAL) continue

            let cardinality = 0
            for (let i = 0; i < 4; i++) {
                const direction = (1 << i) as Direction
                const neighbor = getTile(dungeonMap, add(position, directionToMapOffset[direction]))
                const doesNeighborExist =
                    neighbor !== TileType.OUT_OF_BOUNDS && neighbor !== TileType.EMPTY
                if (doesNeighborExist) cardinality += 1 << i
            }

            const tile: Tile = {
                position,
                cardinality,
                type: tileType,
            }
            tiles.push(tile)
            tileMap[row][col] = tile
        }

    return { tiles, tileMap }
}

export const generateDungeonMap = (): {
    tiles: Tile[]
    tileMap: (Tile | null)[][]
    center: Vector2
} => {
    const { map, center } = generateMap()

    const { tiles, tileMap } = populateTiles(map)

    return { tiles, tileMap, center }
}

export const worldToMap = (world: Vector3): Vector2 =>
    vec2(
        Math.round(world[0] / TILE_SIZE + DUNGEON_DIMENSION / 2),
        Math.round(world[2] / TILE_SIZE + DUNGEON_DIMENSION / 2)
    )

export const mapToWorld = (map: Vector2): Vector3 =>
    vec3(
        TILE_SIZE * (map[0] - DUNGEON_DIMENSION / 2),
        0,
        TILE_SIZE * (map[1] - DUNGEON_DIMENSION / 2)
    )

export const generateMeshFromTiles = (
    tiles: Tile[]
): { vertices: Float32Array; normals: Float32Array; uvs: Float32Array } => {
    let dungeonVertices = new Float32Array()
    let dunegonNormals = new Float32Array()
    let dungeonUvs = new Float32Array()

    for (const t of tiles) {
        const worldPosition = mapToWorld(t.position)
        const mesh = TileMeshData(worldPosition, t.cardinality)
        dungeonVertices = new Float32Array([...dungeonVertices, ...mesh.vertices])
        dunegonNormals = new Float32Array([...dunegonNormals, ...mesh.normals])
        dungeonUvs = new Float32Array([...dungeonUvs, ...mesh.uvs])
    }

    return { vertices: dungeonVertices, normals: dunegonNormals, uvs: dungeonUvs }
}
