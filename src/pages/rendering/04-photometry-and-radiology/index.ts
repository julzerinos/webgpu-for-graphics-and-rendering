import { ExecutableQueue, ViewGenerator } from "../../../types"

import { default as exercises } from "./exercises"

export { exercises }

export const MeasuringLight: ViewGenerator = (
    container: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    exercises(container, executeQueue)
}
