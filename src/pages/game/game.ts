import { Colors, boolToNumber, flattenMatrix, vec3 } from "../../libs/util"
import { createCanvasSection, createCanvas, pointerLockCanvas } from "../../libs/web"
import {
    createBind,
    createPass,
    generateDepthBuffer,
    generateMultisampleBuffer,
    genreateVertexBuffer,
    initializeWebGPU,
    setupShaderPipeline,
    writeToBufferF32,
} from "../../libs/webgpu"
import { Executable, ViewGenerator, ExecutableQueue } from "../../types"
import {
    GameCamera,
    calculatePlayerViewMatrix,
    getCameraProjectionViewMatrix,
    initializeCamera,
} from "./logic/camera"
import { Tile, boundPositionInTile } from "./logic/tile"
import {
    GamePlayer,
    initializePlayer,
    updatePlayerLookDirection,
    calculatePlayerPosition,
} from "./logic/player"

import dungeonShader from "./shaders/dungeon.wgsl?raw"
import { generateMap, generateMeshFromTiles, worldToMap } from "./logic/dungeon"

const CANVAS_ID = "game"
const CANVAS_SIZE = 512

const execute: Executable = async () => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const player: GamePlayer = initializePlayer()
    const camera: GameCamera = initializeCamera(player)

    let tiles = [] as Tile[]
    let dungeonMap = [] as (Tile | null)[][]
    // while (tiles.length < 16)
    ;({ tiles, dungeonMap } = generateMap())
    const dungeon = generateMeshFromTiles(tiles)

    let inGame = false

    const onMouseMove = (dx: number, dy: number) => {
        updatePlayerLookDirection(player, -dx / CANVAS_SIZE, dy / CANVAS_SIZE)
    }

    const { keyMap } = pointerLockCanvas(CANVAS_ID, onMouseMove, {
        onStart: () => (inGame = true),
        onEnd: () => (inGame = false),
    })

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

    const { multisample, msaaTexture } = generateMultisampleBuffer(device, canvas, canvasFormat, 4)
    const { depthStencil, depthStencilAttachmentFactory } = generateDepthBuffer(device, canvas, 4)

    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout, normalBufferLayout],
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

    const {
        bindGroup,
        buffers: [proj],
    } = createBind(
        device,
        pipeline,
        [new Float32Array(flattenMatrix(getCameraProjectionViewMatrix(camera)))],
        "UNIFORM"
    )

    const updateCameraProjectionViewMatrix = () => {
        camera.extrinsics = calculatePlayerViewMatrix(player)

        writeToBufferF32(
            device,
            proj,
            new Float32Array(flattenMatrix(getCameraProjectionViewMatrix(camera))),
            0
        )
    }

    const getPlayerTile = (): Tile => {
        const mapPosition = worldToMap(player.position)
        mapPosition[0] = Math.round(mapPosition[0])
        mapPosition[1] = Math.round(mapPosition[1])
        return dungeonMap[mapPosition[1]][mapPosition[0]]!
    }

    const handleKeyInput = (player: GamePlayer, keyMap: { [key: string]: boolean }) => {
        const forward = boolToNumber(keyMap["w"]) - boolToNumber(keyMap["s"])
        const strafe = boolToNumber(keyMap["a"]) - boolToNumber(keyMap["d"])

        if (!forward && !strafe) return

        const newPosition = calculatePlayerPosition(player, forward, strafe)
        boundPositionInTile(newPosition, getPlayerTile())
        player.position = newPosition
        // console.log(player.position)
        // console.log(worldToMap(player.position))
    }

    const frame = (time: number) => {
        updateCameraProjectionViewMatrix()
        handleKeyInput(player, keyMap)

        const { pass, executePass } = createPass(device, context, Colors.black, {
            depthStencilAttachmentFactory,
            msaaTexture,
        })

        pass.setPipeline(pipeline)
        pass.setVertexBuffer(0, vertexBuffer)
        pass.setVertexBuffer(1, normalBuffer)
        pass.setBindGroup(0, bindGroup)
        pass.draw(dungeon.vertices.length / 4)

        executePass()

        requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const canvasSection = createCanvasSection()
    const canvas = createCanvas(CANVAS_ID)
    canvasSection.append(canvas)
    div.append(canvasSection)

    executeQueue.push(execute)
}

export default view
