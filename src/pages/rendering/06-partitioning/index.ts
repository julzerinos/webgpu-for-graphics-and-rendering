import { ExecutableQueue, ViewGenerator } from "../../../types"

import { default as bsp } from "./bsp"
import { default as interleaving } from "./cornellAgain"
import { default as cornellWithGlass } from "./cornellWithGlass"

export { bsp, interleaving }

export const SpatialPartitioning: ViewGenerator = (
    container: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    bsp(container, executeQueue)
    interleaving(container, executeQueue)
    cornellWithGlass(container, executeQueue)
}
