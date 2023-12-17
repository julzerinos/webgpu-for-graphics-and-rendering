import { ExecutableQueue, ViewGenerator } from "../types"
import { default as objParserTest } from "./obj-parser/objParser.test"

export const RunTests: ViewGenerator = (_, queue: ExecutableQueue) => {
    queue.push(objParserTest)
}

// export const TestRoute: IRoute = {
//     generator: RunTests,
//     path: "test",
// }
