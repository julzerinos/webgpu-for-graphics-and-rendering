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

    input.min = String(min)
    input.max = String(max)
    input.step = String(step)
    input.value = String(value)

    return input
}

export const createInputWithLabel = (input: HTMLInputElement, labelText: string): HTMLElement => {
    const wrapper = document.createElement("div")

    const label = document.createElement("label")
    const setLabelText = () => (label.textContent = `${labelText} [${input.value}]`)

    input.addEventListener("input", setLabelText)
    setLabelText()

    wrapper.append(label, input)
    return wrapper
}

export const createCanvasSection = (): HTMLDivElement => {
    const div = document.createElement("div")
    div.className = "canvas-section"

    return div
}

export const createCanvas = (canvasId: string, size: number = 512): HTMLCanvasElement => {
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = size
    canvas.id = canvasId

    return canvas
}
