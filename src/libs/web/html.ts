import { IDefineInteractables, ITask, IWorksheet } from "../../types"

export const createWorksheetSection = (worksheet: IWorksheet): HTMLDivElement => {
    const div = document.createElement("div")
    div.className = "worksheet"

    div.innerHTML = worksheet.tasks.map(t => createTask(t).outerHTML).join("")

    return div
}

export const createTask = (task: ITask): HTMLDivElement => {
    const div = document.createElement("div")
    div.className = "task"

    div.innerHTML = `${createTitle(task.title).outerHTML}${createText(task.description).outerHTML}${
        createCanvasSection(task).outerHTML
    }`

    return div
}

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

export const createInteractables = (
    interactableDefinitions: IDefineInteractables
): HTMLDivElement => {
    const div = document.createElement("div")
    div.className = "interactables"

    div.innerHTML = Object.keys(interactableDefinitions)
        .map(k => {
            const inputDiv = document.createElement("div")
            inputDiv.className = "input-container"

            inputDiv.innerHTML = `${createLabel(k).outerHTML}${createRange(k).outerHTML}`
            return inputDiv.outerHTML
        })
        .join("")

    return div
}

export const createRange = (id: string): HTMLInputElement => {
    const input = document.createElement("input")
    input.id = id

    return input
}

export const createLabel = (text: string): HTMLLabelElement => {
    const label = document.createElement("label")
    label.textContent = text

    return label
}

export const createCanvasSection = (task: ITask): HTMLDivElement => {
    const div = document.createElement("div")
    div.className = "canvas-section"

    div.innerHTML = createCanvas(task.canvasId).outerHTML

    div.innerHTML += task.interactables ? createInteractables(task.interactables).outerHTML : ""

    return div
}

export const createCanvas = (canvasId: string, size: number = 512): HTMLCanvasElement => {
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = size
    canvas.id = canvasId

    return canvas
}
