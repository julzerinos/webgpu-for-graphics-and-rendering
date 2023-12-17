import {
    absoluteMaxVectors,
    absoluteMinVectors,
    center,
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
    let minVertex: Vector4 = vec4(
        Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        1
    )
    let maxVertex: Vector4 = vec4(
        Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        1
    )

    for (const v of vertices) {
        minVertex = absoluteMinVectors(minVertex, v) as Vector4
        maxVertex = absoluteMaxVectors(maxVertex, v) as Vector4
    }

    return { max: maxVertex, min: minVertex }
}

export const includeVertexInAabb = (aabb: AABB, v: Vector): void => {
    aabb.min = absoluteMinVectors(aabb.min, v) as Vector4
    aabb.max = absoluteMaxVectors(aabb.max, v) as Vector4
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
        if (aabbR.min[i] > aabbL.max[i] || aabbR.max[i] < aabbL.min[i]) return false

    return true
}
