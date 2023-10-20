export const writeToBufferF32 = (
    device: GPUDevice,
    buffer: GPUBuffer,
    array: Float32Array,
    bytesOffset: number,
    fillRemainder: boolean = false
) => {
    if (fillRemainder) {
        const pre = new Float32Array(bytesOffset / Float32Array.BYTES_PER_ELEMENT)
        const post = new Float32Array(
            (buffer.size - array.byteLength - pre.byteLength) / Float32Array.BYTES_PER_ELEMENT
        )

        array = new Float32Array([...pre, ...array, ...post])
        bytesOffset = 0
    }

    device.queue.writeBuffer(buffer, bytesOffset, array)
}

// buffer.size -> bytes
// writeBuffer(..., offset, ...) -> elements if data is a TypedArray and bytes otherwise
// new Uint32Array(length) -> length in elements

export const writeToBufferU32 = (
    device: GPUDevice,
    buffer: GPUBuffer,
    array: Uint32Array,
    bytesOffset: number,
    fillRemainder: boolean = false
) => {
    if (fillRemainder) {
        const pre = new Uint32Array(bytesOffset / Float32Array.BYTES_PER_ELEMENT)
        const post = new Uint32Array(
            (buffer.size - array.byteLength - pre.byteLength) / Uint32Array.BYTES_PER_ELEMENT
        )

        array = new Uint32Array([...pre, ...array, ...post])
        bytesOffset = 0
    }

    device.queue.writeBuffer(buffer, bytesOffset, array)
}
