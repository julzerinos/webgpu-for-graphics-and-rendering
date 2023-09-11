import { add, vec2 } from "./vector"

export const Square = (point: [number, number], size: number): number[][] => {
    const offset = size / 2
    return [
        vec2(point[0] - offset, point[1] - offset),
        vec2(point[0] + offset, point[1] - offset),
        vec2(point[0] - offset, point[1] + offset),
        vec2(point[0] - offset, point[1] + offset),
        vec2(point[0] + offset, point[1] - offset),
        vec2(point[0] + offset, point[1] + offset),
    ]
}

export const Circle = (
    center: [number, number],
    radius: number,
    granularity: number = 12
): number[][] => {
    const circle = [] as number[][]
    const step = (2 * Math.PI) / granularity

    for (let i = 0; i < granularity; i++)
        circle.push(
            center,
            add(center, vec2(radius * Math.cos(i * step), radius * Math.sin(i * step))),
            add(center, vec2(radius * Math.cos((i + 1) * step), radius * Math.sin((i + 1) * step)))
        )

    return circle
}
