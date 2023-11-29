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
import { mapToWorld } from "./dungeon"

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

    const cubeNormals = [...Array(6).fill(vec4(0, -1, 0, 0)), ...Array(6).fill(vec4(0, 1, 0, 0))]

    if (!(openWallDirections & Directions.NORTH)) {
        cubeTriangles.push(vec4(1, 0, 3), vec4(3, 2, 1))
        cubeNormals.push(...Array(6).fill(vec4(0, 0, -1, 0)))
    }
    if (!(openWallDirections & Directions.EAST)) {
        cubeTriangles.push(vec4(2, 3, 7), vec4(7, 6, 2))
        cubeNormals.push(...Array(6).fill(vec4(-1, 0, 0, 0)))
    }
    if (!(openWallDirections & Directions.SOUTH)) {
        cubeTriangles.push(vec4(4, 5, 6), vec4(6, 7, 4))
        cubeNormals.push(...Array(6).fill(vec4(0, 0, 1, 0)))
    }
    if (!(openWallDirections & Directions.WEST)) {
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
    const damp = 0.99
    const pseudoInf = 10e10

    console.log(
        "mapToWorld",
        add(tile.position, vec2(-0.5 * damp, -0.5 * damp)),
        add(tile.position, vec2(0.5 * damp, 0.5 * damp))
    )

    const tileWorldMin = add(
        mapToWorld(add(tile.position, vec2(-0.5 * damp, -0.5 * damp))),
        vec3(
            -(tile.cardinality & Directions.EAST) * pseudoInf,
            0,
            -(tile.cardinality & Directions.SOUTH) * pseudoInf
        )
    )
    const tileWorldMax = add(
        mapToWorld(add(tile.position, vec2(0.5 * damp, 0.5 * damp))),
        vec3(
            (tile.cardinality & Directions.WEST) * pseudoInf,
            0,
            (tile.cardinality & Directions.NORTH) * pseudoInf
        )
    )

    console.log([...tile.position])
    console.log([...position])

    console.log("min, max", tileWorldMin, tileWorldMax)

    position[0] = clamp(position[0], tileWorldMin[0], tileWorldMax[0])
    position[2] = clamp(position[2], tileWorldMin[2], tileWorldMax[2])

    console.log("pos", [...position])
}
