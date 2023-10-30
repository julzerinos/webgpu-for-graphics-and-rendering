import { ExecutableQueue, IRoute, ViewGenerator } from "../../types"

import { WebGPUBasics } from "./01-webgpu-basics"
import { Drawing } from "./02-interaction"
import { Projection } from "./03-projection"
import { Lighting } from "./04-lighting"
import { Meshes } from "./05-meshes"
import { Texturing } from "./06-textures"

export const Graphics: ViewGenerator = (container: HTMLElement, executeQueue: ExecutableQueue) => {
    WebGPUBasics(container, executeQueue)
    Drawing(container, executeQueue)
    Projection(container, executeQueue)
    Lighting(container, executeQueue)
    Meshes(container, executeQueue)
}

export const grapichsRoutes: IRoute = {
    name: "graphics",
    generator: Graphics,
    children: [
        {
            name: "01-webgpu-basics",
            generator: WebGPUBasics,
        },
        {
            name: "02-drawing",
            generator: Drawing,
        },
        {
            name: "03-projection",
            generator: Projection,
        },
        {
            name: "04-lighting",
            generator: Lighting,
        },
        { name: "05-meshes", generator: Meshes },
        {
            name: "06-texturing",
            generator: Texturing,
        },
    ],
}
