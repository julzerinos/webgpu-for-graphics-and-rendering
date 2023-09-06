import { ExecutableQueue, ViewGenerator } from "../../../types"

import drawPoints from "./drawPoints"
import drawTriangle from "./drawTriangle"
import drawRotatingSquare from "./drawRotatingSquare"
import drawBouncingBall from "./drawBouncingBall"

export {
    drawPoints as Task1,
    drawTriangle as Task2,
    drawRotatingSquare as Task3,
    drawBouncingBall as Task4,
}

export const worksheet1: ViewGenerator = (
    container: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    drawPoints(container, executeQueue)
    drawTriangle(container, executeQueue)
    drawRotatingSquare(container, executeQueue)
    drawBouncingBall(container, executeQueue)
}
