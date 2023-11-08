export type Vector2 = [number, number]
export type Vector3 = [number, number, number]
export type Vector4 = [number, number, number, number]

export type Vector = Vector2 | Vector3 | Vector4
export type VectorFormat = "float32x2" | "float32x3" | "float32x4"

export type SingleFormat = "float32" | "uint32"

export type DataFormat = VectorFormat | SingleFormat | MatrixFormat

export type Matrix2x2 = [[number, number], [number, number]]
export type Matrix3x3 = [
    [number, number, number],
    [number, number, number],
    [number, number, number]
]
export type Matrix4x4 = [
    [number, number, number, number],
    [number, number, number, number],
    [number, number, number, number],
    [number, number, number, number]
]
export type MatrixNxM = [[number, ...number[]], ...[number, ...number[]][]]

export type Matrix = Matrix2x2 | Matrix3x3 | Matrix4x4
export type MatrixFormat = "float32x2" | "float32x3" | "float32x4"
