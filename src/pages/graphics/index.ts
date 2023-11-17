import { ExecutableQueue, IRoute, ViewGenerator } from "../../types"

import { WebGPUBasics } from "./01-webgpu-basics"
import { Drawing } from "./02-interaction"
import { Projection } from "./03-projection"
import { Lighting } from "./04-lighting"
import { Meshes } from "./05-meshes"
import { Texturing } from "./06-textures"
import { EnvMapping } from "./07-env-mapping"
import { Shadows } from "./08-shadows"
import { ShadowMapping } from "./09-shadow-mapping"
import { CameraMovement } from "./10-camera-movement"

export const Graphics: ViewGenerator = (container: HTMLElement, executeQueue: ExecutableQueue) => {
    if (!grapichsRoutes.children) throw "Graphics routes do not exist"
    
    for (const g of grapichsRoutes.children.map(c => c.generator)) g(container, executeQueue)
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
        {
            name: "07-env-mapping",
            generator: EnvMapping,
        },
        {
            name: "08-shadows",
            generator: Shadows,
        },
        {
            name: "09-shadow-mapping",
            generator: ShadowMapping,
        },
        {
            name: "10-camera-movement",
            generator: CameraMovement,
        },
    ],
}
