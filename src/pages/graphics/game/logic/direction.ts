import { boolToNumber, vec2, vec4 } from "../../../../libs/util"
import { Vector2, Vector4 } from "../../../../types"
import { Direction } from "../interfaces"

export const reverseDirection = {
    [Direction.NORTH]: Direction.SOUTH,
    [Direction.EAST]: Direction.WEST,
    [Direction.SOUTH]: Direction.NORTH,
    [Direction.WEST]: Direction.EAST,
}

export const generateTileOpenWallsFlags = ({
    North,
    South,
    East,
    West,
}: {
    North?: boolean
    East?: boolean
    South?: boolean
    West?: boolean
}): number =>
    Direction.NORTH * boolToNumber(North) +
    Direction.EAST * boolToNumber(East) +
    Direction.SOUTH * boolToNumber(South) +
    Direction.WEST * boolToNumber(West)

export const getRandomCardinality = (legal: number = 15) =>
    (legal & Direction.NORTH) * Math.round(Math.random()) +
    (legal & Direction.EAST) * Math.round(Math.random()) +
    (legal & Direction.SOUTH) * Math.round(Math.random()) +
    (legal & Direction.WEST) * Math.round(Math.random())

export const randomDirectionFromCardinality = (cardinality: number): Direction => {
    const legalDirections = []

    if (cardinality & Direction.NORTH) legalDirections.push(Direction.NORTH)
    if (cardinality & Direction.EAST) legalDirections.push(Direction.EAST)
    if (cardinality & Direction.SOUTH) legalDirections.push(Direction.SOUTH)
    if (cardinality & Direction.WEST) legalDirections.push(Direction.WEST)

    const randomIndex = Math.round(Math.random() * legalDirections.length - 0.5)

    return legalDirections[randomIndex]
}

export const directionToMapOffset = {
    1: vec2(0, 1),
    2: vec2(1, 0),
    4: vec2(0, -1),
    8: vec2(-1, 0),
} as { [key in Direction]: Vector2 }

export const directionToWorld = {
    [Direction.NORTH]: vec4(0, 0, 1, 0),
    [Direction.EAST]: vec4(1, 0, 0, 0),
    [Direction.SOUTH]: vec4(0, 0, -1, 0),
    [Direction.WEST]: vec4(-1, 0, 0, 0),
} as { [key in Direction]: Vector4 }
