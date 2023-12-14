import { ExecutableQueue, ViewGenerator } from "../../../types"

import { default as rayLineIntersection } from "./intersection/rayLineIntersection"
import { default as pathFollowing } from "./path/pathFollowing"
import { default as magnifyingGlass } from "./magnifying/magnifyingGlass"

export { rayLineIntersection, pathFollowing, magnifyingGlass }

export const DebuggingRendering: ViewGenerator = (
    container: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    // rayLineIntersection(container, executeQueue)
    // pathFollowing(container, executeQueue)
    magnifyingGlass(container, executeQueue)
}
