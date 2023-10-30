import { ExecutableQueue, ViewGenerator } from "../../../types"
import { default as checkerboard } from "./checkerboard"

export { checkerboard }

export const Texturing: ViewGenerator = (app: HTMLElement, executeQueue: ExecutableQueue) => {
    checkerboard(app, executeQueue)
}
