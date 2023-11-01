import { ExecutableQueue, ViewGenerator } from "../../../types"
import { default as texturedSphereWithQuad } from "./texturedSphereWithQuad"

export { texturedSphereWithQuad }

export const EnvMapping: ViewGenerator = (app: HTMLElement, executeQueue: ExecutableQueue) => {
    texturedSphereWithQuad(app, executeQueue)
}
