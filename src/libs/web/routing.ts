import { IRoute, ViewGenerator } from "../../types"

export const route = (routes: IRoute[]): ViewGenerator => {
    const paths = window.location.pathname.split("/").slice(1)

    let foundRoute: IRoute | undefined = undefined
    let routesToSearch: IRoute[] = routes

    for (const p of paths) {
        const route: IRoute | undefined = routesToSearch.find(r => r.name === p)

        if (!route) throw new Error("Could not find route.") // TODO change to default error page

        foundRoute = route
        routesToSearch = foundRoute.children
    }

    if (!foundRoute) throw new Error("Could not find route.") // TODO change to default error page

    return foundRoute.generator
}
