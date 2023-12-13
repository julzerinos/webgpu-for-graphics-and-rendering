import { IRoute } from "../../../types"

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
    {
        width,
        height,
        lowRes,
        overlay,
    }: {
        width?: number
        height?: number
        lowRes?: boolean
        overlay?: boolean
    } = {}
): HTMLCanvasElement => {
    const canvas = document.createElement("canvas")
    canvas.width = width ?? 512
    canvas.height = height ?? 512
    canvas.id = canvasId

    if (lowRes) canvas.classList.add("low-res")
    if (overlay) canvas.classList.add("overlay")

    return canvas
}

export const routesIndex = (routes: IRoute[]): HTMLElement => {
    const div = document.createElement("div")
    div.className = "routes-container"

    for (const r of routes) {
        const a = document.createElement("a")
        a.text = r.name

        a.onclick = () => {
            location.search = "t=rendering"
        }

        div.append(a)
    }

    return div
}
