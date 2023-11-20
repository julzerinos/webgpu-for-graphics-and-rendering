import {
    Vector3s,
    add,
    boolToNumber,
    cross,
    normalize,
    quatApply,
    quatFromAxisAngle,
    quatMultiply,
    scale,
    toVec3,
    vec2,
    vec3,
    vec4,
} from "../../../libs/util"
import { Vector2, Vector3 } from "../../../types"

export interface GamePlayer {
    position: Vector3
    lookDirection: Vector3
    right: Vector3
}

export const initializePlayer = (): GamePlayer => {
    return {
        position: vec3(5, 0, 5),
        lookDirection: vec3(-1, 0, 0),
        right: vec3(1, 0, 0),
    } as GamePlayer
}

export const updatePlayerLookDirection = (
    player: GamePlayer,
    normalizedHorizontalMovement: number,
    normalizedVerticalMovement: number
) => {
    const quatY = quatFromAxisAngle(vec3(0, 1, 0), normalizedHorizontalMovement)
    const quatX = quatFromAxisAngle(player.right, normalizedVerticalMovement)
    const quat = quatMultiply(quatY, quatX)

    player.lookDirection = normalize(toVec3(quatApply(vec4(...player.lookDirection, 1), quat)))
    player.right = cross(Vector3s.up, player.lookDirection)
}

export const handleKeyInput = (player: GamePlayer, keyMap: { [key: string]: boolean }) => {
    const moveFrameSpeed = 1e-1

    const forward = moveFrameSpeed * (boolToNumber(keyMap["w"]) - boolToNumber(keyMap["s"]))
    const strafe = moveFrameSpeed * (boolToNumber(keyMap["a"]) - boolToNumber(keyMap["d"]))

    updatePlayerPosition(player, forward, strafe)
}

export const updatePlayerPosition = (player: GamePlayer, forward: number, strafe: number) => {
    if (forward) {
        const forwardDisplacement = [...player.lookDirection] as Vector3
        forwardDisplacement[1] = 0
        player.position = add(player.position, scale(normalize(forwardDisplacement), forward))
    }

    if (strafe) {
        const strafeDisplacement = [...player.right] as Vector3
        strafeDisplacement[1] = 0
        player.position = add(player.position, scale(normalize(strafeDisplacement), strafe))
    }
}
