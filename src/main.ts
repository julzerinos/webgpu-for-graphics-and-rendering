import "./style.css"

import { ExecutableQueue } from "./types"

import { allRoutes } from "./pages"
import { instantiateApp, route } from "./libs/web"

const app = instantiateApp()
const executeQueue: ExecutableQueue = []

const generator = route(allRoutes)
generator(app, executeQueue)

for (const e of executeQueue) e()
