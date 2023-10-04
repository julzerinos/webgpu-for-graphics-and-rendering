import { ExecutableQueue, ViewGenerator } from "../../../types"

import { default as Texture } from "./texture"
import { default as Texturing } from "./texturing"

export { Texture, Texturing }

export const TextureMapping: ViewGenerator = (
    container: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    Texture(container, executeQueue)
    Texturing(container, executeQueue)
}
