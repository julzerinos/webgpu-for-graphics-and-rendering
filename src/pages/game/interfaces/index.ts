import { Matrix4x4, Vector2, Vector3, Vector4 } from "../../../types"
import { Tile } from "../logic/tile"

export interface GamePlayer {
    camera: GameCamera

    position: Vector3
    lookDirection: Vector3
    right: Vector3

    playerMoveListeners: ((position: Vector3) => void)[]
    playerViewListeners: ((cameraMatrix: Matrix4x4) => void)[]
}

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
    tint: Vector3
}

export interface GameEngine {
    device: GPUDevice
    mainCanvas: GameCanvas
    input: InputState
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
    multisample: GPUMultisampleState
    msaaTextureView: GPUTextureView
}

export interface TileSet {
    allTiles: Tile[]
    lightTiles: Tile[]
    endTile: Tile | null
}

export interface InputState {
    keyMap: { [key: string]: boolean }
    onMouseMoveListeners: ((dx: number, dy: number) => void)[]
}

export interface GameCamera {
    intrinsics: Matrix4x4
    extrinsics: Matrix4x4
}

export interface GameState {
    map: (Tile | null)[][]
    currentTile: Tile | null
    tileChangeListeners: ((world: Vector3, map: Vector2) => void)[]
}
