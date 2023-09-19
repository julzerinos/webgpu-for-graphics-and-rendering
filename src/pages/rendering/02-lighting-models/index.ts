import { ExecutableQueue, ViewGenerator } from "../../../types"

import { default as Shadows } from "./shadows"

export { Shadows }

export const LightingModels: ViewGenerator = (
    container: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    Shadows(container, executeQueue)
}
