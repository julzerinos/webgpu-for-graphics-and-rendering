import { cross, dot, normalize, scale, subtract, toRadians, vec4, vectorsEqual } from "."
import { Matrix, Matrix2x2, Matrix3x3, Matrix4x4, MatrixNxM, Vector3 } from "../../types"

export const mat4 = (
    a1: number = 0,
    a2: number = 0,
    a3: number = 0,
    a4: number = 0,
    b1: number = 0,
    b2: number = 0,
    b3: number = 0,
    b4: number = 0,
    c1: number = 0,
    c2: number = 0,
    c3: number = 0,
    c4: number = 0,
    d1: number = 0,
    d2: number = 0,
    d3: number = 0,
    d4: number = 0
): Matrix4x4 => [
    [a1, a2, a3, a4],
    [b1, b2, b3, b4],
    [c1, c2, c3, c4],
    [d1, d2, d3, d4],
]

export const mat3 = (
    a1: number = 0,
    a2: number = 0,
    a3: number = 0,
    b1: number = 0,
    b2: number = 0,
    b3: number = 0,
    c1: number = 0,
    c2: number = 0,
    c3: number = 0
): Matrix3x3 => [
    [a1, a2, a3],
    [b1, b2, b3],
    [c1, c2, c3],
]

export const mat2 = (a1: number = 0, a2: number = 0, b1: number = 0, b2: number = 0): Matrix2x2 => [
    [a1, a2],
    [b1, b2],
]

export const identity4x4 = () => mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)

export const flattenMatrix = (matrix: Matrix): number[] =>
    ([] as Array<number>).concat(...transpose(matrix))
export const flattenMatrices = (matrices: Matrix[]): number[] =>
    ([] as Array<number>).concat(...matrices.map(m => flattenMatrix(m)))

export const lookAtMatrix = (eye: Vector3, at: Vector3, up: Vector3): Matrix4x4 => {
    if (vectorsEqual(eye, at)) return identity4x4()

    let v = normalize(subtract(at, eye))
    const n = normalize(cross(v, up))
    const u = normalize(cross(n, v))

    v = scale(v, -1)

    return mat4(
        ...vec4(...n, -dot(n, eye)),
        ...vec4(...u, -dot(u, eye)),
        ...vec4(...v, -dot(v, eye)),
        ...vec4()
    )
}

export const orthographicProjection = (
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number
): Matrix4x4 => {
    if (left === right) {
        throw "ortho(): left and right are equal"
    }
    if (bottom === top) {
        throw "ortho(): bottom and top are equal"
    }
    if (near === far) {
        throw "ortho(): near and far are equal"
    }

    const w = right - left
    const h = top - bottom
    const d = far - near

    const result = identity4x4()
    result[0][0] = 2.0 / w
    result[1][1] = 2.0 / h
    result[2][2] = -2.0 / d
    result[0][3] = -(left + right) / w
    result[1][3] = -(top + bottom) / h
    result[2][3] = -(near + far) / d

    return result
}

export const perspectiveProjection = (fovy: number, aspect: number, near: number, far: number) => {
    const f = 1.0 / Math.tan(toRadians(fovy) / 2)
    const d = far - near

    const result = identity4x4()
    result[0][0] = f / aspect
    result[1][1] = f
    result[2][2] = -(near + far) / d
    result[2][3] = (-2 * near * far) / d
    result[3][2] = -1
    result[3][3] = 0.0

    return result
}

export const createRotationMatrix = (angle: number, axis: Vector3): Matrix4x4 => {
    const v = normalize(axis)

    const x = v[0]
    const y = v[1]
    const z = v[2]
    const c = Math.cos(toRadians(angle))
    const s = Math.sin(toRadians(angle))
    const omc = 1.0 - c

    return mat4(
        ...vec4(x * x * omc + c, x * y * omc - z * s, x * z * omc + y * s, 0.0),
        ...vec4(x * y * omc + z * s, y * y * omc + c, y * z * omc - x * s, 0.0),
        ...vec4(x * z * omc - y * s, y * z * omc + x * s, z * z * omc + c, 0.0),
        ...vec4()
    )
}

export const createRotationXMatrix = (theta: number): Matrix4x4 => {
    var c = Math.cos(toRadians(theta))
    var s = Math.sin(toRadians(theta))
    var rx = mat4(1.0, 0.0, 0.0, 0.0, 0.0, c, -s, 0.0, 0.0, s, c, 0.0, 0.0, 0.0, 0.0, 1.0)
    return rx
}

export const createRotationYMatrix = (theta: number): Matrix4x4 => {
    var c = Math.cos(toRadians(theta))
    var s = Math.sin(toRadians(theta))
    var ry = mat4(c, 0.0, s, 0.0, 0.0, 1.0, 0.0, 0.0, -s, 0.0, c, 0.0, 0.0, 0.0, 0.0, 1.0)
    return ry
}

export const createRotationZMatrix = (theta: number): Matrix4x4 => {
    var c = Math.cos(toRadians(theta))
    var s = Math.sin(toRadians(theta))
    var rz = mat4(c, -s, 0.0, 0.0, s, c, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0)
    return rz
}

export const createTranslateMatrix = ({ [0]: x, [1]: y, [2]: z }: Vector3): Matrix4x4 => {
    const result = identity4x4()
    result[0][3] = x
    result[1][3] = y
    result[2][3] = z

    return result
}

export const createScaleMatrix = (sx: number = 1, sy: number = 1, sz: number = 1) => {
    var result = identity4x4()
    result[0][0] = sx
    result[1][1] = sy
    result[2][2] = sz
    return result
}

export const multMatrices = <T extends Matrix>(m1: T, m2: T): T => {
    const output = [] as number[][]

    for (let i = 0; i < m1.length; i++) {
        output.push([])

        for (let j = 0; j < m2.length; j++) {
            let sum = 0.0
            for (let k = 0; k < m1.length; k++) sum += m1[i][k] * m2[k][j]

            output[i].push(sum)
        }
    }

    return output as T
}

export const transpose = <T extends Matrix>(m: T): T => {
    const result = [] as number[][]
    for (let i = 0; i < m.length; ++i) {
        result.push([])
        for (let j = 0; j < m[i].length; ++j) {
            result[i].push(m[j][i])
        }
    }

    return result as T
}

export const det2 = (m: Matrix2x2): number => {
    return m[0][0] * m[1][1] - m[0][1] * m[1][0]
}

export const det3 = (m: Matrix3x3): number => {
    const d =
        m[0][0] * m[1][1] * m[2][2] +
        m[0][1] * m[1][2] * m[2][0] +
        m[0][2] * m[2][1] * m[1][0] -
        m[2][0] * m[1][1] * m[0][2] -
        m[1][0] * m[0][1] * m[2][2] -
        m[0][0] * m[1][2] * m[2][1]
    return d
}

export const det4 = (m: Matrix4x4): number => {
    const m0 = mat3(m[1][1], m[1][2], m[1][3], m[2][1], m[2][2], m[2][3], m[3][1], m[3][2], m[3][3])
    const m1 = mat3(m[1][0], m[1][2], m[1][3], m[2][0], m[2][2], m[2][3], m[3][0], m[3][2], m[3][3])
    const m2 = mat3(m[1][0], m[1][1], m[1][3], m[2][0], m[2][1], m[2][3], m[3][0], m[3][1], m[3][3])
    const m3 = mat3(m[1][0], m[1][1], m[1][2], m[2][0], m[2][1], m[2][2], m[3][0], m[3][1], m[3][2])
    return m[0][0] * det3(m0) - m[0][1] * det3(m1) + m[0][2] * det3(m2) - m[0][3] * det3(m3)
}

export const inverse3 = (m: Matrix3x3): Matrix3x3 => {
    const a = mat3()
    const d = det3(m)

    const a00 = mat2(m[1][1], m[1][2], m[2][1], m[2][2])
    const a01 = mat2(m[1][0], m[1][2], m[2][0], m[2][2])
    const a02 = mat2(m[1][0], m[1][1], m[2][0], m[2][1])
    const a10 = mat2(m[0][1], m[0][2], m[2][1], m[2][2])
    const a11 = mat2(m[0][0], m[0][2], m[2][0], m[2][2])
    const a12 = mat2(m[0][0], m[0][1], m[2][0], m[2][1])
    const a20 = mat2(m[0][1], m[0][2], m[1][1], m[1][2])
    const a21 = mat2(m[0][0], m[0][2], m[1][0], m[1][2])
    const a22 = mat2(m[0][0], m[0][1], m[1][0], m[1][1])

    a[0][0] = det2(a00) / d
    a[0][1] = -det2(a10) / d
    a[0][2] = det2(a20) / d
    a[1][0] = -det2(a01) / d
    a[1][1] = det2(a11) / d
    a[1][2] = -det2(a21) / d
    a[2][0] = det2(a02) / d
    a[2][1] = -det2(a12) / d
    a[2][2] = det2(a22) / d

    return a
}

export const inverse4 = (m: Matrix4x4): Matrix4x4 => {
    const a = identity4x4()
    const d = det4(m)

    const a00 = mat3(
        m[1][1],
        m[1][2],
        m[1][3],
        m[2][1],
        m[2][2],
        m[2][3],
        m[3][1],
        m[3][2],
        m[3][3]
    )
    const a01 = mat3(
        m[1][0],
        m[1][2],
        m[1][3],
        m[2][0],
        m[2][2],
        m[2][3],
        m[3][0],
        m[3][2],
        m[3][3]
    )
    const a02 = mat3(
        m[1][0],
        m[1][1],
        m[1][3],
        m[2][0],
        m[2][1],
        m[2][3],
        m[3][0],
        m[3][1],
        m[3][3]
    )
    const a03 = mat3(
        m[1][0],
        m[1][1],
        m[1][2],
        m[2][0],
        m[2][1],
        m[2][2],
        m[3][0],
        m[3][1],
        m[3][2]
    )
    const a10 = mat3(
        m[0][1],
        m[0][2],
        m[0][3],
        m[2][1],
        m[2][2],
        m[2][3],
        m[3][1],
        m[3][2],
        m[3][3]
    )
    const a11 = mat3(
        m[0][0],
        m[0][2],
        m[0][3],
        m[2][0],
        m[2][2],
        m[2][3],
        m[3][0],
        m[3][2],
        m[3][3]
    )
    const a12 = mat3(
        m[0][0],
        m[0][1],
        m[0][3],
        m[2][0],
        m[2][1],
        m[2][3],
        m[3][0],
        m[3][1],
        m[3][3]
    )
    const a13 = mat3(
        m[0][0],
        m[0][1],
        m[0][2],
        m[2][0],
        m[2][1],
        m[2][2],
        m[3][0],
        m[3][1],
        m[3][2]
    )
    const a20 = mat3(
        m[0][1],
        m[0][2],
        m[0][3],
        m[1][1],
        m[1][2],
        m[1][3],
        m[3][1],
        m[3][2],
        m[3][3]
    )
    const a21 = mat3(
        m[0][0],
        m[0][2],
        m[0][3],
        m[1][0],
        m[1][2],
        m[1][3],
        m[3][0],
        m[3][2],
        m[3][3]
    )
    const a22 = mat3(
        m[0][0],
        m[0][1],
        m[0][3],
        m[1][0],
        m[1][1],
        m[1][3],
        m[3][0],
        m[3][1],
        m[3][3]
    )
    const a23 = mat3(
        m[0][0],
        m[0][1],
        m[0][2],
        m[1][0],
        m[1][1],
        m[1][2],
        m[3][0],
        m[3][1],
        m[3][2]
    )
    const a30 = mat3(
        m[0][1],
        m[0][2],
        m[0][3],
        m[1][1],
        m[1][2],
        m[1][3],
        m[2][1],
        m[2][2],
        m[2][3]
    )
    const a31 = mat3(
        m[0][0],
        m[0][2],
        m[0][3],
        m[1][0],
        m[1][2],
        m[1][3],
        m[2][0],
        m[2][2],
        m[2][3]
    )
    const a32 = mat3(
        m[0][0],
        m[0][1],
        m[0][3],
        m[1][0],
        m[1][1],
        m[1][3],
        m[2][0],
        m[2][1],
        m[2][3]
    )
    const a33 = mat3(
        m[0][0],
        m[0][1],
        m[0][2],
        m[1][0],
        m[1][1],
        m[1][2],
        m[2][0],
        m[2][1],
        m[2][2]
    )

    a[0][0] = det3(a00) / d
    a[0][1] = -det3(a10) / d
    a[0][2] = det3(a20) / d
    a[0][3] = -det3(a30) / d
    a[1][0] = -det3(a01) / d
    a[1][1] = det3(a11) / d
    a[1][2] = -det3(a21) / d
    a[1][3] = det3(a31) / d
    a[2][0] = det3(a02) / d
    a[2][1] = -det3(a12) / d
    a[2][2] = det3(a22) / d
    a[2][3] = -det3(a32) / d
    a[3][0] = -det3(a03) / d
    a[3][1] = det3(a13) / d
    a[3][2] = -det3(a23) / d
    a[3][3] = det3(a33) / d

    return a
}

export const matSlice = (
    source: Matrix,
    from: [number, number] = [0, 0],
    to: [number, number] = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
): MatrixNxM => source.slice(from[1], to[1]).map(r => r.slice(from[0], to[0])) as MatrixNxM

export const matFitInPlace = <T extends Matrix>(fit: MatrixNxM | Matrix, into: T): T => {
    for (let i = 0; i < fit.length; i++) into[i].splice(0, fit[i].length, ...fit[i])

    return into
}
