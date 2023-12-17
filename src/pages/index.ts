import { IRoute } from "../types"
import { grapichsRoutes } from "./graphics"
import { renderingRoutes } from "./rendering"

import { default as LandingPage } from "./landing"

export const allRoutes: IRoute[] = [grapichsRoutes, renderingRoutes]

export const LandingPageRoute: IRoute = {
    name: "Landing Page",
    path: "",
    description: "",
    generator: LandingPage,
    children: [],
}
