import { ExecutableQueue, ViewGenerator } from "../../../types"

import { default as rayLineIntersection } from "./rayLineIntersection"

export { rayLineIntersection }

export const DebuggingRendering: ViewGenerator = (
    container: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    rayLineIntersection(container, executeQueue)
}
