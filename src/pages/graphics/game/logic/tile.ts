import { vec4, vec2, flattenVector, add, vec3, clamp } from "../../../../libs/util"
import { Vector, Vector3 } from "../../../../types"
import { Tile, Mesh, Direction, Light, TileType } from "../interfaces"
import { mapToWorld } from "./dungeon"
import { dungeonTileLight } from "./torch"

export const TILE_SIZE = 4

export const TileMeshData = (tile: Tile): Mesh => {
    const halfSize = TILE_SIZE / 2
    const worldPosition = mapToWorld(tile.position)

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

    const cubeNormals = [...Array(6).fill(vec4(0, 1, 0, 0)), ...Array(6).fill(vec4(0, -1, 0, 0))]

    const cubeUvs = [
        vec2(1, 0),
        vec2(0.5, 0),
        vec2(0.5, 0.5),
        vec2(0.5, 0.5),
        vec2(1, 0.5),
        vec2(1, 0),

        vec2(0.5, 0.5),
        vec2(0, 0.5),
        vec2(0, 0),
        vec2(0, 0),
        vec2(0.5, 0),
        vec2(0.5, 0.5),
    ]

    const normalWallUvs = [
        vec2(0.5, 1),
        vec2(0.5, 0.5),
        vec2(0, 0.5),
        vec2(0, 0.5),
        vec2(0, 1),
        vec2(0.5, 1),
    ]
    // const lightWallUvs = [
    //     vec2(0.5, 1),
    //     vec2(0.5, 0.5),
    //     vec2(1, 0.5),
    //     vec2(1, 0.5),
    //     vec2(1, 1),
    //     vec2(0.5, 1),
    // ]

    if (!(tile.cardinality & Direction.NORTH)) {
        cubeTriangles.push(vec4(1, 0, 3), vec4(3, 2, 1))
        cubeNormals.push(...Array(6).fill(vec4(0, 0, -1, 0)))
        cubeUvs.push(...normalWallUvs)
    }
    if (!(tile.cardinality & Direction.EAST)) {
        cubeTriangles.push(vec4(2, 3, 7), vec4(7, 6, 2))
        cubeNormals.push(...Array(6).fill(vec4(-1, 0, 0, 0)))
        cubeUvs.push(...normalWallUvs)
    }
    if (!(tile.cardinality & Direction.SOUTH)) {
        cubeTriangles.push(vec4(4, 5, 6), vec4(6, 7, 4))
        cubeNormals.push(...Array(6).fill(vec4(0, 0, 1, 0)))
        cubeUvs.push(...normalWallUvs)
    }
    if (!(tile.cardinality & Direction.WEST)) {
        cubeTriangles.push(vec4(5, 4, 0), vec4(0, 1, 5))
        cubeNormals.push(...Array(6).fill(vec4(1, 0, 0, 0)))
        cubeUvs.push(...normalWallUvs)
    }

    const vertices = new Float32Array(
        flattenVector(
            cubeTriangles.reduce((vertices, triangle) => {
                for (let i = 0; i < 3; i++)
                    vertices.push(add(cubeVertices[triangle[i]], vec4(...worldPosition, 0)))
                return vertices
            }, [] as Vector[])
        )
    )

    const normals = new Float32Array(flattenVector(cubeNormals))
    const uvs = new Float32Array(flattenVector(cubeUvs))

    let lights = [] as Light[]
    if (tile.type === TileType.LIGHT) lights = [dungeonTileLight(tile)]

    return { vertices, normals, uvs, lights }
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
