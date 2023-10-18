import { ExecutableQueue, ViewGenerator } from "../../../types"
import { default as Lighting } from "./lighting"

export { Lighting }

export const LightingGraphics: ViewGenerator = (
    app: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    Lighting(app, executeQueue)
}
