import { clamp } from "../../../../libs/util"
import { pointerLockCanvas } from "../../../../libs/web"
import { initializeWebGPU, generateMultisampleBuffer } from "../../../../libs/webgpu"
import { GameEngine } from "../interfaces"

export const setupEngine = async (): Promise<GameEngine> => {
    const { device, context, canvasFormat, canvas } = await initializeWebGPU("game")

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

    const onMouseMoveListeners = [] as ((dx: number, dy: number) => void)[]

    const onMouseMove = (dx: number, dy: number) => {
        const maxFrameDisplacement = 36

        dx = clamp(dx, -maxFrameDisplacement, maxFrameDisplacement)
        dy = clamp(dy, -maxFrameDisplacement, maxFrameDisplacement)

        for (const l of onMouseMoveListeners) l(dx, dy)
    }

    let inGame = false
    const { keyMap } = pointerLockCanvas("game", onMouseMove, {
        onStart: () => (inGame = true),
        onEnd: () => (inGame = false),
    })

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
        input: {
            keyMap,
            mouseMoveListeners: onMouseMoveListeners,
            inGame,
        },
    }
}
