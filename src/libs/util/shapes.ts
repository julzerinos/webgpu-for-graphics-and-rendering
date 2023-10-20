import { Vector2, Vector3, Vector4 } from "../../types"
import { IShapeInfo } from "../../types/shapes"
import { add, normalize, vec2, vec3, vec4, center, toVec3 } from "./vector"

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
    const triangles = [
        vec4(1, 0, 3), vec4(3, 2, 1),  // front
        vec4(2, 3, 7), vec4(7, 6, 2),  // right
        vec4(3, 0, 4), vec4(4, 7, 3),  // down
        vec4(6, 5, 1), vec4(1, 2, 6),  // up
        vec4(4, 5, 6), vec4(6, 7, 4),  // back
        vec4(5, 4, 0), vec4(0, 1, 5),  // left
    ]

    return {
        vertices,
        lineIndices: lines,
        triangleIndices: triangles,
        normals: [],
        triangleCount: 12,
    }
}

export const Triangle = (vertices: [Vector3, Vector3, Vector3]): IShapeInfo => {
    const verticesAs4 = [
        vec4(...vertices[0], 1),
        vec4(...vertices[1], 1),
        vec4(...vertices[2], 1),
    ] as Vector4[]

    const triangleFace = [vec4(0, 1, 2, 0)]
    const lines = [0, 1, 1, 2, 2, 0]

    return {
        vertices: verticesAs4,
        lineIndices: new Uint32Array(lines),
        triangleIndices: triangleFace,
        triangleCount: 1,
        normals: [],
    }
}

export const TetrahedronSphere = (subdivisions: number = 0): IShapeInfo => {
    const vertices = [
        vec4(0, 0, 1),
        vec4(0, (2 * Math.sqrt(2)) / 3, -1 / 3),
        vec4(-Math.sqrt(6) / 3, -Math.sqrt(2) / 3, -1 / 3),
        vec4(Math.sqrt(6) / 3, -Math.sqrt(2) / 3, -1 / 3),
    ]
    let triangleIndices = [vec4(0, 1, 3), vec4(0, 3, 2), vec4(1, 2, 3), vec4(1, 0, 2)]

    const subdivide = (depth: number) => {
        if (depth <= 0) return

        const newIndices = []
        const indicesMap = new Map<string, number>()
        for (const f of triangleIndices) {
            const v1 = toVec3(vertices[f[0]]),
                v2 = toVec3(vertices[f[1]]),
                v3 = toVec3(vertices[f[2]])

            const v12 = vec4(...normalize(center(v1, v2)))
            const v23 = vec4(...normalize(center(v2, v3)))
            const v13 = vec4(...normalize(center(v3, v1)))

            const p12 = [f[0], f[1]].sort().toString()
            let i12 = indicesMap.get(p12)
            if (!i12) {
                i12 = vertices.push(v12) - 1
                indicesMap.set(p12, i12)
            }

            const p23 = [f[1], f[2]].sort().toString()
            let i23 = indicesMap.get(p23)
            if (!i23) {
                i23 = vertices.push(v23) - 1
                indicesMap.set(p23, i23)
            }

            const p13 = [f[0], f[2]].sort().toString()
            let i13 = indicesMap.get(p13)
            if (!i13) {
                i13 = vertices.push(v13) - 1
                indicesMap.set(p13, i13)
            }

            newIndices.push(
                vec4(f[0], i12, i13),
                vec4(f[1], i23, i12),
                vec4(f[2], i13, i23),
                vec4(i12, i23, i13)
            )
        }
        
        triangleIndices = newIndices

        subdivide(depth - 1)
    }

    subdivide(subdivisions)

    return {
        vertices,
        triangleIndices,
        triangleCount: triangleIndices.length,
        normals: [],
    }
}
