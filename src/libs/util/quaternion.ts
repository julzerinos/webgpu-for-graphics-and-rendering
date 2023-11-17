// quaternion.js (c) 2014 Jeppe Revall Frisvad
/**
 * This is a class for working with quaternions.
 */

import { elementWise, mat4, normalize, scale, vec4 } from "."
import { Matrix4x4, Vector3, Vector4 } from "../../types"

/**
 * Constructor of Quaternion.
 * If opt_src is specified, new quaternion is initialized by opt_src.
 * Otherwise, new quaternion is initialized by identity quaternion.
 * @param opt_src source matrix(option)
 */

export type Quaternion = Vector4

export const unitQuaternion = (): Quaternion => [0, 0, 0, 1]

export const quaternionFromVec4 = ({ [0]: x, [1]: y, [2]: z, [3]: w }: Vector4): Quaternion => [
    x,
    y,
    z,
    w,
]

export const quatApply = (vector: Vector4, quaternion: Quaternion): Vector4 => {
    const invQuat = quatInverse(quaternion)
    const applied = quatMultiply(quaternion, quatMultiply(vector, invQuat))

    return vec4(applied[0], applied[1], applied[2], vector[3])
}

export const quatMultiply = (a: Quaternion, b: Quaternion): Quaternion =>
    quaternionFromVec4([
        a[1] * b[2] - a[2] * b[1] + b[3] * a[0] + a[3] * b[0],
        a[2] * b[0] - a[0] * b[2] + b[3] * a[1] + a[3] * b[1],
        a[0] * b[1] - a[1] * b[0] + b[3] * a[2] + a[3] * b[2],
        a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2],
    ])

export const quatAdd = (a: Quaternion, b: Quaternion) =>
    quaternionFromVec4([a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]])

export const quatScale = (q: Quaternion, s: number): Quaternion => scale(q, s)

export const quatConjugation = (q: Quaternion): Quaternion =>
    quaternionFromVec4([-q[0], -q[1], -q[2], q[3]])

export const quatImaginaryPart = (q: Quaternion): Vector3 => [q[0], q[1], q[2]]

export const quatRealPart = (q: Quaternion): number => q[3]

export const quatSqrNorm = (quaternion: Quaternion): number =>
    quaternion[0] * quaternion[0] +
    quaternion[1] * quaternion[1] +
    quaternion[2] * quaternion[2] +
    quaternion[3] * quaternion[3]

export const quatInverse = (quaternion: Quaternion): Quaternion => {
    const sn = quatSqrNorm(quaternion)
    return quaternionFromVec4([
        -quaternion[0] / sn,
        -quaternion[1] / sn,
        -quaternion[2] / sn,
        quaternion[3] / sn,
    ])
}

export const quatFromAxisAngle = (axis: Vector3, radians: number): Quaternion => {
    const sinHalf = Math.sin(radians * 0.5)
    const normalizedAxis = normalize(axis)

    return [
        normalizedAxis[0] * sinHalf,
        normalizedAxis[1] * sinHalf,
        normalizedAxis[2] * sinHalf,
        Math.cos(radians * 0.5),
    ]
}

export const quatBetweenVectors = (a: Vector3, b: Vector3): Quaternion => {
    const denom = Math.sqrt(2 * (1 + a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))

    return [
        (a[1] * b[2] - a[2] * b[1]) / denom,
        (a[2] * b[0] - a[0] * b[2]) / denom,
        (a[0] * b[1] - a[1] * b[0]) / denom,
        denom / 2,
    ]
}

// export const quatAsRotMat3x3 = (q: Quaternion):Matrix3x3 => {
//     // var s = 2.0 / Math.sqrt(this.sqr_norm())
//     // var e = this.elements
//     // var qv_qv = vec3(e[0] * e[0], e[1] * e[1], e[2] * e[2])
//     // var qv_qw = vec3(e[0] * e[3], e[1] * e[3], e[2] * e[3])
//     // // note that the all q_*q_ are used twice (optimize)
//     // var R = mat3(
//     //     1 - s * (qv_qv[1] + qv_qv[2]),
//     //     s * (e[0] * e[1] - qv_qw[2]),
//     //     s * (e[0] * e[2] + qv_qw[1]),
//     //     s * (e[0] * e[1] + qv_qw[2]),
//     //     1 - s * (qv_qv[0] + qv_qv[2]),
//     //     s * (e[1] * e[2] - qv_qw[0]),
//     //     s * (e[0] * e[2] - qv_qw[1]),
//     //     s * (e[1] * e[2] + qv_qw[0]),
//     //     1 - s * (qv_qv[0] + qv_qv[1])
//     // )
//     // return R
// }

export const quatAsRotMat4x4 = (q: Quaternion): Matrix4x4 => {
    const s = 2.0 / Math.sqrt(quatSqrNorm(q))
    const qv_qv = elementWise(quatImaginaryPart(q), quatImaginaryPart(q))
    const qv_qw = scale(quatImaginaryPart(q), q[3])

    return mat4(
        1 - s * (qv_qv[1] + qv_qv[2]),
        s * (q[0] * q[1] - qv_qw[2]),
        s * (q[0] * q[2] + qv_qw[1]),
        0,
        s * (q[0] * q[1] + qv_qw[2]),
        1 - s * (qv_qv[0] + qv_qv[2]),
        s * (q[1] * q[2] - qv_qw[0]),
        0,
        s * (q[0] * q[2] - qv_qw[1]),
        s * (q[1] * q[2] + qv_qw[0]),
        1 - s * (qv_qv[0] + qv_qv[1]),
        0,
        0,
        0,
        0,
        1
    )
}
