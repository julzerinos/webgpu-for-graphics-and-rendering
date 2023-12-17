import { LandingPage } from "../../pages"
import { RunTests } from "../../tests"
import { IRoute, ViewGenerator } from "../../types"

export const route = (routes: IRoute[]): ViewGenerator => {
    const paths = window.location.pathname.split("/").slice(import.meta.env.PROD ? 1 : 2)

    console.log(paths)

    if (paths[0] === "test") return RunTests

    let foundRoute: IRoute | undefined = undefined
    let routesToSearch: IRoute[] = routes

    for (const p of paths) {
        const route: IRoute | undefined = routesToSearch.find(r => r.path === p)

        if (!route) break

        foundRoute = route
        routesToSearch = foundRoute.children ?? []
    }

    if (!foundRoute) return LandingPage

    return foundRoute.generator
}
