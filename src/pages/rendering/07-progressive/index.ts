import { ExecutableQueue, ViewGenerator } from "../../../types"
import { default as progressive } from "./progressive"

export { progressive }

export const Progressive: ViewGenerator = (app: HTMLElement, executeQueue: ExecutableQueue) => {
    progressive(app, executeQueue)
}
