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
}

export const initializePlayer = (): GamePlayer => {
    return {
        position: vec3(),
        lookDirection: vec3(0, 0, 1),
    } as GamePlayer
}

export const updatePlayerLookDirection = (
    player: GamePlayer,
    normalizedHorizontalMovement: number,
    normalizedVerticalMovement: number
) => {
    const quatY = quatFromAxisAngle(vec3(0, 1, 0), normalizedHorizontalMovement)
    const quatX = quatFromAxisAngle(vec3(1, 0, 0), normalizedVerticalMovement)
    const quat = quatMultiply(quatY, quatX)

    player.lookDirection = normalize(toVec3(quatApply(vec4(...player.lookDirection, 1), quat)))
}

export const handleKeyInput = (player: GamePlayer, keyMap: { [key: string]: boolean }) => {
    const moveFrameSpeed = 5e-2

    const forward = moveFrameSpeed * (boolToNumber(keyMap["w"]) - boolToNumber(keyMap["s"]))
    const strafe = moveFrameSpeed * (boolToNumber(keyMap["a"]) - boolToNumber(keyMap["d"]))

    updatePlayerPosition(player, forward, strafe)
}

export const updatePlayerPosition = (player: GamePlayer, forward: number, strafe: number) => {
    if (forward) {
        const forwardDisplacement = scale(player.lookDirection, forward)
        forwardDisplacement[1] = 0
        player.position = add(player.position, forwardDisplacement)
    }

    if (strafe) {
        const right = cross(Vector3s.up, player.lookDirection)
        const strafeDisplacement = scale(right, strafe)
        strafeDisplacement[1] = 0
        player.position = add(player.position, strafeDisplacement)
    }
}
