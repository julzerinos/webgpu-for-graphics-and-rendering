import { Vector3 } from "."

export interface IShapeInfo {
    vertices: Vector3[]
    lineIndices: Uint32Array
    triangleIndices: Uint32Array
}
