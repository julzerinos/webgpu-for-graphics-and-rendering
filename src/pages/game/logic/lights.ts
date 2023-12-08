import {
    Colors,
    add,
    flattenMatrix,
    flattenVector,
    identity4x4,
    lookAtMatrix,
    mat4,
    multMatrices,
    perspectiveProjection,
    toVec3,
    vec3,
    vec4,
} from "../../../libs/util"
import { Matrix4x4, Vector4 } from "../../../types"
import { Light, Mesh, Renderable, ShadowMapPass } from "../interfaces"
import { mapToWorld } from "./dungeon"
import { Direction, TILE_SIZE, Tile, TileType } from "./tile"

import shaderCode from "../shaders/shadowMap.wgsl?raw"
import { createBind, genreateVertexBuffer } from "../../../libs/webgpu"

export const defineLightsFromTiles = (tiles: Tile[]): Light[] =>
    tiles
        .filter(t => t.type === TileType.LIGHT)
        .flatMap(lt => {
            const ls = []
            const halfSize = TILE_SIZE / 2 - 0.05
            const worldPosition = mapToWorld(lt.position)
            if (!(lt.cardinality & Direction.NORTH)) {
                ls.push({
                    direction: vec4(0, 0, -1, 0),
                    position: vec4(...add(vec3(0, 0, halfSize), worldPosition), 1),
                })
            }
            if (!(lt.cardinality & Direction.EAST)) {
                ls.push({
                    direction: vec4(-1, 0, 0, 0),
                    position: vec4(...add(vec3(halfSize, 0, 0), worldPosition), 1),
                })
            }
            if (!(lt.cardinality & Direction.SOUTH)) {
                ls.push({
                    direction: vec4(0, 0, 1, 0),
                    position: vec4(...add(vec3(0, 0, -halfSize), worldPosition), 1),
                })
            }
            if (!(lt.cardinality & Direction.WEST)) {
                ls.push({
                    direction: vec4(1, 0, 0, 0),
                    position: vec4(...add(vec3(-halfSize, 0, 0), worldPosition), 1),
                })
            }
            return ls
        })

export const createLightProjectionMatrix = (light: Light): Matrix4x4 => {
    const view = lookAtMatrix(
        toVec3(light.position),
        toVec3(add(light.position, light.direction)),
        vec3(0, 1, 0)
    )
    const perspective = perspectiveProjection(170, 1, 0.001, 50)

    return multMatrices(perspective, view)
}

export const shadowMapGenerationAllLights = (
    device: GPUDevice,
    tiles: Tile[],
    dungeon: Mesh
): ShadowMapPass[] => {
    const { buffer, bufferLayout } = genreateVertexBuffer(device, dungeon.vertices, "float32x4", 0)
    const lights = defineLightsFromTiles(tiles)

    return lights.map(l =>
        shadowMapGenerationPassForLight(
            l,
            device,
            buffer,
            bufferLayout,
            dungeon.vertices.length / 4
        )
    )
}

export const shadowMapGenerationPassForLight = (
    light: Light,
    device: GPUDevice,
    vertexBuffer: GPUBuffer,
    vertexBufferLayout: GPUVertexBufferLayout,
    drawCount: number
): ShadowMapPass => {
    const shadowMapShaderModule = device.createShaderModule({
        code: shaderCode,
    })
    const pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
            module: shadowMapShaderModule,
            entryPoint: "main_vs",
            buffers: [vertexBufferLayout],
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
        primitive: { cullMode: "back", topology: "triangle-list" },
        depthStencil: {
            depthWriteEnabled: true,
            depthCompare: "less",
            format: "depth24plus",
        },
    })

    const depthTexture = device.createTexture({
        size: { width: 512, height: 512 },
        format: "depth24plus",
        usage: GPUTextureUsage.RENDER_ATTACHMENT,
    })

    const shadowMapTexture = device.createTexture({
        size: {
            width: 512,
            height: 512,
            depthOrArrayLayers: 1,
        },
        mipLevelCount: 1,
        sampleCount: 1,
        dimension: "2d",
        format: "rgba32float",
        usage:
            GPUTextureUsage.RENDER_ATTACHMENT |
            GPUTextureUsage.TEXTURE_BINDING |
            GPUTextureUsage.COPY_SRC,
    })
    const shadowMapTextureView = shadowMapTexture.createView()

    const {
        bindGroup: shadowUniformBind,
        // buffers: [shadowPassProjectionViewMatrixBuffer],
    } = createBind(
        device,
        pipeline,
        [new Float32Array(flattenMatrix(createLightProjectionMatrix(light)))],
        "UNIFORM",
        0
    )

    const executeShadowPass = (encoder: GPUCommandEncoder) => {
        const shadowMapPass = encoder.beginRenderPass({
            colorAttachments: [
                {
                    view: shadowMapTextureView,
                    loadOp: "clear",
                    clearValue: Colors.black,
                    storeOp: "store",
                },
            ],
            depthStencilAttachment: {
                view: depthTexture.createView(),
                depthLoadOp: "clear",
                depthStoreOp: "store",
                depthClearValue: 1.,
            },
        })

        shadowMapPass.setPipeline(pipeline)
        shadowMapPass.setVertexBuffer(0, vertexBuffer)
        shadowMapPass.setBindGroup(0, shadowUniformBind)
        shadowMapPass.draw(drawCount)

        shadowMapPass.end()
    }

    return { pass: executeShadowPass, textureView: shadowMapTextureView, light }
}
