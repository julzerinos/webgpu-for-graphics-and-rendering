import {
    Colors,
    add,
    flattenMatrix,
    flattenVector,
    identity4x4,
    loadTexture,
    vec2,
    vec3,
} from "../../../libs/util"
import {
    generateMultisampleBuffer,
    generateDepthBuffer,
    setupShaderPipeline,
    genreateVertexBuffer,
    createBind,
    createTextureBind,
    createPass,
    writeToBufferF32,
} from "../../../libs/webgpu"
import { Matrix4x4, Vector2, Vector3 } from "../../../types"
import { Light, Mesh, Renderable, ShadowMapPass } from "../interfaces"
import { Direction, TILE_SIZE, Tile, TileMeshData, TileType } from "./tile"

import dungeonShader from "../shaders/dungeon.wgsl?raw"
import { createLightProjectionMatrix } from "./lights"

const DUNGEON_DIMENSION = 6

const directionToMapOffset = {
    1: vec2(0, 1),
    2: vec2(1, 0),
    4: vec2(0, -1),
    8: vec2(-1, 0),
} as { [key in Direction]: Vector2 }

const setTile = (map: TileType[][], position: Vector2, tile: TileType) => {
    map[position[0]][position[1]] = tile
}
const getTile = (map: TileType[][], position: Vector2): TileType =>
    position[1] >= 0 &&
    position[1] < DUNGEON_DIMENSION &&
    position[0] >= 0 &&
    position[0] < DUNGEON_DIMENSION
        ? map[position[0]][position[1]]
        : TileType.OUT_OF_BOUNDS
const isTileEmpty = (map: TileType[][], position: Vector2): boolean =>
    getTile(map, position) === TileType.EMPTY
const isDirectionEmpty = (map: TileType[][], position: Vector2, direction: Direction): boolean => {
    switch (direction) {
        case Direction.NORTH:
            return (
                isTileEmpty(map, add(position, vec2(-1, 1))) &&
                isTileEmpty(map, add(position, vec2(0, 1))) &&
                isTileEmpty(map, add(position, vec2(1, 1)))
            )

        case Direction.EAST:
            return (
                isTileEmpty(map, add(position, vec2(1, 1))) &&
                isTileEmpty(map, add(position, vec2(1, 0))) &&
                isTileEmpty(map, add(position, vec2(1, -1)))
            )

        case Direction.SOUTH:
            return (
                isTileEmpty(map, add(position, vec2(-1, -1))) &&
                isTileEmpty(map, add(position, vec2(0, -1))) &&
                isTileEmpty(map, add(position, vec2(1, -1)))
            )

        case Direction.WEST:
            return (
                isTileEmpty(map, add(position, vec2(-1, 1))) &&
                isTileEmpty(map, add(position, vec2(-1, 0))) &&
                isTileEmpty(map, add(position, vec2(-1, -1)))
            )
    }

    return false
}

const sampleTileType = (): TileType => {
    const event = Math.random()

    if (event < 0.2) return TileType.LIGHT

    return TileType.NORMAL
}

export const generateMap = (): { map: TileType[][]; center: Vector2 } => {
    const map = Array.from(Array(DUNGEON_DIMENSION).fill(null), () =>
        Array(DUNGEON_DIMENSION).fill(TileType.EMPTY)
    ) as TileType[][]
    const center = vec2(DUNGEON_DIMENSION / 2, DUNGEON_DIMENSION / 2)

    const followPath = (position: Vector2) => {
        // TODO randomize tiletype
        const tileType = sampleTileType()
        if (tileType === TileType.EMPTY) return

        setTile(map, position, tileType)

        for (let i = 0; i < 4; i++) {
            const direction = (1 << i) as Direction
            if (!isDirectionEmpty(map, position, direction)) continue

            // TODO random chance to not go in that direction proportional to distance from center

            const nextTilePosition = add(position, directionToMapOffset[direction])
            followPath(nextTilePosition)
        }
    }

    followPath(center)

    return { map, center }
}

const generateDebugMap = (): { map: TileType[][]; center: Vector2 } => {
    const map = Array.from(Array(DUNGEON_DIMENSION).fill(null), () =>
        Array(DUNGEON_DIMENSION).fill(TileType.EMPTY)
    ) as TileType[][]
    const center = vec2(DUNGEON_DIMENSION / 2, DUNGEON_DIMENSION / 2)

    for (let col = 0; col < map.length; col++)
        for (let row = 0; row < map[col].length; row++) {
            if (col !== center[1] && row !== center[0]) continue

            map[row][col] = TileType.NORMAL

            if (
                col === 0 ||
                col === DUNGEON_DIMENSION - 1 ||
                row === 0 ||
                row === DUNGEON_DIMENSION - 1
            )
                map[row][col] = TileType.LIGHT
        }

    return { map, center }
}

export const populateTiles = (
    dungeonMap: TileType[][]
): { tiles: Tile[]; tileMap: (Tile | null)[][] } => {
    const tiles = [] as Tile[]
    const tileMap = Array.from(Array(DUNGEON_DIMENSION).fill(null), () =>
        Array(DUNGEON_DIMENSION).fill(null)
    ) as (Tile | null)[][]

    for (let col = 0; col < dungeonMap.length; col++)
        for (let row = 0; row < dungeonMap[col].length; row++) {
            const position = vec2(row, col)
            const tileType = getTile(dungeonMap, position)
            if (tileType === TileType.EMPTY) continue

            let cardinality = 0
            for (let i = 0; i < 4; i++) {
                const direction = (1 << i) as Direction
                const neighbor = getTile(dungeonMap, add(position, directionToMapOffset[direction]))
                const doesNeighborExist =
                    neighbor !== TileType.OUT_OF_BOUNDS && neighbor !== TileType.EMPTY
                if (doesNeighborExist) cardinality += 1 << i
            }

            const tile: Tile = {
                position,
                cardinality,
                type: tileType,
            }
            tiles.push(tile)
            tileMap[row][col] = tile
        }

    return { tiles, tileMap }
}

export const generateDungeonMap = (): {
    tiles: Tile[]
    tileMap: (Tile | null)[][]
    center: Vector2
} => {
    const { map, center } = generateDebugMap() // generateMap()

    const { tiles, tileMap } = populateTiles(map)

    return { tiles, tileMap, center }
}

export const worldToMap = (world: Vector3): Vector2 =>
    vec2(
        Math.round(world[0] / TILE_SIZE + DUNGEON_DIMENSION / 2),
        Math.round(world[2] / TILE_SIZE + DUNGEON_DIMENSION / 2)
    )

export const mapToWorld = (map: Vector2): Vector3 =>
    vec3(
        TILE_SIZE * (map[0] - DUNGEON_DIMENSION / 2),
        0,
        TILE_SIZE * (map[1] - DUNGEON_DIMENSION / 2)
    )

export const generateMeshFromTiles = (tiles: Tile[]): Mesh => {
    let dungeonVertices = new Float32Array()
    let dunegonNormals = new Float32Array()
    let dungeonUvs = new Float32Array()

    for (const t of tiles) {
        const mesh = TileMeshData(t)
        dungeonVertices = new Float32Array([...dungeonVertices, ...mesh.vertices])
        dunegonNormals = new Float32Array([...dunegonNormals, ...mesh.normals])
        dungeonUvs = new Float32Array([...dungeonUvs, ...mesh.uvs])
    }

    return { vertices: dungeonVertices, normals: dunegonNormals, uvs: dungeonUvs }
}

export const createDungeonRender = async (
    dungeon: Mesh,
    device: GPUDevice,
    canvas: HTMLCanvasElement,
    canvasFormat: GPUTextureFormat,
    context: GPUCanvasContext,
    lightShadowMaps: ShadowMapPass[] = []
): Promise<Renderable> => {
    const { texture, sampler } = await loadTexture(device, "game/dungeon_textures_albedo.png")

    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateVertexBuffer(
        device,
        dungeon.vertices,
        "float32x4"
    )
    const { buffer: normalBuffer, bufferLayout: normalBufferLayout } = genreateVertexBuffer(
        device,
        dungeon.normals,
        "float32x4",
        1
    )
    const { buffer: uvBuffer, bufferLayout: uvBufferLayout } = genreateVertexBuffer(
        device,
        dungeon.uvs,
        "float32x2",
        2
    )

    const { multisample, msaaTexture } = generateMultisampleBuffer(device, canvas, canvasFormat, 4)
    const { depthStencil, depthStencilAttachmentFactory } = generateDepthBuffer(device, canvas, 4)

    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout, normalBufferLayout, uvBufferLayout],
        canvasFormat,
        dungeonShader,
        "triangle-list",
        { primitive: { frontFace: "ccw", cullMode: "front" }, depthStencil, multisample },
        {
            blend: {
                color: {
                    operation: "add",
                    srcFactor: "src-alpha",
                    dstFactor: "one-minus-src-alpha",
                },
                alpha: { operation: "add", srcFactor: "one", dstFactor: "zero" },
            },
        }
    )

    const textureBind = createTextureBind(device, pipeline, texture, sampler, 1)

    const {
        bindGroup: playerDataBindGroup,
        buffers: [cameraBuffer],
    } = createBind(device, pipeline, [new Float32Array(flattenMatrix(identity4x4()))], "UNIFORM")

    const lightShadowMapsTemp = lightShadowMaps.slice(0, 6)

    const lightSources = new Float32Array(
        lightShadowMapsTemp.flatMap(lsm =>
            [
                flattenVector([lsm.light.position, lsm.light.direction]),
                flattenMatrix(createLightProjectionMatrix(lsm.light)),
            ].flat()
        )
    )
    const lightSourcesBuffer = device.createBuffer({
        size: lightSources.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })
    device.queue.writeBuffer(lightSourcesBuffer, 0, lightSources)

    const shadowMapBindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(2),
        entries: [
            {
                binding: 0,
                resource: { buffer: lightSourcesBuffer },
            },
            ...lightShadowMapsTemp.map((lsm, i) => ({ binding: i + 1, resource: lsm.textureView })),
        ],
    })

    const onPlayerView = (cameraMatrix: Matrix4x4) => {
        writeToBufferF32(device, cameraBuffer, new Float32Array(flattenMatrix(cameraMatrix)), 0)
    }

    if (lightShadowMaps.length < 6) console.warn("Less lights than 6")

    const dungeonRenderPass = (encoder: GPUCommandEncoder) => {
        const colorAttachment: GPURenderPassColorAttachment = {
            view: msaaTexture.createView(),
            resolveTarget: context.getCurrentTexture().createView(),
            loadOp: "clear",
            clearValue: Colors.black,
            storeOp: "store",
        }
        const pass = encoder.beginRenderPass({
            colorAttachments: [colorAttachment],
            depthStencilAttachment: (depthStencilAttachmentFactory ?? (() => undefined))(),
        })

        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)
        pass.setVertexBuffer(1, normalBuffer)
        pass.setVertexBuffer(2, uvBuffer)
        pass.setBindGroup(0, playerDataBindGroup)
        pass.setBindGroup(1, textureBind)
        pass.setBindGroup(2, shadowMapBindGroup)
        pass.draw(dungeon.vertices.length / 4)

        pass.end()
    }

    return { pass: dungeonRenderPass, onPlayerView }
}
