import { Matrix4x4, Vector2, Vector3, Vector4 } from "../../../types"

export interface GamePlayer {
    camera: GameCamera

    position: Vector3
    lookDirection: Vector3
    right: Vector3

    playerMoveListeners: ((position: Vector3) => void)[]
    playerViewListeners: ((cameraMatrix: Matrix4x4) => void)[]

    shadowBufferedMesh: BufferedMesh
}

export interface Mesh {
    vertices: Float32Array
    normals: Float32Array
    uvs: Float32Array
    triangles?: Uint32Array
    lights: Light[]
}

export interface BufferedMesh {
    vertexBuffer: GPUBuffer
    vertexBufferLayout: GPUVertexBufferLayout
    vertexCount: number

    indexBuffer?: GPUBuffer
    triangleCount?: number
}

export interface Renderable {
    pass: (encoder: GPUCommandEncoder, time: number) => void
    onPlayerMove?: (position: Vector3) => void
    onPlayerView?: (cameraMatrix: Matrix4x4) => void
    onTileChange?: (world: Vector3, map: Vector2) => void
}

export interface Light {
    position: Vector4
    direction: Vector4
    intensity: number
    tint: Vector3
    active: boolean
}

export interface GameLightData {
    lights: Light[]
    shadowMapTexture: GPUTexture
    activeLightsChangeListeners: ((activeIndices: number[]) => void)[]
    lightSourcesBuffer: GPUBuffer
    activeLightIndicesBuffer: GPUBuffer
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
    inGame: boolean
    keyMap: { [key: string]: boolean }
    mouseMoveListeners: ((dx: number, dy: number) => void)[]
}

export interface GameCamera {
    intrinsics: Matrix4x4
    extrinsics: Matrix4x4
}

export interface GameState {
    map: (Tile | null)[][]
    currentTile: Tile | null
    tileChangeListeners: ((world: Vector3, map: Vector2) => void)[]
    cheats: {
        noClip: boolean
    }
}

export enum TileType {
    OUT_OF_BOUNDS = -1,
    EMPTY = 0,
    NORMAL,
    PICKUP,
    SPAWN,
    END,
    LIGHT,
}

export interface Tile {
    position: Vector2
    cardinality: number
    type: TileType
}

export enum Direction {
    NORTH = 1,
    EAST = 2,
    SOUTH = 4,
    WEST = 8,
}
