import { ExecutableQueue, ViewGenerator } from "../../../types"
import introducingTriangles from "./introducingTriangles"

export { introducingTriangles }

export const Meshes: ViewGenerator = (app: HTMLElement, executeQueue: ExecutableQueue) => {
    introducingTriangles(app, executeQueue)
}
