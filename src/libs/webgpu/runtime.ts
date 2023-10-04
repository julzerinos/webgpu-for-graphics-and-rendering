export const writeToBuffer = (
    device: GPUDevice,
    buffer: GPUBuffer,
    array: Float32Array,
    offset: number,
    fillRemainder?: number
) => {
    if (fillRemainder) {
        const pre = new Float32Array(offset)
        const post = new Float32Array(buffer.size - (offset + array.byteLength))

        array = new Float32Array([...pre, ...array, ...post])
    }

    device.queue.writeBuffer(buffer, offset, array)
}
