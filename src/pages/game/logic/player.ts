import {
    Vector3s,
    add,
    boolToNumber,
    cross,
    normalize,
    quatAdd,
    quatApply,
    quatFromAxisAngle,
    quatMultiply,
    scale,
    sqrMagnitude,
    subtract,
    toVec3,
    vec3,
    vec4,
} from "../../../libs/util"
import { Vector3 } from "../../../types"
import { GamePlayer } from "../interfaces"
import {
    calculatePlayerViewMatrix,
    getCameraProjectionViewMatrix,
    initializeCamera,
} from "./camera"

export const initializePlayer = (): GamePlayer => {
    const startPosition = vec3(0, 0, 0)
    const startLookDirection = vec3(0, 0, -1)

    const camera = initializeCamera(startPosition, startLookDirection)

    return {
        camera,
        position: startPosition,
        lookDirection: startLookDirection,
        right: cross(vec3(0, 1, 0), startLookDirection),
        playerMoveListeners: [],
        playerViewListeners: [],
    } as GamePlayer
}

export const updatePlayerLookDirection = (player: GamePlayer, dx: number, dy: number) => {
    const maxFrameDisplacement = 24
    if (Math.abs(dx) > maxFrameDisplacement || Math.abs(dy) > maxFrameDisplacement) return

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

    refreshPlayerCamera(player)
}

export const refreshPlayerCamera = (player: GamePlayer) => {
    player.camera.extrinsics = calculatePlayerViewMatrix(player.position, player.lookDirection)
    const cameraMatrix = getCameraProjectionViewMatrix(player.camera)
    for (const l of player.playerViewListeners) l(cameraMatrix)
}

export const updatePlayerPosition = (player: GamePlayer, keyMap: { [key: string]: boolean }) => {
    const forward = boolToNumber(keyMap["w"]) - boolToNumber(keyMap["s"])
    const strafe = boolToNumber(keyMap["a"]) - boolToNumber(keyMap["d"])
    const moveSpeedModifier = keyMap["v"]

    if (!forward && !strafe) return

    const newPosition = calculatePlayerPosition(player, forward, strafe, moveSpeedModifier)
    // boundPositionInTile(newPosition, currentTile)
    player.position = newPosition

    for (const l of player.playerMoveListeners) l(player.position)

    refreshPlayerCamera(player)
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
