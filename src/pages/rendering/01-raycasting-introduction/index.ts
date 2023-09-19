import { ExecutableQueue, ViewGenerator } from "../../../types"

import { default as RaycastAnatomy } from "./raycastAnatomy"
import { default as SimpleLight } from "./simpleLight"

export { RaycastAnatomy, SimpleLight }

export const RaycastingIntroduction: ViewGenerator = (
    container: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    RaycastAnatomy(container, executeQueue)
    SimpleLight(container, executeQueue)
}
