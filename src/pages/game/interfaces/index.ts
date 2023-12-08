import { Matrix4x4, Vector3, Vector4 } from "../../../types"

export interface Mesh {
    vertices: Float32Array
    normals: Float32Array
    uvs: Float32Array
}

export interface Renderable {
    pass: (encoder: GPUCommandEncoder) => void
    onPlayerMove?: (position: Vector3) => void
    onPlayerView?: (cameraMatrix: Matrix4x4) => void
}

export interface ShadowMapPass extends Renderable {
    textureView: GPUTextureView
    light: Light
}

export interface Light {
    position: Vector4
    direction: Vector4
}
