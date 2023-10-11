import { cross, dot, normalize, scale, subtract, toRadians, vec4, vectorsEqual } from "."
import { Matrix, Matrix4x4, MatrixFormat, Vector3, Vector4, VectorFormat } from "../../types"

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

export const identity4x4 = () => mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)

export const flattenMatrix = (matrix: Matrix): number[] => ([] as Array<number>).concat(...transpose(matrix))
export const flattenMatrices = (matrices: Matrix[]): number[] =>
    ([] as Array<number>).concat(...matrices.map(m => flattenMatrix(m)))

// export const matrixByteLength: { [key in MatrixFormat]: number } = {
// float32x4: new Float32Array(mat4()).byteLength,
// mat2: new Float32Array(flatten(mat2())).byteLength,
// mat3: new Float32Array(flatten(mat3())).byteLength,
// mat4: new Float32Array(flatten(mat4())).byteLength,
// }

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

function perspectiveProjection(fovy: number, aspect: number, near: number, far: number) {
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
    var result = [] as number[][]
    for (var i = 0; i < m.length; ++i) {
        result.push([])
        for (var j = 0; j < m[i].length; ++j) {
            result[i].push(m[j][i])
        }
    }

    return result as T
}
