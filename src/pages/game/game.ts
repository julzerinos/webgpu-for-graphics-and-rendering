import {
    Colors,
    createTranslateMatrix,
    flattenMatrix,
    scale,
    sqrMagnitude,
    subtract,
    vec2,
    vec3,
} from "../../libs/util"
import {
    createCanvasSection,
    createCanvas,
    createInteractableSection,
    pointerLockCanvas,
} from "../../libs/web"
import {
    createBind,
    createPass,
    generateDepthBuffer,
    genreateVertexBuffer,
    initializeWebGPU,
    setupShaderPipeline,
    writeToBufferF32,
    writeToBufferU32,
} from "../../libs/webgpu"
import { Executable, ViewGenerator, ExecutableQueue } from "../../types"
import {
    GameCamera,
    calculatePlayerViewMatrix,
    getCameraProjectionViewMatrix,
    initializeCamera,
} from "./logic/camera"
import { TILE_SIZE, Tile, TileMeshData } from "./logic/tile"
import {
    GamePlayer,
    handleKeyInput,
    initializePlayer,
    updatePlayerLookDirection,
} from "./logic/player"

import tileShader from "./shaders/tile.wgsl?raw"
import { generateMap } from "./logic/dungeon"

const CANVAS_ID = "game"
const CANVAS_SIZE = 512

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const player: GamePlayer = initializePlayer()
    const camera: GameCamera = initializeCamera(player)

    let tiles = [] as Tile[]
    while (tiles.length < 24) ({ tiles } = generateMap())

    let inGame = false

    const onMouseMove = (dx: number, dy: number) => {
        updatePlayerLookDirection(player, -dx / CANVAS_SIZE, dy / CANVAS_SIZE)
    }

    const { keyMap } = pointerLockCanvas(CANVAS_ID, onMouseMove, {
        onStart: () => (inGame = true),
        onEnd: () => (inGame = false),
    })

    const tile = TileMeshData()

    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateVertexBuffer(
        device,
        tile.vertices,
        "float32x4"
    )
    const { buffer: normalBuffer, bufferLayout: normalBufferLayout } = genreateVertexBuffer(
        device,
        tile.normals,
        "float32x4",
        1
    )

    const { depthStencil, depthStencilAttachmentFactory } = generateDepthBuffer(device, canvas, 1)

    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout, normalBufferLayout],
        canvasFormat,
        tileShader,
        "triangle-list",
        { primitive: { frontFace: "ccw", cullMode: "front" }, depthStencil },
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

    const {
        bindGroup,
        buffers: [proj],
    } = createBind(
        device,
        pipeline,
        [new Float32Array(flattenMatrix(getCameraProjectionViewMatrix(camera)))],
        "UNIFORM"
    )

    const models = new Float32Array(tiles.length * 16)
    const cardinalities = new Uint32Array(tiles.length)

    const {
        bindGroup: instancesDataBind,
        buffers: [modelsBuffer, cardinalitiesBuffer],
    } = createBind(device, pipeline, [models, cardinalities], "STORAGE", 1)

    const updateCameraProjectionViewMatrix = () => {
        camera.extrinsics = calculatePlayerViewMatrix(player)

        writeToBufferF32(
            device,
            proj,
            new Float32Array(flattenMatrix(getCameraProjectionViewMatrix(camera))),
            0
        )
    }

    const updateInstanceBuffers = () => {
        const models = new Float32Array(tiles.length * 16)
        const cardinalities = new Uint32Array(tiles.length)

        const playerMapPosition = vec2(
            player.position[0] / TILE_SIZE,
            -player.position[2] / TILE_SIZE
        )
        tiles.sort(
            (a: Tile, b: Tile) =>
                sqrMagnitude(subtract(playerMapPosition, b.position)) -
                sqrMagnitude(subtract(playerMapPosition, a.position))
        )

        for (let i = 0; i < tiles.length; i++) {
            const position = tiles[i].position
            const translation = scale(vec3(position[0], 0, -position[1]), TILE_SIZE)
            models.set(flattenMatrix(createTranslateMatrix(translation)), i * 16)
            cardinalities[i] = tiles[i].cardinality
        }

        writeToBufferF32(device, modelsBuffer, models, 0)
        writeToBufferU32(device, cardinalitiesBuffer, cardinalities, 0)
    }

    const frame = (time: number) => {
        updateCameraProjectionViewMatrix()
        handleKeyInput(player, keyMap)

        updateInstanceBuffers()

        const { pass, executePass } = createPass(device, context, Colors.black, {
            depthStencilAttachmentFactory,
        })

        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)
        pass.setVertexBuffer(1, normalBuffer)
        pass.setBindGroup(0, bindGroup)
        pass.setBindGroup(1, instancesDataBind)
        pass.draw(tile.vertices.length / 4, tiles.length)

        executePass()

        requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    // const title = createTitle("Camera movement")
    // const description = createText("No description yet")

    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    const interactableSection = createInteractableSection()

    interactableSection.append()
    canvasSection.append(canvas, interactableSection)
    div.append(canvasSection)

    executeQueue.push(execute)
}

export default view
