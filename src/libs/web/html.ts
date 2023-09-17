export const createText = (text: string): HTMLParagraphElement => {
    const p = document.createElement("p")
    p.innerHTML = text
    p.className = "paragraph"

    return p
}

export const createTitle = (title: string): HTMLHeadingElement => {
    const h1 = document.createElement("h1")
    h1.innerHTML = title
    h1.className = "title"

    return h1
}

export const createInteractableSection = (): HTMLDivElement => {
    const div = document.createElement("div")
    div.className = "interactables"

    return div
}

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

export const createWithLabel = (element: HTMLElement, labelText: string): HTMLElement => {
    const wrapper = document.createElement("div")
    wrapper.className = "label-group"

    const label = document.createElement("label")

    if ("value" in element) {
        const setLabelText = () => (label.textContent = `${labelText} [${element.value}]`)
        element.addEventListener("input", setLabelText)
        setLabelText()
    }

    wrapper.append(label, element)
    return wrapper
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

export const createCanvasSection = (): HTMLDivElement => {
    const div = document.createElement("div")
    div.className = "canvas-section"

    return div
}

export const createCanvas = (
    canvasId: string,
    width: number = 512,
    height: number = 512
): HTMLCanvasElement => {
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    canvas.id = canvasId

    return canvas
}
