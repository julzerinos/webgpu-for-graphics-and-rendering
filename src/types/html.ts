export interface IEntry {
    description: string
    title: string
}

export interface IWorksheet extends IEntry {
    tasks: ITask[]
}

export interface ITask extends IEntry {
    task: (canvasId: string, interactables: IDefineInteractables) => void
    canvasId: string
    interactables: IDefineInteractables
}

export interface IInteractables {
    [key: string]: IInteractableNumber
}

export interface IInteractableNumber {
    getNumber: () => number
}

export interface IDefineInteractables {
    [key: string]: InteractableType
}

export type InteractableType = "slider" | "range"

export type Executable = () => void

export type ExecutableQueue = Executable[]

export type ViewGenerator = (container: HTMLElement, executeQueue: ExecutableQueue) => void

