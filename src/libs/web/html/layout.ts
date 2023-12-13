export const createInteractableSection = (): HTMLDivElement => {
    const div = document.createElement("div")
    div.className = "interactables"

    return div
}

export const createCanvasSection = (): HTMLDivElement => {
    const div = document.createElement("div")
    div.className = "canvas-section"

    return div
}

