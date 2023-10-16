import { Vector4 } from "."

export interface IShapeInfo {
    vertices: Vector4[]
    normals: Vector4[]
    
    triangleIndices: Vector4[]
    triangleCount: number
    
    lineIndices?: Uint32Array

    materialIndices?: number[]
}
