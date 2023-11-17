import { ExecutableQueue, ViewGenerator } from "../../../types"
import { default as cameraRotation } from "./cameraRotation"

export { cameraRotation }

export const CameraMovement: ViewGenerator = (app: HTMLElement, executeQueue: ExecutableQueue) => {
    cameraRotation(app, executeQueue)
}
