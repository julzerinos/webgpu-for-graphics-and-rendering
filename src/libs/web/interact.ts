import { ICanvasCoordinates } from "../../types"

export const watchInput = <T>(
    id: string,
    property: keyof HTMLInputElement = "value"
): (() => T) => {
    const input = document.getElementById(id) as HTMLInputElement
    if (!input) throw new Error(`Could not locate input with id ${id}`)

    const getValue = () => input[property] as T
    return getValue
}

export const subscribeToInput = <T>(id: string, callback: (value: T) => void): T => {
    const input = document.getElementById(id) as HTMLInputElement
    if (!input) throw new Error(`Could not locate input with id ${id}`)

    input.addEventListener("input", () => callback(input.value as T))

    return input.value as T
}

export const subscribeToButton = (id: string, callback: () => void) => {
    const button = document.getElementById(id) as HTMLButtonElement
    if (!button) throw new Error(`Could not locate button with id ${id}`)

    button.addEventListener("click", callback)
}

export const subscribeToCanvasClick = (
    id: string,
    callback: (coordinates: ICanvasCoordinates) => void
) => {
    const canvas = document.getElementById(id)
    if (!canvas) throw new Error(`Could not locate canvas with id ${id}`)

    canvas.addEventListener("click", (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        callback({ x, y })
    })
}

export const subscribeToCanvasDrag = (
    id: string,
    {
        onStart,
        onMove,
        onEnd,
    }: {
        [callback in "onStart" | "onMove" | "onEnd"]?: (coordinates: ICanvasCoordinates) => void
    }
) => {
    const canvas = document.getElementById(id)
    if (!canvas) throw new Error(`Could not locate canvas with id ${id}`)

    const rect = canvas.getBoundingClientRect()

    const getCoordinates = (event: MouseEvent): ICanvasCoordinates => ({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    })

    let isDragging = false

    canvas.addEventListener("mousedown", (event: MouseEvent) => {
        isDragging = true
        onStart?.(getCoordinates(event))
    })

    canvas.addEventListener("mouseup", (event: MouseEvent) => {
        isDragging = false
        onEnd?.(getCoordinates(event))
    })

    canvas.addEventListener("mouseleave", (event: MouseEvent) => {
        isDragging = false
        onEnd?.(getCoordinates(event))
    })

    canvas.addEventListener("mousemove", (event: MouseEvent) => {
        if (!isDragging) return
        onMove?.(getCoordinates(event))
    })
}

export const subscribeMultiple = (elementIds: string[], callback: (trigger: string) => void) => {
    for (const id of elementIds) {
        const element = document.getElementById(id) as HTMLElement
        if (!element) throw new Error(`Could not locate element with id ${id}`)

        element.addEventListener("input", () => callback(id))
    }
}

export const pointerLockCanvas = (
    id: string,
    onMove: (dx: number, dy: number) => void,
    {
        onStart,
        onEnd,
    }: {
        onStart?: () => void
        onEnd?: () => void
    } = {}
): { keyMap: { [key: string]: boolean } } => {
    const canvas = document.getElementById(id)
    if (!canvas) throw new Error(`Could not locate canvas with id ${id}`)

    canvas.addEventListener("click", async () => {
        if (!document.pointerLockElement) await canvas.requestPointerLock()
    })

    const onMoveWrapper = (event: MouseEvent): void => {
        onMove(event.movementX, event.movementY)
    }

    let keyMap: { [key: string]: boolean } = {}

    const onKeyDown = (event: KeyboardEvent): void => {
        keyMap[event.key] = true
    }

    const onKeyUp = (event: KeyboardEvent): void => {
        keyMap[event.key] = false
    }

    document.addEventListener(
        "pointerlockchange",
        () => {
            if (document.pointerLockElement === canvas) {
                console.log("[pointer api] locked pointer in canvas")
                document.addEventListener("mousemove", onMoveWrapper, false)
                window.addEventListener("keydown", onKeyDown)
                window.addEventListener("keyup", onKeyUp)
                onStart?.()
                return
            }

            document.removeEventListener("mousemove", onMoveWrapper, false)
            window.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("keyup", onKeyUp)
            onEnd?.()
        },
        false
    )

    return { keyMap }
}
