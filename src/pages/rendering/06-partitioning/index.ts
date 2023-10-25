import { ExecutableQueue, ViewGenerator } from "../../../types"
import { default as bsp } from "./bsp"

export { bsp }

export const SpatialPartitioning: ViewGenerator = (
    container: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    bsp(container, executeQueue)
}
