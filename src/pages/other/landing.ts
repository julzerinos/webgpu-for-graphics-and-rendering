import { createTitle, createText, routesIndex } from "../../libs/web"
import { Executable, ViewGenerator, ExecutableQueue } from "../../types"
import { grapichsRoutes } from "../graphics"
import { renderingRoutes } from "../rendering"

const execute: Executable = async () => {}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Using WebGPU for graphics and rendering")
    const description = createText("No description yet")

    const routingGraphics = routesIndex(grapichsRoutes)
    const routingRendering = routesIndex(renderingRoutes)
    const row = document.createElement("div")
    row.className = "generic-row"
    row.append(routingGraphics, routingRendering)

    div.append(title, description, row)
    executeQueue.push(execute)
}

export default view
