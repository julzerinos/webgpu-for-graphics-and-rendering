import { ExecutableQueue, ViewGenerator } from "../../../types"
import { default as brdf } from "./brdf"

export { brdf }

export const BRDF: ViewGenerator = (container: HTMLElement, executeQueue: ExecutableQueue) => {
    brdf(container, executeQueue)
}
