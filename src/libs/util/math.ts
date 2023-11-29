import { Vector } from "../../types"

export const toRadians = (degrees: number): number => {
    return (degrees * Math.PI) / 180.0
}

export const mapRange = (
    x: number,
    aMin: number,
    aMax: number,
    bMin: number,
    bMax: number
): number => ((x - aMin) / (aMax - aMin)) * (bMax - bMin) + bMin

export const boolToNumber = (b: boolean | undefined): number => (b ? 1 : 0)

export const clamp = (x: number, min: number, max: number) => Math.min(Math.max(x, min), max)
