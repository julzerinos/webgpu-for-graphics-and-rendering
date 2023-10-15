import { Vector4 } from "."

export interface IShapeInfo {
    vertices: Vector4[]
    normals: Vector4[]
    lineIndices?: Uint32Array
    triangleIndices: Uint32Array
    triangleCount: number
}
