import { Vector4 } from "."

export interface IShapeInfo {
    vertices: Vector4[]
    lineIndices: Uint32Array
    triangleIndices: Uint32Array
}
