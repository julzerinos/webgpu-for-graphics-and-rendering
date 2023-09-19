import { ExecutableQueue, ViewGenerator } from "../../../types"

import { default as Shadows } from "./shadows"
import { default as Mirrors } from "./mirrors"

export { Shadows, Mirrors }

export const LightingModels: ViewGenerator = (
    container: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    Shadows(container, executeQueue)
    Mirrors(container, executeQueue)
}
