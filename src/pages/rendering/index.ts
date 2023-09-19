import { ExecutableQueue, IRoute, ViewGenerator } from "../../types"

import { RaycastingIntroduction } from "./01-raycasting-introduction"
import { LightingModels } from "./02-lighting-models"

export const Rendering: ViewGenerator = (container: HTMLElement, executeQueue: ExecutableQueue) => {
    RaycastingIntroduction(container, executeQueue)
    LightingModels(container, executeQueue)
}

export const renderingRoutes: IRoute = {
    name: "rendering",
    generator: Rendering,
    children: [
        {
            name: "01-raycasting-introduction",
            generator: RaycastingIntroduction,
            children: [],
        },
        {
            name: "02-lighting-models",
            generator: LightingModels,
            children: [],
        },
    ],
}
