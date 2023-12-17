import { IRoute } from "../types"
import { grapichsRoutes } from "./graphics"
import { renderingRoutes } from "./rendering"

export * from "./other"

export const allRoutes: IRoute[] = [grapichsRoutes, renderingRoutes]
