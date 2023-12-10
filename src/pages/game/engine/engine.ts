import { GameEngine } from "../interfaces"

export const setupEngine = async (): Promise<GameEngine> => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU(CANVAS_ID)

    const msaaSamples = 4
    const { multisample, msaaTexture } = generateMultisampleBuffer(
        device,
        canvas,
        canvasFormat,
        msaaSamples
    )
    const depthTexture = device.createTexture({
        size: { width: canvas.width, height: canvas.height },
        format: "depth24plus",
        sampleCount: msaaSamples,
        usage: GPUTextureUsage.RENDER_ATTACHMENT,
    })
    const depthStencil: GPUDepthStencilState = {
        depthWriteEnabled: true,
        depthCompare: "less",
        format: "depth24plus",
    }

    return {
        device,
        mainCanvas: {
            context,
            canvasFormat,
            depthData: { depthStencil, depthStencilTextureView: depthTexture.createView() },
            multisampleData: {
                multisample,
                msaaTextureView: msaaTexture.createView(),
            },
        },
    }
}
