import { ExecutableQueue, ViewGenerator } from "../../../types"

import { default as discussion } from "./discussion"

export { discussion }

export const ProductionRendering: ViewGenerator = (
    container: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    discussion(container, executeQueue)
}
