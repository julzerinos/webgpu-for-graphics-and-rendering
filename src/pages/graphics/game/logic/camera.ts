import { perspectiveProjection, add, lookAtMatrix, vec3, multMatrices } from "../../../../libs/util"
import { Vector3, Matrix4x4 } from "../../../../types"
import { GameCamera } from "../interfaces"

export const initializeCamera = (position: Vector3, direction: Vector3): GameCamera => ({
    intrinsics: perspectiveProjection(85, 1, 0.001, 100),
    extrinsics: calculatePlayerViewMatrix(position, direction),
})

export const calculatePlayerViewMatrix = (position: Vector3, direction: Vector3): Matrix4x4 => {
    const at = add(position, direction)
    const view = lookAtMatrix(position, at, vec3(0, 1, 0))

    return view
}

export const getCameraProjectionViewMatrix = (camera: GameCamera): Matrix4x4 => {
    return multMatrices(camera.intrinsics, camera.extrinsics)
}
