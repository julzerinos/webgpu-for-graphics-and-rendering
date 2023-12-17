import {
    lookAtMatrix,
    toVec3,
    add,
    vec3,
    perspectiveProjection,
    multMatrices,
    flattenVector,
    flattenMatrix,
    flattenMatrices,
    identity4x4,
    createTranslateMatrix,
    Colors,
    nSmallestElementsIndices,
    sqrMagnitude,
    subtract,
    vec4,
} from "../../../../libs/util"
import { byteLength } from "../../../../libs/util/byteLengths"
import { createBind, writeToBufferF32 } from "../../../../libs/webgpu"
import { Matrix4x4, Vector3 } from "../../../../types"
import {
    Light,
    GameEngine,
    BufferedMesh,
    Renderable,
    GameLightData,
    isInstancedBufferedMesh,
} from "../interfaces"
import shaderCode from "../shaders/shadowMap.wgsl?raw"
import { TILE_SIZE } from "./tile"

const ACTIVE_LIGHTS = 4
export const MAX_LIGHTS = 30

export const createLightProjectionMatrix = (light: Light): Matrix4x4 => {
    const view = lookAtMatrix(
        toVec3(light.position),
        toVec3(add(light.position, light.direction)),
        vec3(0, 1, 0)
    )
    const perspective = perspectiveProjection(170, 5, 0.01, TILE_SIZE * 2)

    return multMatrices(perspective, view)
}

export const deactiveLight = (light: Light) => {
    light.active = false
    light.intensity = 0
}

export const activateLight = (light: Light) => {
    light.active = true
}

export const lightDataFlat = (lights: Light[]): Float32Array =>
    new Float32Array(
        lights.flatMap(l =>
            [
                flattenVector([l.position, l.direction]),
                flattenMatrix(createLightProjectionMatrix(l)),
                [...l.tint, l.intensity],
            ].flat()
        )
    )

export const createShadowMapPass = (
    { device }: GameEngine,
    lights: Light[],
    bufferedMeshes: BufferedMesh[]
): { renderable: Renderable; lightData: GameLightData } => {
    let largestBufferedMesh = bufferedMeshes.reduce(
        (max, bufferedMesh) => (max.vertexCount > bufferedMesh.vertexCount ? max : bufferedMesh),
        bufferedMeshes[0]
    )

    const shadowMapShaderModule = device.createShaderModule({
        code: shaderCode,
    })
    const dungeonShadowPipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
            module: shadowMapShaderModule,
            entryPoint: "main_vs",
            buffers: [largestBufferedMesh.vertexBufferLayout],
        },
        fragment: {
            module: shadowMapShaderModule,
            entryPoint: "main_fs",
            targets: [
                {
                    format: "rgba32float",
                },
            ],
        },
        primitive: { frontFace: "ccw", cullMode: "none", topology: "triangle-list" },
        depthStencil: {
            depthWriteEnabled: true,
            depthCompare: "less",
            format: "depth24plus",
        },
    })

    const depthTexture = device.createTexture({
        size: { width: 2048, height: 512, depthOrArrayLayers: lights.length },
        format: "depth24plus",
        usage: GPUTextureUsage.RENDER_ATTACHMENT,
    })

    const shadowMapTexture = device.createTexture({
        size: {
            width: 2048,
            height: 512,
            depthOrArrayLayers: lights.length,
        },

        dimension: "2d",
        format: "rgba32float",
        usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
    })

    const lightBindGroups = lights.map(
        l =>
            createBind(
                device,
                dungeonShadowPipeline,
                [new Float32Array(flattenMatrix(createLightProjectionMatrix(l)))],
                "UNIFORM",
                0
            ).bindGroup
    )

    const modelMatricesBindGroups = bufferedMeshes.map(bm => {
        const modelMatrices = isInstancedBufferedMesh(bm)
            ? new Float32Array(flattenMatrices(bm.modelMatrices))
            : new Float32Array(flattenMatrix(identity4x4()))

        return createBind(device, dungeonShadowPipeline, [modelMatrices], "STORAGE", 1).bindGroup
    })

    const { bindGroup: noJitterBind } = createBind(
        device,
        dungeonShadowPipeline,
        [new Float32Array(flattenMatrix(identity4x4()))],
        "UNIFORM",
        2
    )
    const {
        bindGroup: jitterMatrixBind,
        buffers: [jitterMatrixBuffer],
    } = createBind(
        device,
        dungeonShadowPipeline,
        [new Float32Array(flattenMatrix(identity4x4()))],
        "UNIFORM",
        2
    )
    const updateJitterTranslationMatrix = (time: number, frame: number) => {
        if (frame % 2 === 0) return

        const localTime = time / 1e3

        const jitter = createTranslateMatrix([
            0.01 * Math.sin(localTime) * Math.random(),
            0.01 * Math.sin(localTime) * Math.random(),
            0.01 * Math.sin(localTime) * Math.random(),
        ])
        writeToBufferF32(device, jitterMatrixBuffer, new Float32Array(flattenMatrix(jitter)), 0)
    }

    const executeShadowPass = (encoder: GPUCommandEncoder, time: number, frame: number) => {
        updateActiveLightFlicker(time)
        updateJitterTranslationMatrix(time, frame)

        for (let l = 0; l < lights.length; l++) {
            if (!activeLightIndices.includes(l)) continue

            const shadowMapPass = encoder.beginRenderPass({
                colorAttachments: [
                    {
                        view: shadowMapTexture.createView({
                            baseArrayLayer: l,
                            arrayLayerCount: 1,
                        }),
                        loadOp: "clear",
                        clearValue: Colors.black,
                        storeOp: "store",
                    },
                ],
                depthStencilAttachment: {
                    view: depthTexture.createView({
                        baseArrayLayer: l,
                        arrayLayerCount: 1,
                    }),
                    depthLoadOp: "clear",
                    depthStoreOp: "store",
                    depthClearValue: 1,
                },
            })

            shadowMapPass.setPipeline(dungeonShadowPipeline)
            shadowMapPass.setBindGroup(0, lightBindGroups[l])

            for (let bm = 0; bm < bufferedMeshes.length; bm++) {
                const bufferedMesh = bufferedMeshes[bm]

                shadowMapPass.setVertexBuffer(0, bufferedMesh.vertexBuffer)
                shadowMapPass.setBindGroup(1, modelMatricesBindGroups[bm])

                if (!bufferedMesh.indexBuffer || !bufferedMesh.triangleCount) {
                    shadowMapPass.setBindGroup(2, noJitterBind)
                    shadowMapPass.draw(bufferedMesh.vertexCount)
                    continue
                }

                shadowMapPass.setBindGroup(2, jitterMatrixBind)

                const instances = isInstancedBufferedMesh(bufferedMesh)
                    ? bufferedMesh.instances
                    : undefined

                shadowMapPass.setIndexBuffer(bufferedMesh.indexBuffer, "uint32")
                shadowMapPass.drawIndexed(bufferedMesh.triangleCount * 3, instances)
            }

            shadowMapPass.end()
        }
    }

    const activeLightsChangeListeners = [] as ((activeIndices: number[]) => void)[]
    let activeLightIndices = [] as number[]

    const activeLightIndicesBuffer = device.createBuffer({
        size: new Uint32Array(ACTIVE_LIGHTS).byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })

    if (lights.length > MAX_LIGHTS)
        console.warn("[initialization] number of lights larger than allowed limit")

    const lightSourcesBuffer = device.createBuffer({
        size:
            (byteLength.float32x4 * 2 + byteLength.float32x4x4 + byteLength.float32x4) * MAX_LIGHTS,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })
    device.queue.writeBuffer(lightSourcesBuffer, 0, lightDataFlat(lights))

    const onTileChange = (world: Vector3) => {
        activeLightIndices = nSmallestElementsIndices(
            lights.map(l => sqrMagnitude(subtract(l.position, vec4(...world, 1)))),
            ACTIVE_LIGHTS
        )
        device.queue.writeBuffer(activeLightIndicesBuffer, 0, new Uint32Array(activeLightIndices))

        for (const ali of activeLightIndices) activateLight(lights[ali])

        for (let l = 0; l < lights.length; l++)
            if (!activeLightIndices.includes(l)) {
                deactiveLight(lights[l])
                const byteOffset =
                    byteLength.float32x4 * 2 + byteLength.float32x4x4 + byteLength.float32x4
                writeToBufferF32(
                    device,
                    lightSourcesBuffer,
                    new Float32Array([0]),
                    byteOffset * l + byteOffset - byteLength.float32
                )
            }

        for (const l of activeLightsChangeListeners) l(activeLightIndices)
    }

    const updateActiveLightFlicker = (time: number) => {
        const nextFlickerIntensity = (previousIntensity: number): number => {
            if (previousIntensity < 6) return (previousIntensity += 0.1 * Math.random())

            return Math.sin(time / 1e4) * Math.random() + 6
        }

        const byteOffset = byteLength.float32x4 * 2 + byteLength.float32x4x4 + byteLength.float32x4
        for (const ali of activeLightIndices) {
            const light = lights[ali]
            light.intensity = nextFlickerIntensity(light.intensity)

            writeToBufferF32(
                device,
                lightSourcesBuffer,
                new Float32Array([light.intensity]),
                byteOffset * ali + byteOffset - byteLength.float32
            )
        }
    }

    return {
        renderable: { pass: executeShadowPass, onTileChange },
        lightData: {
            lights,
            shadowMapTexture,
            activeLightsChangeListeners,
            lightSourcesBuffer: lightSourcesBuffer,
            activeLightIndicesBuffer,
        },
    }
}
