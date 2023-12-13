import { ExecutableQueue, ViewGenerator } from "../../../types"

import { default as rayLineIntersection } from "./rayLineIntersection"
import { default as pathFollowing } from "./pathFollowing"

export { rayLineIntersection, pathFollowing }

export const DebuggingRendering: ViewGenerator = (
    container: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    // rayLineIntersection(container, executeQueue)
    pathFollowing(container, executeQueue)
}
