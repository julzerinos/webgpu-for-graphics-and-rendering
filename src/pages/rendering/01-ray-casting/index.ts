import { ExecutableQueue, ViewGenerator } from "../../../types"

import { default as RayCast } from "./rayCast"
import { default as HitInfo } from "./hitInfo"
import { default as Light } from "./light"

export { RayCast, HitInfo, Light }

export const SimpleRaycasting: ViewGenerator = (
    container: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    RayCast(container, executeQueue)
    HitInfo(container, executeQueue)
    Light(container, executeQueue)
}
