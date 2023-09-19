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

export const createWithLabel = (
    element: HTMLElement,
    labelText: string,
    showValue: boolean = true
): HTMLElement => {
    const wrapper = document.createElement("div")
    wrapper.className = "label-group"

    const label = document.createElement("label")
    label.textContent = labelText

    if (showValue && "value" in element) {
        const setLabelText = () => (label.textContent = `${labelText} [${element.value}]`)
        element.addEventListener("input", setLabelText)
        setLabelText()
    }

    wrapper.append(label, element)
    return wrapper
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
