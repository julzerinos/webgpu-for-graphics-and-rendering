import { ExecutableQueue, ViewGenerator } from "../../../types"

import { default as checkerboard } from "./checkerboard"
import { default as earth } from "./earth"

export { checkerboard, earth }

export const Texturing: ViewGenerator = (app: HTMLElement, executeQueue: ExecutableQueue) => {
    checkerboard(app, executeQueue)
    earth(app, executeQueue)
}
