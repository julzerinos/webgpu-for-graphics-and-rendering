import {
    Vector3s,
    add,
    boolToNumber,
    clamp,
    cross,
    normalize,
    quatApply,
    quatFromAxisAngle,
    quatMultiply,
    scale,
    subtract,
    toVec3,
    vec2,
    vec3,
    vec4,
} from "../../../libs/util"
import { Vector2, Vector3 } from "../../../types"
import { mapToWorld } from "./dungeon"
import { Directions, TILE_SIZE, Tile } from "./tile"

export interface GamePlayer {
    position: Vector3
    lookDirection: Vector3
    right: Vector3
}

export const initializePlayer = (): GamePlayer => {
    return {
        position: vec3(0, 0, 0),
        lookDirection: vec3(0, 0, 1),
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

const moveFrameSpeed = 1e-1
export const calculatePlayerPosition = (
    player: GamePlayer,
    forward: number,
    strafe: number
): Vector3 => {
    let displacement = vec3()

    if (forward) {
        const forwardFlatDirection = [...player.lookDirection] as Vector3
        forwardFlatDirection[1] = 0

        const forwardDisplacment = scale(normalize(forwardFlatDirection), moveFrameSpeed * forward)

        displacement = add(displacement, forwardDisplacment)
    }

    if (strafe) {
        const strafeFlatDirection = [...player.right] as Vector3
        strafeFlatDirection[1] = 0
        const strafeDisplacement = scale(normalize(strafeFlatDirection), moveFrameSpeed * strafe)
        displacement = add(displacement, strafeDisplacement)
    }

    return add(player.position, displacement)
}
