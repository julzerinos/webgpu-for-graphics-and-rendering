import { allRoutes } from ".."
import { createTitle, createText, routesIndex } from "../../libs/web"
import { Executable, ViewGenerator, ExecutableQueue } from "../../types"

const execute: Executable = async () => {}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const title = createTitle("Using WebGPU for graphics and rendering")
    const description = createText("No description yet")

    const routing = routesIndex(allRoutes)

    div.append(title, description, routing)
    executeQueue.push(execute)
}

export default view
