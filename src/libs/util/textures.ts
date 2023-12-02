import { Vector, Vector2, Vector4 } from "../../types"
import { vec2 } from "."

export const readImageData = async (
    imageFilePath: string
): Promise<{ textureData: Uint8Array; height: number; width: number }> => {
    const img = document.createElement("img")
    img.src = imageFilePath
    await img.decode()

    const imageCanvas = document.createElement("canvas")
    imageCanvas.width = img.width
    imageCanvas.height = img.height
    const imageCanvasContext = imageCanvas.getContext("2d")

    if (!imageCanvasContext) throw new Error("Could not get canvas context")

    imageCanvasContext.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height)
    const imageData = imageCanvasContext.getImageData(0, 0, imageCanvas.width, imageCanvas.height)

    const textureData = new Uint8Array(img.width * img.height * 4)
    for (let i = 0; i < img.height; ++i)
        for (let j = 0; j < img.width; ++j)
            for (let k = 0; k < 4; ++k)
                textureData[(i * img.width + j) * 4 + k] =
                    imageData.data[((img.height - i - 1) * img.width + j) * 4 + k]

    return { textureData, height: img.height, width: img.width }
}

export const computeJitters = (canvasHeight: number, subdivisions: number): Vector2[] => {
    const pixelsize = 1 / canvasHeight
    const step = pixelsize / subdivisions

    if (subdivisions < 2) {
        return [vec2()]
    }

    const jitters = [] as Vector2[]

    for (var i = 0; i < subdivisions; ++i)
        for (var j = 0; j < subdivisions; ++j) {
            jitters.push(
                vec2(
                    (Math.random() + j) * step - pixelsize * 0.5,
                    (Math.random() + i) * step - pixelsize * 0.5
                )
            )
        }

    return jitters
}

export const checkerboardTexture = (
    texSize: number,
    checkerboardColumns: number,
    checkerboardRows: number
): Uint8Array => {
    const checkerboard = new Uint8Array(4 * texSize * texSize)

    for (let i = 0; i < texSize; ++i)
        for (let j = 0; j < texSize; ++j) {
            const patchx = Math.floor(i / (texSize / checkerboardRows))
            const patchy = Math.floor(j / (texSize / checkerboardColumns))
            const c = patchx % 2 !== patchy % 2 ? 255 : 0
            const idx = 4 * (i * texSize + j)
            checkerboard[idx] = checkerboard[idx + 1] = checkerboard[idx + 2] = c
            checkerboard[idx + 3] = 255
        }

    return checkerboard
}

// https://webgpufundamentals.org/webgpu/lessons/webgpu-textures.html
const createNextMipLevelRgba8Unorm = (
    { data: src, width: srcWidth, height: srcHeight }: Mip,
    applyLevelColorFilter: boolean = false
) => {
    // compute the size of the next mip
    const dstWidth = Math.max(1, (srcWidth / 2) | 0)
    const dstHeight = Math.max(1, (srcHeight / 2) | 0)
    const dst = new Uint8Array(dstWidth * dstHeight * 4)

    const getSrcPixel = (x: number, y: number): Uint8Array => {
        const offset = (y * srcWidth + x) * 4
        return src.subarray(offset, offset + 4)
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const mix = (a: Uint8Array, b: Uint8Array, t: number): Uint8Array =>
        a.map((v, i) => lerp(v, b[i], t)) as Uint8Array
    const bilinearFilter = (
        tl: Uint8Array,
        tr: Uint8Array,
        bl: Uint8Array,
        br: Uint8Array,
        t1: number,
        t2: number
    ) => {
        const t = mix(tl, tr, t1)
        const b = mix(bl, br, t1)
        return mix(t, b, t2)
    }

    for (let y = 0; y < dstHeight; ++y) {
        for (let x = 0; x < dstWidth; ++x) {
            // compute texcoord of the center of the destination texel
            const u = (x + 0.5) / dstWidth
            const v = (y + 0.5) / dstHeight

            // compute the same texcoord in the source - 0.5 a pixel
            const au = u * srcWidth - 0.5
            const av = v * srcHeight - 0.5

            // compute the src top left texel coord (not texcoord)
            const tx = au | 0
            const ty = av | 0

            // compute the mix amounts between pixels
            const t1 = au % 1
            const t2 = av % 1

            // get the 4 pixels
            const tl = getSrcPixel(tx, ty)
            const tr = getSrcPixel(tx + 1, ty)
            const bl = getSrcPixel(tx, ty + 1)
            const br = getSrcPixel(tx + 1, ty + 1)

            // copy the "sampled" result into the dest.
            const dstOffset = (y * dstWidth + x) * 4

            const filteredColor = bilinearFilter(tl, tr, bl, br, t1, t2)
            if (applyLevelColorFilter) filteredColor[0] = 6 * dstWidth

            dst.set(filteredColor, dstOffset)
        }
    }
    return { data: dst, width: dstWidth, height: dstHeight }
}

export interface Mip {
    data: Uint8Array
    width: number
    height: number
}

// https://webgpufundamentals.org/webgpu/lessons/webgpu-textures.html
export const generateMips = (src: Uint8Array, srcWidth: number, debug: boolean = false): Mip[] => {
    const srcHeight = src.length / 4 / srcWidth

    // populate with first mip level (base level)
    let mip = { data: src, width: srcWidth, height: srcHeight }
    const mips = [mip]

    while (mip.width > 1 || mip.height > 1) {
        mip = createNextMipLevelRgba8Unorm(mip, debug)
        mips.push(mip)
    }
    return mips
}

export const loadTexture = async (
    device: GPUDevice,
    filename: string
): Promise<{
    texture: GPUTexture
    sampler: GPUSampler
}> => {
    const response = await fetch(filename)
    const blob = await response.blob()
    const img = await createImageBitmap(blob, { colorSpaceConversion: "none" })
    const texture = device.createTexture({
        size: [img.width, img.height, 1],
        format: "rgba8unorm",
        usage:
            GPUTextureUsage.COPY_DST |
            GPUTextureUsage.TEXTURE_BINDING |
            GPUTextureUsage.RENDER_ATTACHMENT,
    })
    device.queue.copyExternalImageToTexture(
        { source: img, flipY: true },
        { texture: texture },
        { width: img.width, height: img.height }
    )
    const sampler = device.createSampler({
        addressModeU: "clamp-to-edge",
        addressModeV: "clamp-to-edge",
        minFilter: "nearest",
        magFilter: "nearest",
    })
    return { texture, sampler }
}
