import { IRoute } from "../types"
import { grapichsRoutes } from "./graphics"
import { renderingRoutes } from "./rendering"

export const allRoutes: IRoute[] = ([] as IRoute[]).concat(grapichsRoutes, renderingRoutes)
