import { LandingPageRoute } from "../../pages"
import { IBreadcrumb, IRoute } from "../../types"

export const route = (routes: IRoute[]): { route: IRoute; breadcrumbs: IBreadcrumb[] } => {
    const paths = window.location.pathname.split("/").slice(2)

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

export const redirect = (to: string) => {
    location.href = "/webgpu-for-graphics-and-rendering" + to
}

export const asset = (assetPath: string) =>
    import.meta.env.PROD
        ? `https://julzerinos.github.io/webgpu-for-graphics-and-rendering/${assetPath}`
        : `/${assetPath}`
