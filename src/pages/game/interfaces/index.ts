import { Matrix4x4, Vector3, Vector4 } from "../../../types"

export interface Mesh {
    vertices: Float32Array
    normals: Float32Array
    uvs: Float32Array
    triangles?: Uint32Array
}

export interface Renderable {
    pass: (encoder: GPUCommandEncoder, time: number) => void
    onPlayerMove?: (position: Vector3) => void
    onPlayerView?: (cameraMatrix: Matrix4x4) => void
}

export interface ShadowMapPass extends Renderable {
    texture: GPUTexture
    light: Light
}

export interface Light {
    position: Vector4
    direction: Vector4
    intensity: number
}

export interface GameEngine {
    device: GPUDevice
    mainCanvas: GameCanvas
}

export interface GameCanvas {
    context: GPUCanvasContext
    canvasFormat: GPUTextureFormat
    depthData: CanvasDepthData
    multisampleData: MultisampleData
}

export interface CanvasDepthData {
    depthStencil: GPUDepthStencilState
    depthStencilTextureView: GPUTextureView
}

export interface MultisampleData {
    multisample: GPUMultisampleState,
    msaaTextureView: GPUTextureView
}