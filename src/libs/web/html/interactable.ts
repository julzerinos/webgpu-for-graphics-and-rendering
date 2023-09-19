export const createRange = (
    id: string,
    value: number,
    min: number,
    max: number,
    step: number = 1
): HTMLInputElement => {
    const input = document.createElement("input")
    input.id = id
    input.type = "range"
    input.className = "slider-input"

    input.min = String(min)
    input.max = String(max)
    input.step = String(step)
    input.value = String(value)

    return input
}

export const createColorPicker = (id: string, value: string): HTMLInputElement => {
    const colorPicker = document.createElement("input")
    colorPicker.id = id
    colorPicker.type = "color"

    colorPicker.value = value

    return colorPicker
}

export const createBoolInput = (id: string, value: boolean): HTMLInputElement => {
    const checkbox = document.createElement("input")
    checkbox.id = id
    checkbox.type = "checkbox"

    checkbox.checked = value
    checkbox.value = String(value)

    checkbox.addEventListener("input", () => (checkbox.value = String(checkbox.checked)))

    return checkbox
}

export const createButton = (id: string, text: string): HTMLButtonElement => {
    const button = document.createElement("button")
    button.id = id
    button.textContent = text

    return button
}

export const createSelect = (id: string, options: string[]): HTMLSelectElement => {
    const select = document.createElement("select")
    select.id = id

    select.append(
        ...options.map(o => {
            const optionElement = document.createElement("option")
            optionElement.text = o
            optionElement.value = o
            return optionElement
        })
    )

    return select
}
