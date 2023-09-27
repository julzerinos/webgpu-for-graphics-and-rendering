export type Vector2 = [number, number]
export type Vector3 = [number, number, number]
export type Vector4 = [number, number, number, number]

export type Vector = Vector2 | Vector3 | Vector4
export type VectorFormat = "float32x2" | "float32x3" | "float32x4"

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

export type Matrix = Matrix3x3 | Matrix4x4
export type MatrixFormat = "float32x2" | "float32x3" | "float32x4"
