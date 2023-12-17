import "./style.css"

import { ExecutableQueue } from "./types"

import { allRoutes } from "./pages"
import { createHeader, instantiateApp, route } from "./libs/web"

const app = instantiateApp()
const executeQueue: ExecutableQueue = []

const { route: currentRoute, breadcrumbs } = route(allRoutes)

app.append(createHeader(currentRoute, breadcrumbs))

currentRoute.generator(app, executeQueue)

for (const e of executeQueue) e()
