import { LandingPageRoute } from "../../pages"
import { IBreadcrumb, IRoute } from "../../types"

export const route = (routes: IRoute[]): { route: IRoute; breadcrumbs: IBreadcrumb[] } => {
    const paths = window.location.pathname.split("/").slice(import.meta.env.PROD ? 1 : 2)

    // if (paths[0] === "test") return RunTests

    let foundRoute: IRoute = LandingPageRoute
    let routesToSearch: IRoute[] = routes
    const breadcrumbs = [LandingPageRoute] as IBreadcrumb[]

    for (const p of paths) {
        const route: IRoute | undefined = routesToSearch.find(r => r.path === p)

        if (!route) break

        foundRoute = route
        routesToSearch = foundRoute.children ?? []
        breadcrumbs.push(foundRoute)
    }

    return { route: foundRoute, breadcrumbs }
}
