import { ExecutableQueue, ViewGenerator } from "../../../types"

import wireframe from "./wireframe"
import perspective from "./perspective"

export { wireframe, perspective }

export const Projection: ViewGenerator = (
    container: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    wireframe(container, executeQueue)
    perspective(container, executeQueue)
}
