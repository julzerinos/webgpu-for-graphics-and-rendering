import { ExecutableQueue, ViewGenerator } from "../../../types"

import introducingTriangles from "./introducingTriangles"
import utahTeapot from "./utahTeapot"
import cornellBox from "./cornellBox"

export { introducingTriangles, utahTeapot, cornellBox as conrellBox }

export const Meshes: ViewGenerator = (app: HTMLElement, executeQueue: ExecutableQueue) => {
    introducingTriangles(app, executeQueue)
    utahTeapot(app, executeQueue)
    cornellBox(app, executeQueue)
}
