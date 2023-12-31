import { add, vec2, vec3, loadTexture, Colors } from "../../../../libs/util"
import { asset } from "../../../../libs/web"
import {
    genreateVertexBuffer,
    setupShaderPipeline,
    createTextureBind,
} from "../../../../libs/webgpu"
import { Vector2, Vector3 } from "../../../../types"
import {
    TileType,
    Direction,
    TileSet,
    Tile,
    Mesh,
    Light,
    GameEngine,
    GameLightData,
    GamePlayer,
    Renderable,
} from "../interfaces"
import dungeonShader from "../shaders/dungeon.wgsl?raw"
import { directionToMapOffset } from "./direction"
import { TILE_SIZE, TileMeshData } from "./tile"

const DUNGEON_DIMENSION = 12

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
const isTileEmptyOrOutOfBounds = (map: TileType[][], position: Vector2): boolean => {
    const tile = getTile(map, position)
    return tile === TileType.EMPTY || tile === TileType.OUT_OF_BOUNDS
}
const isDirectionEmpty = (map: TileType[][], position: Vector2, direction: Direction): boolean => {
    switch (direction) {
        case Direction.NORTH:
            return (
                isTileEmptyOrOutOfBounds(map, add(position, vec2(-1, 1))) &&
                isTileEmpty(map, add(position, vec2(0, 1))) &&
                isTileEmptyOrOutOfBounds(map, add(position, vec2(1, 1)))
            )

        case Direction.EAST:
            return (
                isTileEmptyOrOutOfBounds(map, add(position, vec2(1, 1))) &&
                isTileEmpty(map, add(position, vec2(1, 0))) &&
                isTileEmptyOrOutOfBounds(map, add(position, vec2(1, -1)))
            )

        case Direction.SOUTH:
            return (
                isTileEmptyOrOutOfBounds(map, add(position, vec2(-1, -1))) &&
                isTileEmpty(map, add(position, vec2(0, -1))) &&
                isTileEmptyOrOutOfBounds(map, add(position, vec2(1, -1)))
            )

        case Direction.WEST:
            return (
                isTileEmptyOrOutOfBounds(map, add(position, vec2(-1, 1))) &&
                isTileEmpty(map, add(position, vec2(-1, 0))) &&
                isTileEmptyOrOutOfBounds(map, add(position, vec2(-1, -1)))
            )
    }

    return false
}

const checkLoopTile = (map: TileType[][], position: Vector2): boolean => {
    const horizontalLoop =
        !isTileEmptyOrOutOfBounds(map, add(position, vec2(0, 1))) &&
        !isTileEmptyOrOutOfBounds(map, add(position, vec2(0, -1)))
    const verticalLoop =
        !isTileEmptyOrOutOfBounds(map, add(position, vec2(1, 0))) &&
        !isTileEmptyOrOutOfBounds(map, add(position, vec2(-1, 0)))

    return horizontalLoop || verticalLoop
}

const sampleTileType = (): TileType => {
    const event = Math.random()

    // TODO randomize tiletype
    // if (event < 0.3) return TileType.EMPTY
    if (event < 0.15) return TileType.LIGHT

    return TileType.NORMAL
}

const insertStartRoom = (map: TileType[][], center: Vector2): Vector2 => {
    setTile(map, add(center, vec2(1, 0)), TileType.NORMAL)
    setTile(map, add(center, vec2(0, 0)), TileType.SPAWN)
    setTile(map, add(center, vec2(-1, 0)), TileType.NORMAL)

    setTile(map, add(center, vec2(1, 1)), TileType.LIGHT)
    setTile(map, add(center, vec2(0, 1)), TileType.NORMAL)
    setTile(map, add(center, vec2(-1, 1)), TileType.LIGHT)

    setTile(map, add(center, vec2(1, 2)), TileType.NORMAL)
    setTile(map, add(center, vec2(0, 2)), TileType.NORMAL)
    setTile(map, add(center, vec2(-1, 2)), TileType.NORMAL)

    const startPathPosition = add(center, vec2(0, 3))
    return startPathPosition
}

export const generateMap = (): { map: TileType[][]; center: Vector2 } => {
    const map = Array.from(Array(DUNGEON_DIMENSION).fill(null), () =>
        Array(DUNGEON_DIMENSION).fill(TileType.EMPTY)
    ) as TileType[][]
    const center = vec2(DUNGEON_DIMENSION / 2, DUNGEON_DIMENSION / 2)

    const startPathPosition = insertStartRoom(map, center)

    let endSet = false

    const followPath = (position: Vector2) => {
        const isLoopTile = checkLoopTile(map, position)
        const tileType = sampleTileType()

        if (tileType === TileType.EMPTY || isLoopTile) return

        setTile(map, position, tileType)

        let pathsCreatedCount = 0

        const directions = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST]
        directions.sort(() => Math.sign(Math.random() * 2 - 1))

        for (let i = 0; i < 4; i++) {
            const direction = directions[i]
            if (
                !isDirectionEmpty(map, position, direction) ||
                (tileType === TileType.LIGHT && pathsCreatedCount >= 3)
            )
                continue

            const nextTilePosition = add(position, directionToMapOffset[direction])
            followPath(nextTilePosition)

            ++pathsCreatedCount
        }

        if (pathsCreatedCount === 0 && !endSet) {
            setTile(map, position, TileType.END)
            endSet = true
        }
    }

    followPath(startPathPosition)

    return { map, center }
}

export const generateDebugMap = (): { map: TileType[][]; center: Vector2 } => {
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

    // if (DUNGEON_DIMENSION !== 4) console.warn("Debug dungeon dimension is not 4.")

    // const map = [
    //     [TileType.EMPTY, TileType.EMPTY, TileType.EMPTY, TileType.EMPTY],
    //     [TileType.EMPTY, TileType.EMPTY, TileType.LIGHT, TileType.EMPTY],
    //     [TileType.NORMAL, TileType.NORMAL, TileType.NORMAL, TileType.NORMAL],
    //     [TileType.EMPTY, TileType.EMPTY, TileType.EMPTY, TileType.EMPTY],
    // ]

    return { map, center }
}

export const populateTiles = (
    dungeonMap: TileType[][]
): { tileSet: TileSet; tileMap: (Tile | null)[][] } => {
    const allTiles = [] as Tile[]
    const lightTiles = [] as Tile[]
    let endTile = null
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

            allTiles.push(tile)
            tileMap[row][col] = tile

            if (tileType === TileType.LIGHT) lightTiles.push(tile)
            if (tileType === TileType.END) endTile = tile
        }

    return {
        tileSet: {
            allTiles,
            lightTiles,
            endTile,
        },
        tileMap,
    }
}

export const generateDungeonMap = (): {
    tileSet: TileSet
    tileMap: (Tile | null)[][]
    center: Vector2
} => {
    const { map, center } = generateMap()

    const { tileSet, tileMap } = populateTiles(map)

    return { tileSet, tileMap, center }
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
    let lights = [] as Light[]

    for (const t of tiles) {
        const mesh = TileMeshData(t)
        dungeonVertices = new Float32Array([...dungeonVertices, ...mesh.vertices])
        dunegonNormals = new Float32Array([...dunegonNormals, ...mesh.normals])
        dungeonUvs = new Float32Array([...dungeonUvs, ...mesh.uvs])
        lights = [...lights, ...mesh.lights]
    }

    return { vertices: dungeonVertices, normals: dunegonNormals, uvs: dungeonUvs, lights }
}

export const getTileFromMap = (map: (Tile | null)[][], worldPosition: Vector3): Tile | null => {
    const mapPosition = worldToMap(worldPosition)

    const tile = map[mapPosition[0]][mapPosition[1]]
    if (tile === null) {
        console.error("next does not exist")
        return null
    }

    return tile
}

export const createDungeonRender = async (
    {
        device,
        mainCanvas: {
            context,
            canvasFormat,
            depthData: { depthStencil, depthStencilTextureView },
            multisampleData: { msaaTextureView, multisample },
        },
    }: GameEngine,
    dungeon: Mesh,
    {
        shadowMapTexture,
        lightSourcesBuffer: activeLightSourcesBuffer,
        activeLightIndicesBuffer,
    }: GameLightData,
    { playerPerspectiveBuffer, playerPositionBuffer }: GamePlayer
): Promise<Renderable> => {
    const { texture, sampler } = await loadTexture(
        device,
        asset("game/dungeon_textures_albedo.png")
    )

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

    const uniformBindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            { binding: 0, resource: { buffer: playerPerspectiveBuffer } },
            { binding: 1, resource: { buffer: playerPositionBuffer } },
        ],
    })

    // return { buffers, bindGroup }

    const textureBind = createTextureBind(device, pipeline, texture, sampler, 1)

    const shadowMapBindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(2),
        entries: [
            {
                binding: 0,
                resource: { buffer: activeLightSourcesBuffer },
            },
            {
                binding: 1,
                resource: shadowMapTexture.createView(),
            },
            {
                binding: 2,
                resource: { buffer: activeLightIndicesBuffer },
            },
        ],
    })

    const dungeonRenderPass = (encoder: GPUCommandEncoder) => {
        const colorAttachment: GPURenderPassColorAttachment = {
            view: msaaTextureView,
            resolveTarget: context.getCurrentTexture().createView(),
            loadOp: "clear",
            clearValue: Colors.black,
            storeOp: "store",
        }
        const pass = encoder.beginRenderPass({
            colorAttachments: [colorAttachment],
            depthStencilAttachment: {
                view: depthStencilTextureView,
                depthLoadOp: "clear",
                depthClearValue: 1.0,
                depthStoreOp: "store",
            },
        })

        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)
        pass.setVertexBuffer(1, normalBuffer)
        pass.setVertexBuffer(2, uvBuffer)
        pass.setBindGroup(0, uniformBindGroup)
        pass.setBindGroup(1, textureBind)
        pass.setBindGroup(2, shadowMapBindGroup)
        pass.draw(dungeon.vertices.length / 4)

        pass.end()
    }

    return { pass: dungeonRenderPass }
}
