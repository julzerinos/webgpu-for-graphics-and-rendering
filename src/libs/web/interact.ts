export const watchInput = <T>(id: string): (() => T) => {
    const input = document.getElementById(id) as HTMLInputElement
    if (!input) throw new Error(`Could not locate input with id ${id}`)

    const getValue = () => input.value as T
    return getValue
}

export const subscribeToInput = <T>(id: string, callback: (value: T) => void) => {
    const input = document.getElementById(id) as HTMLInputElement
    if (!input) throw new Error(`Could not locate input with id ${id}`)

    input.addEventListener("input", () => callback(input.value as T))
}

export const subscribeToButton = (id: string, callback: () => void) => {
    const button = document.getElementById(id) as HTMLButtonElement
    if (!button) throw new Error(`Could not locate button with id ${id}`)

    button.addEventListener("click", callback)
}

export const subscribeToCanvasClick = (id: string, callback: (x: number, y: number) => void) => {
    const canvas = document.getElementById(id)
    if (!canvas) throw new Error(`Could not locate canvas with id ${id}`)

    canvas.addEventListener("click", (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        callback(x, y)
    })
}
