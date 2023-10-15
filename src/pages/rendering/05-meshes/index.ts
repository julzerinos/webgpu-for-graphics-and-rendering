import { ExecutableQueue, ViewGenerator } from "../../../types"

import introducingTriangles from "./introducingTriangles"
import utahTeapot from "./utahTeapot"

export { introducingTriangles, utahTeapot }

export const Meshes: ViewGenerator = (app: HTMLElement, executeQueue: ExecutableQueue) => {
    introducingTriangles(app, executeQueue)
    utahTeapot(app, executeQueue)
}
