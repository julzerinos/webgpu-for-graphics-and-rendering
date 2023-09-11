import { IRoute, ViewGenerator } from "../../types"

export const route = (routes: IRoute[]): ViewGenerator => {
    const paths = window.location.pathname.split("/").slice(1)

    const parent = paths.length >= 2 ? paths[0] : null
    const path = parent === null ? paths[0] : paths[1]

    const route: IRoute | undefined = routes.find(r => r.parent === parent && r.path === path)

    if (!route) throw new Error("Could not find route.") // TODO change to default error page

    return route.generator
}
