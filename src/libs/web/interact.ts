import { ICanvasCoordinates } from "../../types"

export const watchInput = <T>(
    id: string,
    property: keyof HTMLInputElement = "value"
): (() => T) => {
    const input = document.getElementById(id) as HTMLInputElement
    if (!input) throw new Error(`Could not locate input with id ${id}`)

    const getValue = () => input[property] as T
    return getValue
}

export const subscribeToInput = <T>(id: string, callback: (value: T) => void): T => {
    const input = document.getElementById(id) as HTMLInputElement
    if (!input) throw new Error(`Could not locate input with id ${id}`)

    input.addEventListener("input", () => callback(input.value as T))

    return input.value as T
}

export const subscribeToButton = (id: string, callback: () => void) => {
    const button = document.getElementById(id) as HTMLButtonElement
    if (!button) throw new Error(`Could not locate button with id ${id}`)

    button.addEventListener("click", callback)
}

export const subscribeToCanvasClick = (
    id: string,
    callback: (coordinates: ICanvasCoordinates) => void
) => {
    const canvas = document.getElementById(id)
    if (!canvas) throw new Error(`Could not locate canvas with id ${id}`)

    canvas.addEventListener("click", (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        callback({ x, y })
    })
}

export const subscribeMultiple = (elementIds: string[], callback: () => void) => {
    for (const id of elementIds) {
        const element = document.getElementById(id) as HTMLElement
        if (!element) throw new Error(`Could not locate element with id ${id}`)

        element.addEventListener("input", callback)
    }
}
