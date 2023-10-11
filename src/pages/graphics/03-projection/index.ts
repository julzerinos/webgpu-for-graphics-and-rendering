import { ExecutableQueue, ViewGenerator } from "../../../types"

import wireframe from "./wireframe"

export { wireframe }

export const Projection: ViewGenerator = (
    container: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    wireframe(container, executeQueue)
}
