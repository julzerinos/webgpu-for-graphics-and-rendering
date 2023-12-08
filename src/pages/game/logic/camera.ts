import { perspectiveProjection, vec3, lookAtMatrix, add, multMatrices } from "../../../libs/util"
import { Matrix4x4 } from "../../../types"
import { GamePlayer } from "./player"

export interface GameCamera {
    intrinsics: Matrix4x4
    extrinsics: Matrix4x4
}

export const initializeCamera = (player: GamePlayer): GameCamera => ({
    intrinsics: perspectiveProjection(85, 1, 0.001, 100),
    extrinsics: calculatePlayerViewMatrix(player),
})

export const calculatePlayerViewMatrix = (player: GamePlayer): Matrix4x4 => {
    const at = add(player.position, player.lookDirection)
    return lookAtMatrix(player.position, at, vec3(0, 1, 0))
}

export const getCameraProjectionViewMatrix = (camera: GameCamera): Matrix4x4 => {
    return multMatrices(camera.intrinsics, camera.extrinsics)
}
