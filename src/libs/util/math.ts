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
