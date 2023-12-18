import { ExecutableQueue, ViewGenerator } from "../../../types"
import { default as cameraMagic } from "./cameraMagic"

export { cameraMagic as cameraRotation }

export const CameraMovement: ViewGenerator = (app: HTMLElement, executeQueue: ExecutableQueue) => {
    cameraMagic(app, executeQueue)
}
