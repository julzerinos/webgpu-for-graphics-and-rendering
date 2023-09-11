import { ExecutableQueue, ViewGenerator } from "../../../types"

import drawPoints from "./drawPoints"
import drawTriangle from "./drawTriangle"
import drawRotatingSquare from "./drawRotatingSquare"
import drawBouncingBall from "./drawBouncingBall"

export { drawPoints, drawTriangle, drawRotatingSquare, drawBouncingBall }

export const WebGPUBasics: ViewGenerator = (
    container: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    drawPoints(container, executeQueue)
    drawTriangle(container, executeQueue)
    drawRotatingSquare(container, executeQueue)
    drawBouncingBall(container, executeQueue)
}
