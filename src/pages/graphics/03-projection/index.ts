import { ExecutableQueue, ViewGenerator } from "../../../types"

import wireframe from "./wireframe"
import perspective from "./perspective"
import airplane from "./airplane"

export { wireframe, perspective, airplane }

export const Projection: ViewGenerator = (
    container: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    wireframe(container, executeQueue)
    perspective(container, executeQueue)
    airplane(container, executeQueue)
}
