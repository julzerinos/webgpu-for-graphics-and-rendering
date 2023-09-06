import { instantiateApp } from "./libs/web"

import "./style.css"
import { ExecutableQueue } from "./types"
// import { worksheet1 } from "./worksheets/graphics/01-graphics-pipeline"

import { Drawing } from "./worksheets/graphics/02-interaction"

const app = instantiateApp()
const executeQueue: ExecutableQueue = []

// worksheet1(app, executeQueue)
Drawing(app, executeQueue)

for (const e of executeQueue) e()
