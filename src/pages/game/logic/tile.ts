import { vec4, flattenVector, boolToNumber } from "../../../libs/util"
import { Vector, Vector2, Vector3 } from "../../../types"

export const TILE_SIZE = 4

export enum TileType {
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

export enum Directions {
    NORTH = 1,
    EAST = 2,
    SOUTH = 4,
    WEST = 8,
}

export const reverseDirection = {
    [Directions.NORTH]: Directions.SOUTH,
    [Directions.EAST]: Directions.WEST,
    [Directions.SOUTH]: Directions.NORTH,
    [Directions.WEST]: Directions.EAST,
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
    Directions.NORTH * boolToNumber(North) +
    Directions.EAST * boolToNumber(East) +
    Directions.SOUTH * boolToNumber(South) +
    Directions.WEST * boolToNumber(West)

export const getRandomCardinality = (legal: number = 15) =>
    (legal & Directions.NORTH) * Math.round(Math.random()) +
    (legal & Directions.EAST) * Math.round(Math.random()) +
    (legal & Directions.SOUTH) * Math.round(Math.random()) +
    (legal & Directions.WEST) * Math.round(Math.random())

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

    if (!(openWallDirections & Directions.NORTH)) cubeTriangles.push(vec4(1, 0, 3), vec4(3, 2, 1))
    if (!(openWallDirections & Directions.EAST)) cubeTriangles.push(vec4(2, 3, 7), vec4(7, 6, 2))
    if (!(openWallDirections & Directions.SOUTH)) cubeTriangles.push(vec4(4, 5, 6), vec4(6, 7, 4))
    if (!(openWallDirections & Directions.WEST)) cubeTriangles.push(vec4(5, 4, 0), vec4(0, 1, 5))

    const vertices = new Float32Array(
        flattenVector(
            cubeTriangles.reduce((vertices, triangle) => {
                for (let i = 0; i < 3; i++) vertices.push(cubeVertices[triangle[i]])
                return vertices
            }, [] as Vector[])
        )
    )

    const normals = new Float32Array(
        flattenVector([
            ...Array(6).fill(vec4(0, 0, -1, 0)),
            ...Array(6).fill(vec4(-1, 0, 0, 0)),
            ...Array(6).fill(vec4(0, 1, 0, 0)),
            ...Array(6).fill(vec4(0, -1, 0, 0)),
            ...Array(6).fill(vec4(0, 0, 1, 0)),
            ...Array(6).fill(vec4(1, 0, 0, 0)),
        ])
    )

    return { vertices, normals }
}
