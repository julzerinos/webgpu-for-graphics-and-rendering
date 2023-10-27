import {
    absoluteMaxVectors,
    absoluteMinVectors,
    center,
    isSmaller,
    subtract,
    toVec3,
    vec4,
} from "."
import { Vector, Vector3, Vector4 } from "../../types"

export interface AABB {
    max: Vector4
    min: Vector4
}

// Axis-aligned bounding box (Aabb)

export const createAabb = (vertices: Vector[] = []): AABB => {
    let minVertex: Vector4 = vec4(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE, 1)
    let maxVertex: Vector4 = vec4(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE, 1)

    for (const v of vertices) {
        if (isSmaller(v, minVertex)) minVertex = vec4(...v)
        if (isSmaller(maxVertex, v)) maxVertex = vec4(...v)
    }

    return { max: maxVertex, min: minVertex }
}

export const includeVertexInAabb = (aabb: AABB, v: Vector): void => {
    if (isSmaller(v, aabb.min)) aabb.min = vec4(...v)
    if (isSmaller(aabb.max, v)) aabb.max = vec4(...v)
}

export const aabbUnion = (aabbL: AABB, aabbR: AABB): AABB => ({
    min: absoluteMinVectors(aabbL.min, aabbR.min),
    max: absoluteMaxVectors(aabbL.max, aabbR.max),
})

export const aabbCenter = (aabb: AABB): Vector3 => toVec3(center(aabb.min, aabb.max))

export const aabbExtent = (aabb: AABB): Vector3 => toVec3(subtract(aabb.max, aabb.min))

export const aabbVolume = (aabb: AABB): number => {
    const [x, y, z] = aabbExtent(aabb)
    return x * y * z
}

export const aabbHalfArea = (aabb: AABB): number => {
    const [x, y, z] = aabbExtent(aabb)
    return x * y + y * z + x * z
}

export const aabbArea = (aabb: AABB): number => aabbHalfArea(aabb) * 2

export const aabbLongestAxis = (aabb: AABB): number => {
    const [x, y, z] = aabbExtent(aabb)
    return x > y ? (x > z ? 0 : 2) : y > z ? 1 : 2
}

export const aabbMaxExtent = (aabb: AABB): number => Math.max(...aabbExtent(aabb))

export const doAabbsIntersect = (aabbL: AABB, aabbR: AABB): boolean => {
    for (let i = 0; i < 3; i++)
        if (aabbL.min[i] > aabbR.max[i] || aabbL.max[i] < aabbR.min[i]) return false

    return true
}
