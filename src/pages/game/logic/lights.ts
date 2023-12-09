import {
    Colors,
    Cube,
    add,
    createScaleMatrix,
    createTranslateMatrix,
    flattenMatrix,
    flattenVector,
    lookAtMatrix,
    multMatrices,
    perspectiveProjection,
    toVec3,
    vec3,
    vec4,
    vectorMatrixMult,
} from "../../../libs/util"
import { Matrix4x4, Vector3 } from "../../../types"
import { Light, Mesh, ShadowMapPass } from "../interfaces"
import { mapToWorld } from "./dungeon"
import { Direction, TILE_SIZE, Tile, TileType } from "./tile"

import shaderCode from "../shaders/shadowMap.wgsl?raw"
import {
    createBind,
    genreateIndexBuffer,
    genreateVertexBuffer,
    writeToBufferF32,
} from "../../../libs/webgpu"

export const defineLightsFromTiles = (tiles: Tile[]): Light[] =>
    tiles
        .filter(t => t.type === TileType.LIGHT)
        .flatMap(lt => {
            const ls = []
            const halfSize = TILE_SIZE / 2 - 0.1
            const worldPosition = mapToWorld(lt.position)
            if (!(lt.cardinality & Direction.NORTH)) {
                ls.push({
                    direction: vec4(0, 0, -1, 0),
                    position: vec4(...add(vec3(0, 0.3, halfSize), worldPosition), 1),
                    intensity: 0,
                })
            }
            // if (!(lt.cardinality & Direction.EAST)) {
            //     ls.push({
            //         direction: vec4(-1, 0, 0, 0),
            //         position: vec4(...add(vec3(halfSize, 0, 0), worldPosition), 1),
            //     })
            // }
            // if (!(lt.cardinality & Direction.SOUTH)) {
            //     ls.push({
            //         direction: vec4(0, 0, 1, 0),
            //         position: vec4(...add(vec3(0, 0, -halfSize), worldPosition), 1),
            //     })
            // }
            // if (!(lt.cardinality & Direction.WEST)) {
            //     ls.push({
            //         direction: vec4(1, 0, 0, 0),
            //         position: vec4(...add(vec3(-halfSize, 0, 0), worldPosition), 1),
            //     })
            // }
            return ls
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
    const playerPlaceholder = Cube(vec3(0, 0, 0), 1)

    const { buffer: playerVertexBuffer } = genreateVertexBuffer(
        device,
        new Float32Array(flattenVector(playerPlaceholder.vertices)),
        "float32x4",
        0
    )
    const { buffer: playerIndexBuffer } = genreateIndexBuffer(
        device,
        new Uint32Array(flattenVector(playerPlaceholder.triangleIndices.map(f => toVec3(f))))
    )

    const onPlayerMove = (position: Vector3) => {
        const translation = createTranslateMatrix(add(position, vec3(0, -0.5, 0)))
        const scale = createScaleMatrix(1, 2, 1)
        const model = multMatrices(translation, scale)
        writeToBufferF32(
            device,
            playerVertexBuffer,
            new Float32Array(
                flattenVector(playerPlaceholder.vertices.map(v => vectorMatrixMult(v, model)))
            ),
            0
        )
    }

    const shadowMapShaderModule = device.createShaderModule({
        code: shaderCode,
    })
    const dungeonShadowPipeline = device.createRenderPipeline({
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
        primitive: { frontFace: "ccw", cullMode: "none", topology: "triangle-list" },
        depthStencil: {
            depthWriteEnabled: true,
            depthCompare: "less",
            format: "depth24plus",
        },
    })

    const depthTexture = device.createTexture({
        size: { width: 2048, height: 512 },
        format: "depth24plus",
        usage: GPUTextureUsage.RENDER_ATTACHMENT,
    })

    const shadowMapTexture = device.createTexture({
        size: {
            width: 2048,
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
        dungeonShadowPipeline,
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
                depthClearValue: 1,
            },
        })

        shadowMapPass.setPipeline(dungeonShadowPipeline)
        shadowMapPass.setBindGroup(0, shadowUniformBind)

        shadowMapPass.setVertexBuffer(0, vertexBuffer)
        shadowMapPass.draw(drawCount)

        shadowMapPass.setVertexBuffer(0, playerVertexBuffer)
        shadowMapPass.setIndexBuffer(playerIndexBuffer, "uint32")
        shadowMapPass.drawIndexed(playerPlaceholder.triangleCount)

        shadowMapPass.end()
    }

    return { pass: executeShadowPass, texture: shadowMapTexture, light, onPlayerMove }
}
