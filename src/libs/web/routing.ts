import { LandingPage } from "../../pages"
import { RunTests } from "../../tests"
import { IRoute, ViewGenerator } from "../../types"

export const route = (routes: IRoute[]): ViewGenerator => {
    const query = new URLSearchParams(document.location.search)
    const paths = [query.get("t"), query.get("p")]

    if (paths[0] === "test") return RunTests

    let foundRoute: IRoute | undefined = undefined
    let routesToSearch: IRoute[] = routes

    for (const p of paths) {
        const route: IRoute | undefined = routesToSearch.find(r => r.name === p)

        if (!route) break // TODO change to default error page

        foundRoute = route
        routesToSearch = foundRoute.children ?? []
    }

    if (!foundRoute) return LandingPage

    return foundRoute.generator
}
