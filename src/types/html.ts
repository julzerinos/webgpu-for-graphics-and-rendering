export type Executable = () => void

export type ExecutableQueue = Executable[]

export type ViewGenerator = (container: HTMLElement, executeQueue: ExecutableQueue) => void

export interface ICanvasCoordinates {
    x: number
    y: number
}

export interface IRoute {
    name: string
    description: string
    path: string
    generator: ViewGenerator
    children?: IRoute[]
}
