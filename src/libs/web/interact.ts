export const watchInput = <T>(id: string): (() => T) => {
    const input = document.getElementById(id) as HTMLInputElement
    if (!input) throw new Error(`Could not locate input with id ${id}`)

    const getValue = () => input.value as T
    return getValue
}

export const subscribeToButton = (id: string, callback: () => void) => {
    const button = document.getElementById(id) as HTMLButtonElement
    if (!button) throw new Error(`Could not locate button with id ${id}`)

    button.addEventListener("click", callback)
}
