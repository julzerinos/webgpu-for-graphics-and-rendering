import { ExecutableQueue, ViewGenerator } from "../../../types"
import { default as teapotProjectionShadows } from "./teapotShadows"
import { default as shadowMapping } from "./shadowMapping"

export { teapotProjectionShadows, shadowMapping }

export const ShadowMapping: ViewGenerator = (app: HTMLElement, executeQueue: ExecutableQueue) => {
    // teapotProjectionShadows(app, executeQueue)
    shadowMapping(app, executeQueue)
}
