import { ExecutableQueue, ViewGenerator } from "../../../types"

import { default as shadows } from "./shadows"

export { shadows }

export const Shadows: ViewGenerator = (app: HTMLElement, executeQueue: ExecutableQueue) => {
    shadows(app, executeQueue)
}
