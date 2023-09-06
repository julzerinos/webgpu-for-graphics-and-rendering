import { createCanvas, createWorksheetSection, instantiateApp } from "./libs/web"

import "./style.css"
import { ExecutableQueue } from "./types"
import { worksheet1 } from "./worksheets/graphics/01-graphics-pipeline"

const app = instantiateApp()
const executeQueue: ExecutableQueue = []

worksheet1(app, executeQueue)

// for (const [i, t] of worksheet1.tasks.entries()) t.task(t.canvasId, t.interactables)
for (const e of executeQueue) e()
