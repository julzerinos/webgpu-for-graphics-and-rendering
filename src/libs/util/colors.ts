import { vec3, vec4 } from "./vector"

export const color = (r = 0, g = 0, b = 0, a = 0): GPUColor => ({ r, g, b, a })

export const colorToVec3 = (color: GPUColorDict) => vec3(color.r, color.g, color.b)
export const colorToVec4 = (color: GPUColorDict) => vec4(color.r, color.g, color.b, color.a)

export const Colors: { [key: string]: GPUColor } = {
    black: { r: 0, g: 0, b: 0, a: 0 },
}
