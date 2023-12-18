import { redirect } from ".."
import { LandingPageRoute } from "../../../pages"
import { IBreadcrumb, IRoute } from "../../../types"

export const createText = (text: string): HTMLSpanElement => {
    const texts = text.split("\n\n")
    const textContainer = document.createElement("div")
    textContainer.className = "paragraph"

    for (const t of texts) {
        const textElement = document.createElement("span")
        textElement.innerHTML = t
        textContainer.append(textElement)
    }

    return textContainer
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

    wrapper.append(label)
    if (showValue && "value" in element) {
        const value = document.createElement("label")
        value.className = "value-label"
        const setValueText = () => (value.textContent = `[ ${element.value} ]`)
        element.addEventListener("input", setValueText)
        setValueText()

        wrapper.append(value)
    }

    wrapper.append(element)
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
): HTMLElement => {
    if (!navigator.gpu) {
        const fallbackDiv = document.createElement("div")
        fallbackDiv.className = "fallback"
        fallbackDiv.style.setProperty("width", `${width ?? 512}px`)
        fallbackDiv.style.setProperty("height", `${height ?? 512}px`)

        const text = document.createElement("span")
        text.textContent =
            "WebGPU is not supported by this browser (or browser version). Try a different browser (eg. Chrome or Edge)."

        const a = document.createElement("a")
        a.text = "You can check the current state of WebGPU API support here."
        a.href = "https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API"

        fallbackDiv.append(text, a)
        return fallbackDiv
    }

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
            redirect(`/${route.path}/${r.path}`)
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

export const createHeader = (route: IRoute, breadcrumbs: IBreadcrumb[]): HTMLElement => {
    const div = document.createElement("div")
    div.className = `navigation ${breadcrumbs.map(b => b.path).join(" ")}`

    const landingPageA = document.createElement("a")
    landingPageA.className = "underline-white"
    landingPageA.textContent = LandingPageRoute.name
    landingPageA.onclick = () => {
        redirect("/")
    }

    div.append(landingPageA)

    if (breadcrumbs.length > 1) {
        const divider = document.createElement("span")
        divider.textContent = "/"

        const routeA = document.createElement("a")
        routeA.className = "underline"
        routeA.textContent = route.name
        div.append(divider, routeA)
    }

    return div
}

export const createRelevantFilesLink = (sectionBase: string, sectionUrls: string[]) => {
    const readable = `/${sectionBase}`
    const base = `https://github.com/julzerinos/webgpu-for-graphics-and-rendering/tree/main/src/pages${readable}`

    const div = document.createElement("div")
    div.className = "relevant-links"

    const relevant = document.createElement("span")
    relevant.textContent = "Relevant source files"
    div.append(relevant)

    const ul = document.createElement("ul")
    for (const u of sectionUrls) {
        const span = document.createElement("span")
        span.textContent = readable

        const a = document.createElement("a")
        a.href = base + u
        a.text = u
        a.target = "_blank"

        const li = document.createElement("li")
        li.append(span, a)
        ul.append(li)
    }

    div.append(ul)

    return div
}

export const createImage = (imgSrc: string): HTMLElement => {
    const div = document.createElement("div")
    div.className = "img-holder"
    const img = document.createElement("img")
    img.src = imgSrc

    div.append(img)
    return div
}
