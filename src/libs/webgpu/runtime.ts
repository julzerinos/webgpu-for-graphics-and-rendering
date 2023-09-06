export const writeToBuffer = (
    device: GPUDevice,
    buffer: GPUBuffer,
    array: Float32Array,
    offset: number
) => {
    device.queue.writeBuffer(buffer, offset, array)
}
