export const interleaveF32s = (arrays: [Float32Array, Float32Array, ...Float32Array[]]) => {
    const totalLength = arrays.reduce((totalLength, arr) => totalLength + arr.length, 0)

    const interleaved = new Float32Array(totalLength)
    for (let i = 0; i < Math.max(...arrays.map(a => a.length)); i += 4) {
        for (let j = 0; j < arrays.length; j++)
            if (i < arrays[j].length)
                for (let k = 0; k < 4; k++)
                    interleaved[i * arrays.length + j * 4 + k] = arrays[j][i + k]
    }

    return interleaved
}

export const shiftIntoU32InPlace = (
    intoArray: Uint32Array,
    fromArray: Uint32Array,
    shiftIntoEveryNth: number
) => {
    for (let i = 0; i < fromArray.length; i++) intoArray[shiftIntoEveryNth * i + 3] = fromArray[i]
}
