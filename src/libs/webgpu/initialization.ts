import { VectorFormat } from "../../types"
import { vectorByteLength } from "../util/vector"

export const initializeWebGPU = async (canvasId: string) => {
    if (!navigator.gpu) window.alert("WebGPU is not enabled for this browser.")

    const gpu = navigator.gpu
    const adapter = await gpu.requestAdapter()

    if (!adapter) throw new Error("Could not initialize GPU adapter.")

    const device = await adapter.requestDevice()
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement

    if (!canvas) throw new Error(`Could not find canvas with id ${canvasId}`)

    const context = (canvas.getContext("gpupresent") ||
        canvas.getContext("webgpu")) as GPUCanvasContext

    if (!context) throw new Error("Could not generate context for canvas.")

    const canvasFormat = navigator.gpu.getPreferredCanvasFormat()

    context.configure({
        device: device,
        format: canvasFormat,
    })

    return {
        adapter,
        device,
        canvas,
        canvasFormat,
        context,
    }
}

export const createPass = (
    device: GPUDevice,
    context: GPUCanvasContext,
    color: GPUColor = { r: 0, g: 0, b: 0, a: 1 }
) => {
    const encoder = device.createCommandEncoder()
    const pass = encoder.beginRenderPass({
        colorAttachments: [
            {
                view: context.getCurrentTexture().createView(),
                loadOp: "clear",
                clearValue: color,
                storeOp: "store",
            },
        ],
    })

    const executePass = () => {
        pass.end()
        device.queue.submit([encoder.finish()])
    }

    return { pass, executePass }
}

export const setupShaderPipeline = (
    device: GPUDevice,
    bufferLayouts: GPUVertexBufferLayout[],
    canvasFormat: GPUTextureFormat,
    shaderCode: string,
    topology: GPUPrimitiveTopology = "triangle-list"
): GPURenderPipeline => {
    const wgsl = device.createShaderModule({
        code: shaderCode,
    })
    const pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
            module: wgsl,
            entryPoint: "main_vs",
            buffers: bufferLayouts,
        },
        fragment: {
            module: wgsl,
            entryPoint: "main_fs",
            targets: [{ format: canvasFormat }],
        },
        primitive: {
            topology,
        },
    })

    return pipeline
}

export const genreateVertexBuffer = (
    device: GPUDevice,
    array: Float32Array,
    format: VectorFormat,
    shaderLocation: number = 0,
    usage: GPUBufferUsageFlags = GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
) => {
    const buffer = device.createBuffer({
        size: array.byteLength,
        usage,
    })

    const bufferLayout: GPUVertexBufferLayout = {
        arrayStride: vectorByteLength[format],
        attributes: [
            {
                format,
                offset: 0,
                shaderLocation,
            },
        ],
    }

    device.queue.writeBuffer(buffer, 0, array)
    return { bufferLayout, buffer }
}

export const genreateIndexBuffer = (
    device: GPUDevice,
    array: Uint32Array,
    usage: GPUBufferUsageFlags = GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST
) => {
    const buffer = device.createBuffer({
        size: array.byteLength,
        usage,
    })

    device.queue.writeBuffer(buffer, 0, array)
    return { buffer }
}

export const createUniformBind = (
    device: GPUDevice,
    pipeline: GPURenderPipeline,
    array: Float32Array,
    groupIndex: number = 0
): GPUBindGroup => {
    const uniformBuffer = device.createBuffer({
        size: array.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })
    const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(groupIndex),
        entries: [
            {
                binding: 0,
                resource: { buffer: uniformBuffer },
            },
        ],
    })
    device.queue.writeBuffer(uniformBuffer, 0, array)

    return bindGroup
}

export const createTextureBind = (
    device: GPUDevice,
    pipeline: GPURenderPipeline,
    texture: GPUTexture,
    sampler: GPUSampler,
    groupIndex: number = 0
): GPUBindGroup => {
    const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(groupIndex),
        entries: [
            {
                binding: 0,
                resource: sampler,
            },
            {
                binding: 1,
                resource: texture.createView(),
            },
        ],
    })

    return bindGroup
}

export const generateTexture = (
    device: GPUDevice,
    textureData: Uint8Array,
    width: number,
    height: number,
    samplerOverwrites?: Partial<GPUSamplerDescriptor>
): { texture: GPUTexture; sampler: GPUSampler } => {
    const texture = device.createTexture({
        size: [width, height, 1],
        format: "rgba8unorm",
        usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.TEXTURE_BINDING,
    })

    device.queue.writeTexture(
        { texture: texture },
        textureData,
        { offset: 0, bytesPerRow: width * 4, rowsPerImage: height },
        [width, height, 1]
    )

    const sampler = device.createSampler({
        addressModeU: "repeat",
        addressModeV: "repeat",
        magFilter: "linear",
        minFilter: "linear",
        mipmapFilter: "linear",
        ...samplerOverwrites,
    })

    return { texture, sampler }
}
