import { ExecutableQueue, IRoute, ViewGenerator } from "../../types"

import { WebGPUBasics } from "./01-webgpu-basics"
import { Drawing } from "./02-interaction"

export const Graphics: ViewGenerator = (container: HTMLElement, executeQueue: ExecutableQueue) => {
    WebGPUBasics(container, executeQueue)
    Drawing(container, executeQueue)
}

export const grapichsRoutes: IRoute[] = [
    {
        parent: "graphics",
        path: "01-webgpu-basics",
        generator: WebGPUBasics,
    },
    {
        parent: "graphics",
        path: "02-drawing-with-shaders",
        generator: Drawing,
    },
    {
        parent: null,
        path: "graphics",
        generator: Graphics,
    },
]
