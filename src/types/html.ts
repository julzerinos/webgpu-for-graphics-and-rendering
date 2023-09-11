export type Executable = () => void

export type ExecutableQueue = Executable[]

export type ViewGenerator = (container: HTMLElement, executeQueue: ExecutableQueue) => void

export interface ICanvasCoordinates {
    x: number
    y: number
}

export interface IRoute {
    parent: string | null
    path: string
    generator: ViewGenerator
}
