import { ExecutableQueue, ViewGenerator } from "../../../types"

import Task1 from "./task1"
import Task2 from "./task2"
import Task3 from "./task3"
import Task4 from "./task4"

export { Task1, Task2, Task3, Task4 }

export const worksheet1: ViewGenerator = (
    container: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    Task1(container, executeQueue)
    Task2(container, executeQueue)
    Task3(container, executeQueue)
    Task4(container, executeQueue)
}
