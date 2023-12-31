import { Cube, vec3, flattenVector, toVec3, createTranslateMatrix, add, createScaleMatrix, multMatrices, vectorMatrixMult, flattenMatrix, cross, quatFromAxisAngle, quatMultiply, normalize, quatApply, vec4, Vector3s, boolToNumber, scale } from "../../../../libs/util";
import { byteLength } from "../../../../libs/util/byteLengths";
import { genreateVertexBuffer, genreateIndexBuffer, writeToBufferF32 } from "../../../../libs/webgpu";
import { Vector3 } from "../../../../types";
import { BufferedMesh, GameEngine, GamePlayer, GameState } from "../interfaces";
import { initializeCamera, getCameraProjectionViewMatrix, calculatePlayerViewMatrix } from "./camera";
import { boundPositionInTile } from "./tile";

const createPlayerBufferedMesh = (
    device: GPUDevice
): { bufferedMesh: BufferedMesh; updateMesh: (pos: Vector3) => void } => {
    const playerShadowMesh = Cube(vec3(0, 0, 0), 1)
    const { buffer: playerVertexBuffer, bufferLayout: playerLayout } = genreateVertexBuffer(
        device,
        new Float32Array(flattenVector(playerShadowMesh.vertices)),
        "float32x4",
        0
    )
    const { buffer: playerIndexBuffer } = genreateIndexBuffer(
        device,
        new Uint32Array(flattenVector(playerShadowMesh.triangleIndices.map(f => toVec3(f))))
    )

    const updateMesh = (position: Vector3) => {
        const translation = createTranslateMatrix(add(position, vec3(0, -0.5, 0)))
        const scale = createScaleMatrix(1, 2, 1)
        const model = multMatrices(translation, scale)
        writeToBufferF32(
            device,
            playerVertexBuffer,
            new Float32Array(
                flattenVector(playerShadowMesh.vertices.map(v => vectorMatrixMult(v, model)))
            ), // TODO Change to model matrix uniform
            0
        )
    }

    return {
        bufferedMesh: {
            vertexBuffer: playerVertexBuffer,
            vertexBufferLayout: playerLayout,
            indexBuffer: playerIndexBuffer,
            vertexCount: playerShadowMesh.vertices.length,
            triangleCount: playerShadowMesh.triangleCount,
        },
        updateMesh,
    }
}

export const initializePlayer = ({ device }: GameEngine): GamePlayer => {
    const startPosition = vec3(0, 0, 0)
    const startLookDirection = vec3(0, 0, 1)

    const camera = initializeCamera(startPosition, startLookDirection)

    const playerPerspectiveBuffer = device.createBuffer({
        size: byteLength.float32x4x4,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })
    writeToBufferF32(
        device,
        playerPerspectiveBuffer,
        new Float32Array(flattenMatrix(getCameraProjectionViewMatrix(camera))),
        0
    )

    const playerPositionBuffer = device.createBuffer({
        size: byteLength.float32x3,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })
    writeToBufferF32(device, playerPositionBuffer, new Float32Array(vec3()), 0)

    const { bufferedMesh, updateMesh } = createPlayerBufferedMesh(device)

    return {
        camera,
        position: startPosition,
        lookDirection: startLookDirection,
        right: cross(vec3(0, 1, 0), startLookDirection),
        playerMoveListeners: [updateMesh],
        playerViewListeners: [],
        shadowBufferedMesh: bufferedMesh,
        playerPerspectiveBuffer,
        playerPositionBuffer,
    } as GamePlayer
}

export const updatePlayerLookDirection = (
    { device }: GameEngine,
    player: GamePlayer,
    dx: number,
    dy: number
) => {
    let normalizedHorizontalMovement = -dx / 512
    let normalizedVerticalMovement = dy / 512

    if (player.lookDirection[1] > 0.97)
        normalizedVerticalMovement = Math.max(0, normalizedVerticalMovement)
    if (player.lookDirection[1] < -0.97)
        normalizedVerticalMovement = Math.min(0, normalizedVerticalMovement)

    const quatY = quatFromAxisAngle(vec3(0, 1, 0), normalizedHorizontalMovement)
    const quatX = quatFromAxisAngle(player.right, normalizedVerticalMovement)
    const quat = quatMultiply(quatY, quatX)

    player.lookDirection = normalize(toVec3(quatApply(vec4(...player.lookDirection, 1), quat)))
    player.right = normalize(cross(Vector3s.up, player.lookDirection))

    refreshPlayerCamera(device, player)
}

export const refreshPlayerCamera = (device: GPUDevice, player: GamePlayer) => {
    player.camera.extrinsics = calculatePlayerViewMatrix(player.position, player.lookDirection)

    const cameraMatrix = getCameraProjectionViewMatrix(player.camera)
    for (const l of player.playerViewListeners) l(cameraMatrix)

    writeToBufferF32(
        device,
        player.playerPerspectiveBuffer,
        new Float32Array(flattenMatrix(getCameraProjectionViewMatrix(player.camera))),
        0
    )
}

export const updatePlayerPosition = (
    { device }: GameEngine,
    player: GamePlayer,
    gameState: GameState,
    keyMap: { [key: string]: boolean }
) => {
    const forward = boolToNumber(keyMap["w"]) - boolToNumber(keyMap["s"])
    const strafe = boolToNumber(keyMap["a"]) - boolToNumber(keyMap["d"])
    const moveSpeedModifier = keyMap["v"]

    if (!forward && !strafe) return

    const newPosition = calculatePlayerPosition(player, forward, strafe, moveSpeedModifier)
    if (!gameState.cheats.noClip) boundPositionInTile(newPosition, gameState.currentTile!)
    player.position = newPosition

    for (const l of player.playerMoveListeners) l(player.position)

    writeToBufferF32(device, player.playerPositionBuffer, new Float32Array(player.position), 0)

    refreshPlayerCamera(device, player)
}

const moveFrameSpeed = 1e-1
export const calculatePlayerPosition = (
    player: GamePlayer,
    forward: number,
    strafe: number,
    moveSpeedModifier: boolean
): Vector3 => {
    let displacement = vec3()
    const moveSpeed = (moveSpeedModifier ? 2 : 1) * moveFrameSpeed

    if (forward) {
        const forwardFlatDirection = [...player.lookDirection] as Vector3
        forwardFlatDirection[1] = 0

        const forwardDisplacment = scale(normalize(forwardFlatDirection), moveSpeed * forward)

        displacement = add(displacement, forwardDisplacment)
    }

    if (strafe) {
        const strafeFlatDirection = [...player.right] as Vector3
        strafeFlatDirection[1] = 0
        const strafeDisplacement = scale(normalize(strafeFlatDirection), moveSpeed * strafe)
        displacement = add(displacement, strafeDisplacement)
    }

    return add(player.position, displacement)
}
