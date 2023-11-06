import { VectorFormat } from "../../types"
import { Mip } from "../util"
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
    color: GPUColor = { r: 0, g: 0, b: 0, a: 1 },
    {
        msaaTexture,
        depthStencilAttachmentFactory,
        otherColorAttachments,
    }: {
        msaaTexture?: GPUTexture
        depthStencilAttachmentFactory?: () => GPURenderPassDepthStencilAttachment
        otherColorAttachments: GPURenderPassColorAttachment[]
    } = { otherColorAttachments: [] }
) => {
    const colorAttachment: GPURenderPassColorAttachment = {
        view: msaaTexture ? msaaTexture.createView() : context.getCurrentTexture().createView(),
        resolveTarget: msaaTexture ? context.getCurrentTexture().createView() : undefined,
        loadOp: "clear",
        clearValue: color,
        storeOp: "store",
    }

    const encoder = device.createCommandEncoder()
    const pass = encoder.beginRenderPass({
        colorAttachments: [colorAttachment, ...otherColorAttachments],
        depthStencilAttachment: (depthStencilAttachmentFactory ?? (() => undefined))(),
    })

    const executePass = () => {
        pass.end()
        device.queue.submit([encoder.finish()])
    }

    return { pass, executePass, encoder }
}

export const setupShaderPipeline = (
    device: GPUDevice,
    bufferLayouts: GPUVertexBufferLayout[],
    canvasFormat: GPUTextureFormat,
    shaderCode: string,
    topology: GPUPrimitiveTopology = "triangle-list",
    additionalOpts?: Partial<GPURenderPipelineDescriptor>,
    { fragmentOverrides }: { fragmentOverrides?: Partial<GPUFragmentState> } = {}
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
            ...fragmentOverrides,
        },
        ...additionalOpts,
        primitive: {
            topology,
            frontFace: "ccw",
            cullMode: "back",
            ...additionalOpts?.primitive,
        },
    })

    return pipeline
}

export const generateDepthBuffer = (
    device: GPUDevice,
    canvas: HTMLCanvasElement,
    msaaCount: number
) => {
    let depthTexture: GPUTexture
    const createDepthTexture = () => {
        depthTexture = device.createTexture({
            size: { width: canvas.width, height: canvas.height },
            format: "depth24plus",
            sampleCount: msaaCount,
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
        })
    }
    const depthStencil: GPUDepthStencilState = {
        depthWriteEnabled: true,
        depthCompare: "less",
        format: "depth24plus",
    }

    const depthStencilAttachmentFactory: () => GPURenderPassDepthStencilAttachment = () => {
        if (!depthTexture) createDepthTexture()
        return {
            view: depthTexture.createView(),
            depthLoadOp: "clear",
            depthClearValue: 1.0,
            depthStoreOp: "store",
        }
    }

    return { createDepthTexture, depthStencil, depthStencilAttachmentFactory }
}

export const generateMultisampleBuffer = (
    device: GPUDevice,
    canvas: HTMLCanvasElement,
    canvasFormat: GPUTextureFormat,
    msaaCount: 4 | 8
) => {
    const msaaTexture = device.createTexture({
        size: { width: canvas.width, height: canvas.height },
        format: canvasFormat,
        sampleCount: msaaCount,
        usage: GPUTextureUsage.RENDER_ATTACHMENT,
    })
    const multisample: GPUMultisampleState = {
        count: msaaCount,
    }

    return { msaaTexture, multisample }
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

// export const createUniformBind = (
//     device: GPUDevice,
//     pipeline: GPURenderPipeline,
//     array: Array<Float32Array | Int32Array | Uint32Array>,
//     groupIndex: number = 0
// ): { bindGroup: GPUBindGroup; uniformBuffer: GPUBuffer } => {
//     const uniformBuffer = device.createBuffer({
//         size: array.byteLength,
//         usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
//     })

//     const bindGroup = device.createBindGroup({
//         layout: pipeline.getBindGroupLayout(groupIndex),
//         entries: [
//             {
//                 binding: 0,
//                 resource: { buffer: uniformBuffer },
//             },
//         ],
//     })
//     device.queue.writeBuffer(uniformBuffer, 0, array)

//     return { bindGroup, uniformBuffer }
// }

export const createBind = (
    device: GPUDevice,
    pipeline: GPURenderPipeline,
    arrays: Array<Float32Array | Uint32Array>,
    type: "STORAGE" | "UNIFORM",
    groupIndex: number = 0
): { buffers: GPUBuffer[]; bindGroup: GPUBindGroup } => {
    const buffers = arrays.map(a => {
        const buffer = device.createBuffer({
            size: a.byteLength,
            usage: GPUBufferUsage[type] | GPUBufferUsage.COPY_DST,
        })
        device.queue.writeBuffer(buffer, 0, a)
        return buffer
    })

    const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(groupIndex),
        entries: buffers.map((b, i) => ({
            binding: i,
            resource: { buffer: b },
        })),
    })

    return { buffers, bindGroup }
}

export const createTextureBind = (
    device: GPUDevice,
    pipeline: GPURenderPipeline,
    texture: GPUTexture,
    sampler: GPUSampler,
    groupIndex: number = 0,
    { createViewOverwrite }: { createViewOverwrite?: GPUTextureViewDescriptor } = {}
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
                resource: texture.createView(createViewOverwrite),
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
    samplerOverwrites?: Partial<GPUSamplerDescriptor>,
    { mips }: { mips?: Mip[] } = {}
): { texture: GPUTexture; sampler: GPUSampler } => {
    const texture = device.createTexture({
        size: [width, height, 1],
        format: "rgba8unorm",
        usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.TEXTURE_BINDING,
        mipLevelCount: mips ? mips.length : undefined,
    })

    const textures = mips ? mips : [{ data: textureData, width, height }]

    textures.forEach(({ data, width, height }, mipLevel) => {
        device.queue.writeTexture(
            { texture, mipLevel },
            data,
            { bytesPerRow: width * 4 },
            { width, height }
        )
    })

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

// https://webgpu.github.io/webgpu-samples/samples/cubemap#main.ts
export const generateCubeMap = (
    device: GPUDevice,
    imagesData: [Uint8Array, Uint8Array, Uint8Array, Uint8Array, Uint8Array, Uint8Array],
    width: number,
    height: number
) => {
    const cubemapTexture = device.createTexture({
        dimension: "2d",
        // Create a 2d array texture.
        // Assume each image has the same size.
        size: [width, height, 6],
        format: "rgba8unorm",
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST, // | GPUTextureUsage.RENDER_ATTACHMENT,
    })

    for (let i = 0; i < imagesData.length; i++) {
        device.queue.writeTexture(
            { texture: cubemapTexture, origin: [0, 0, i] },
            imagesData[i],
            { bytesPerRow: width * 4 },
            [width, height]
        )
    }

    const sampler = device.createSampler({
        magFilter: "linear",
        minFilter: "linear",
    })

    return { cubemapTexture, sampler }
}

export const generatePingPongTextures = (device: GPUDevice, canvas: HTMLCanvasElement) => {
    // textures.width = canvas.width;
    // textures.height = canvas.height;
    const renderSrc = device.createTexture({
        size: [canvas.width, canvas.height],
        usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,
        format: "rgba32float",
    })
    const renderDst = device.createTexture({
        size: [canvas.width, canvas.height],
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
        format: "rgba32float",
    })

    const blitPingPong = (encoder: GPUCommandEncoder) =>
        encoder.copyTextureToTexture({ texture: renderSrc }, { texture: renderDst }, [
            canvas.width,
            canvas.height,
        ])

    return { renderDst, renderSrc, blitPingPong }
}
