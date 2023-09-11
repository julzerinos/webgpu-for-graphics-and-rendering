import { vec3, vec4 } from "./vector"

export const color = (r = 0, g = 0, b = 0, a = 0): GPUColorDict => ({ r, g, b, a })

export const colorToVec3 = (color: GPUColorDict) => vec3(color.r, color.g, color.b)
export const colorToVec4 = (color: GPUColorDict) => vec4(color.r, color.g, color.b, color.a)

export const Colors: { [key: string]: GPUColorDict } = {
    black: color(0, 0, 0, 1),
    white: color(1, 1, 1, 1),
    blueScreenBlue: color(0.1, 0.3, 0.6, 1.0),
}

export const hexToColor = (hex: string): GPUColorDict => {
    if ("#" === hex[0]) hex = hex.substring(1)

    if (hex.length !== 6) throw new Error("Can't handle color hexes of size other than 6.")

    const bigint = parseInt(hex, 16)
    const r = ((bigint >> 16) & 255) / 255
    const g = ((bigint >> 8) & 255) / 255
    const b = (bigint & 255) / 255

    return { r, g, b, a: 1 }
}
