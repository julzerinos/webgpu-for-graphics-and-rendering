import { ExecutableQueue, ViewGenerator } from "../../../types"

import { default as Texture } from "./texture"

export { Texture }

export const TextureMapping: ViewGenerator = (
    container: HTMLElement,
    executeQueue: ExecutableQueue
) => {
    Texture(container, executeQueue)
}
