import { Vector2 } from "../../types"
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
