import { ExecutableQueue, IRoute, ViewGenerator } from "../../types"

import { RaycastingIntroduction } from "./01-raycasting-introduction"
import { LightingModels } from "./02-lighting-models"
import { TextureMapping } from "./03-textures"
import { Meshes } from "./05-meshes"
import { SpatialPartitioning } from "./06-partitioning"
import { Progressive } from "./07-progressive"

export const Rendering: ViewGenerator = (container: HTMLElement, executeQueue: ExecutableQueue) => {
    RaycastingIntroduction(container, executeQueue)
    LightingModels(container, executeQueue)
    TextureMapping(container, executeQueue)
    Meshes(container, executeQueue)
    Progressive(container, executeQueue)
}

export const renderingRoutes: IRoute = {
    name: "rendering",
    generator: Rendering,
    children: [
        {
            name: "01-raycasting-introduction",
            generator: RaycastingIntroduction,
        },
        {
            name: "02-lighting-models",
            generator: LightingModels,
        },
        {
            name: "03-texture-mapping",
            generator: TextureMapping,
        },
        {
            name: "05-meshes",
            generator: Meshes,
        },
        {
            name: "06-partitioning",
            generator: SpatialPartitioning,
        },
        { name: "07-progressive", generator: Progressive },
    ],
}
