import { ExecutableQueue, ViewGenerator } from "../../../types"

import { default as environmental } from "./environmental"
import { default as lightProbes } from "./lightProbes"

export { environmental, lightProbes }

export const Environmental: ViewGenerator = (
    container: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    // environmental(container, executeQueue)
    lightProbes(container, executeQueue)
}
