export const nSmallestElementsIndices = (array: number[], n: number): number[] => {
    const smallestIndices = [] as number[]

    for (let i = 0; i < array.length; i++) {
        const candidate = array[i]

        for (let j = 0; j < n; j++) {
            const nextSmallestIndex = smallestIndices[j]

            if (nextSmallestIndex !== undefined && array[nextSmallestIndex] < candidate) continue

            smallestIndices.splice(j, 0, i)

            break
        }
    }

    return smallestIndices.slice(0, n)
}
