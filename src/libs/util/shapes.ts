import { Vector2, Vector3, Vector4 } from "../../types"
import { IShapeInfo } from "../../types/shapes"
import { add, flattenVector, vec2, vec3, vec4 } from "./vector"

export const Square = (point: Vector2, size: number): Vector2[] => {
    const offset = size / 2
    return [
        vec2(point[0] - offset, point[1] - offset),
        vec2(point[0] + offset, point[1] - offset),
        vec2(point[0] - offset, point[1] + offset),
        vec2(point[0] - offset, point[1] + offset),
        vec2(point[0] + offset, point[1] - offset),
        vec2(point[0] + offset, point[1] + offset),
    ]
}

export const Circle = (center: Vector2, radius: number, granularity: number = 12): Vector2[] => {
    const circle = [] as Vector2[]
    const step = (2 * Math.PI) / granularity

    for (let i = 0; i < granularity; i++)
        circle.push(
            center,
            add(center, vec2(radius * Math.cos(i * step), radius * Math.sin(i * step))),
            add(center, vec2(radius * Math.cos((i + 1) * step), radius * Math.sin((i + 1) * step)))
        )

    return circle
}

export const Cube = (center: Vector3, size: number): IShapeInfo => {
    const halfSize = size / 2

    const vertices = [
        vec4(...add(center, vec3(-halfSize, -halfSize, halfSize)), 1),
        vec4(...add(center, vec3(-halfSize, halfSize, halfSize)), 1),
        vec4(...add(center, vec3(halfSize, halfSize, halfSize)), 1),
        vec4(...add(center, vec3(halfSize, -halfSize, halfSize)), 1),
        vec4(...add(center, vec3(-halfSize, -halfSize, -halfSize)), 1),
        vec4(...add(center, vec3(-halfSize, halfSize, -halfSize)), 1),
        vec4(...add(center, vec3(halfSize, halfSize, -halfSize)), 1),
        vec4(...add(center, vec3(halfSize, -halfSize, -halfSize)), 1),
    ]

    // prettier-ignore
    const lines = new Uint32Array([
        0, 1, 1, 2, 2, 3, 3, 0,  // front
        2, 3, 3, 7, 7, 6, 6, 2,  // right
        0, 3, 3, 7, 7, 4, 4, 0,  // down
        1, 2, 2, 6, 6, 5, 5, 1,  // up
        4, 5, 5, 6, 6, 7, 7, 4,  // back
        0, 1, 1, 5, 5, 4, 4, 0,  // left
    ])
    // prettier-ignore
    const triangles = new Uint32Array([
        1, 0, 3, 3, 2, 1,  // front
        2, 3, 7, 7, 6, 2,  // right
        3, 0, 4, 4, 7, 3,  // down
        6, 5, 1, 1, 2, 6,  // up
        4, 5, 6, 6, 7, 4,  // back
        5, 4, 0, 0, 1, 5,  // left
    ])

    return {
        vertices,
        lineIndices: lines,
        triangleIndices: triangles,
    }
}

export const Triangle = (vertices: [Vector3, Vector3, Vector3]): IShapeInfo => {
    const verticesAs4 = [
        vec4(...vertices[0], 1),
        vec4(...vertices[1], 1),
        vec4(...vertices[2], 1),
    ] as Vector4[]

    const triangleFace = [vec4(0, 1, 2, 0)]
    const lines = [] as number[]

    return {
        vertices: verticesAs4,
        lineIndices: new Uint32Array(lines),
        triangleIndices: new Uint32Array(flattenVector(triangleFace)),
    }
}
