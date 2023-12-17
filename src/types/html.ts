export type Executable = () => void

export type ExecutableQueue = Executable[]

export type ViewGenerator = (container: HTMLElement, executeQueue: ExecutableQueue) => void

export interface ICanvasCoordinates {
    x: number
    y: number
}

export interface IRoute extends IBreadcrumb {
    description: string
    generator: ViewGenerator
    children?: IRoute[]
}

export interface IBreadcrumb {
    name: string
    path: string
}
