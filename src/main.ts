import { instantiateApp } from "./libs/web"

import "./style.css"
import { ExecutableQueue } from "./types"

import { HitInfo } from "./worksheets/rendering/01-ray-casting"
import { Drawing } from "./worksheets/graphics/02-interaction"

const app = instantiateApp()
const executeQueue: ExecutableQueue = []

Drawing(app, executeQueue)
HitInfo(app, executeQueue)

for (const e of executeQueue) e()
