import { ExecutableQueue, IRoute, ViewGenerator } from "../../types"

import { SimpleRaycasting } from "./01-raycasting-introduction"

export const Rendering: ViewGenerator = (container: HTMLElement, executeQueue: ExecutableQueue) => {
    SimpleRaycasting(container, executeQueue)
}

export const renderingRoutes: IRoute[] = [
    {
        parent: "rendering",
        path: "01-raycasting-introduction",
        generator: SimpleRaycasting,
    },
    {
        parent: null,
        path: "rendering",
        generator: Rendering,
    },
]
