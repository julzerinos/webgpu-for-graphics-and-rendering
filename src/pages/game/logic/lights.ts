import {
    Colors,
    add,
    flattenMatrix,
    flattenVector,
    lookAtMatrix,
    multMatrices,
    nSmallestElementsIndices,
    perspectiveProjection,
    scale,
    sqrMagnitude,
    subtract,
    toVec3,
    vec3,
    vec4,
} from "../../../libs/util"
import { Matrix4x4, Vector3, Vector4 } from "../../../types"
import { BufferedMesh, GameEngine, GameLightData, Light, Renderable, Tile } from "../interfaces"
import { mapToWorld } from "./dungeon"
import { TILE_SIZE } from "./tile"

import shaderCode from "../shaders/shadowMap.wgsl?raw"
import { createBind, writeToBufferF32 } from "../../../libs/webgpu"
import { byteLength } from "../../../libs/util/byteLengths"
import { directionToWorld, randomDirectionFromCardinality, reverseDirection } from "./direction"
import { snapshotObject } from "../../../libs/util/javascript"

const ACTIVE_LIGHTS = 4
const MAX_LIGHTS = 30

export const dungeonTileLight = (t: Tile): Light => {
    const halfSize = TILE_SIZE / 2 - 0.1

    const lightWallDirection = randomDirectionFromCardinality(~t.cardinality & 15)
    const direction = directionToWorld[lightWallDirection]

    const tileWorld = mapToWorld(t.position)
    const lightPosition = add(vec4(...add(vec3(0, 0, 0), tileWorld), 1), scale(direction, halfSize))

    return {
        direction: directionToWorld[reverseDirection[lightWallDirection]],
        position: lightPosition,
        intensity: 0,
        tint: vec3(0.9, 0.4, 0),
        active: false,
    }
}

export const portalLight = (position: Vector4, direction: Vector4): Light => ({
    direction: direction,
    position: position,
    intensity: 4,
    tint: vec3(35 / 100, 50 / 100, 9 / 100),
    active: false,
})

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

    const executeShadowPass = (encoder: GPUCommandEncoder, time: number) => {
        updateActiveLightFlicker(time)

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

            for (const bm of bufferedMeshes) {
                shadowMapPass.setVertexBuffer(0, bm.vertexBuffer)

                if (!bm.indexBuffer || !bm.triangleCount) {
                    shadowMapPass.draw(bm.vertexCount)
                    continue
                }

                shadowMapPass.setIndexBuffer(bm.indexBuffer, "uint32")
                shadowMapPass.drawIndexed(bm.triangleCount)
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

        console.log(activeLightIndices)

        for (const ali of activeLightIndices) activateLight(lights[ali])

        for (let l = 0; l < lights.length; l++)
            if (!activeLightIndices.includes(l)) deactiveLight(lights[l])

        for (const l of activeLightsChangeListeners) l(activeLightIndices)
    }

    const updateActiveLightFlicker = (time: number) => {
        const nextFlickerIntensity = (previousIntensity: number): number => {
            if (previousIntensity < 6) return (previousIntensity += 0.1 * Math.random())

            return Math.abs(Math.sin(time / 3e3)) * Math.random() + 6
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
