import {
    vec4,
    flattenVector,
    boolToNumber,
    add,
    clamp,
    subtract,
    vec2,
    vec3,
} from "../../../libs/util"
import { Vector, Vector2, Vector3 } from "../../../types"
import { mapToWorld, worldToMap } from "./dungeon"

export const TILE_SIZE = 4

export enum TileType {
    OUT_OF_BOUNDS = -1,
    EMPTY = 0,
    NORMAL = 1,
    PICKUP = 2,
    SPAWN = 4,
    END = 8,
}

export interface Tile {
    position: Vector2
    cardinality: number
    type: TileType
}

export enum Direction {
    NORTH = 1,
    EAST = 2,
    SOUTH = 4,
    WEST = 8,
}

export const reverseDirection = {
    [Direction.NORTH]: Direction.SOUTH,
    [Direction.EAST]: Direction.WEST,
    [Direction.SOUTH]: Direction.NORTH,
    [Direction.WEST]: Direction.EAST,
}

export const generateTileOpenWallsFlags = ({
    North,
    South,
    East,
    West,
}: {
    North?: boolean
    East?: boolean
    South?: boolean
    West?: boolean
}): number =>
    Direction.NORTH * boolToNumber(North) +
    Direction.EAST * boolToNumber(East) +
    Direction.SOUTH * boolToNumber(South) +
    Direction.WEST * boolToNumber(West)

export const getRandomCardinality = (legal: number = 15) =>
    (legal & Direction.NORTH) * Math.round(Math.random()) +
    (legal & Direction.EAST) * Math.round(Math.random()) +
    (legal & Direction.SOUTH) * Math.round(Math.random()) +
    (legal & Direction.WEST) * Math.round(Math.random())

export const TileMeshData = (position: Vector3, openWallDirections: number) => {
    const halfSize = TILE_SIZE / 2

    const cubeVertices = [
        vec4(-halfSize, -halfSize, halfSize, 1),
        vec4(-halfSize, halfSize, halfSize, 1),
        vec4(halfSize, halfSize, halfSize, 1),
        vec4(halfSize, -halfSize, halfSize, 1),
        vec4(-halfSize, -halfSize, -halfSize, 1),
        vec4(-halfSize, halfSize, -halfSize, 1),
        vec4(halfSize, halfSize, -halfSize, 1),
        vec4(halfSize, -halfSize, -halfSize, 1),
    ]

    // prettier-ignore
    const cubeTriangles = [
        vec4(3, 0, 4), vec4(4, 7, 3),  // down
        vec4(6, 5, 1), vec4(1, 2, 6),  // up
    ]

    const cubeNormals = [...Array(6).fill(vec4(0, -1, 0, 0)), ...Array(6).fill(vec4(0, 1, 0, 0))]

    if (!(openWallDirections & Direction.NORTH)) {
        cubeTriangles.push(vec4(1, 0, 3), vec4(3, 2, 1))
        cubeNormals.push(...Array(6).fill(vec4(0, 0, -1, 0)))
    }
    if (!(openWallDirections & Direction.EAST)) {
        cubeTriangles.push(vec4(2, 3, 7), vec4(7, 6, 2))
        cubeNormals.push(...Array(6).fill(vec4(-1, 0, 0, 0)))
    }
    if (!(openWallDirections & Direction.SOUTH)) {
        cubeTriangles.push(vec4(4, 5, 6), vec4(6, 7, 4))
        cubeNormals.push(...Array(6).fill(vec4(0, 0, 1, 0)))
    }
    if (!(openWallDirections & Direction.WEST)) {
        cubeTriangles.push(vec4(5, 4, 0), vec4(0, 1, 5))
        cubeNormals.push(...Array(6).fill(vec4(1, 0, 0, 0)))
    }

    const vertices = new Float32Array(
        flattenVector(
            cubeTriangles.reduce((vertices, triangle) => {
                for (let i = 0; i < 3; i++)
                    vertices.push(add(cubeVertices[triangle[i]], vec4(...position, 0)))
                return vertices
            }, [] as Vector[])
        )
    )

    const normals = new Float32Array(flattenVector(cubeNormals))

    return { vertices, normals }
}

export const boundPositionInTile = (position: Vector3, tile: Tile) => {
    const damp = 0.96

    const tileWorldMin = add(
        mapToWorld(tile.position),
        vec3((-TILE_SIZE / 2) * damp, 0, (-TILE_SIZE / 2) * damp)
    )
    const tileWorldMax = add(
        mapToWorld(tile.position),
        vec3((+TILE_SIZE / 2) * damp, 0, (+TILE_SIZE / 2) * damp)
    )

    if (tile.cardinality & Direction.WEST) tileWorldMin[0] = -Infinity
    if (tile.cardinality & Direction.SOUTH) tileWorldMin[2] = -Infinity
    if (tile.cardinality & Direction.EAST) tileWorldMax[0] = Infinity
    if (tile.cardinality & Direction.NORTH) tileWorldMax[2] = Infinity

    position[0] = clamp(position[0], tileWorldMin[0], tileWorldMax[0])
    position[2] = clamp(position[2], tileWorldMin[2], tileWorldMax[2])
}
