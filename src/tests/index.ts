import { ExecutableQueue, IRoute, ViewGenerator } from "../types"
import { default as objParserTest } from "./obj-parser/objParser.test"

export const RunTests: ViewGenerator = (app: HTMLElement, queue: ExecutableQueue) => {
    queue.push(objParserTest)
}

export const TestRoute: IRoute = {
    generator: RunTests,
    name: "test",
}
