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

export const routesIndex = (route: IRoute): HTMLElement => {
    const wrapper = document.createElement("div")
    wrapper.className = `routes ${route.path}`

    const routeTitle = document.createElement("a")
    routeTitle.text = route.path
    routeTitle.className = "underline"
    wrapper.append(routeTitle)

    const container = document.createElement("div")
    container.className = "routes-container"

    for (const r of route.children ?? []) {
        const div = document.createElement("div")
        div.className = "route-entry"

        const a = document.createElement("a")
        a.text = r.name

        const span = document.createElement("span")
        span.textContent = r.description

        div.onclick = () => {
            location.href = `/${route.path}/${r.path}`
        }
        div.append(a, span)
        container.append(div)
    }

    wrapper.append(container)
    return wrapper
}

export const createValueDisplay = (id: string) => {
    const div = document.createElement("div")
    div.id = id
    div.className = "value-display"

    return div
}
