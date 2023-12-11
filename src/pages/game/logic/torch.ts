import {
    Colors,
    Cube,
    add,
    createRotationMatrix,
    createRotationYMatrix,
    createScaleMatrix,
    createTranslateMatrix,
    flattenMatrices,
    flattenMatrix,
    flattenVector,
    multMatrices,
    scale,
    toVec3,
    vec2,
    vec3,
    vec4,
} from "../../../libs/util"
import { byteLength } from "../../../libs/util/byteLengths"
import {
    createBind,
    genreateIndexBuffer,
    genreateVertexBuffer,
    setupShaderPipeline,
} from "../../../libs/webgpu"
import {
    Light,
    Renderable,
    GameEngine,
    InstancedBufferedMesh,
    Tile,
    GamePlayer,
    GameLightData,
} from "../interfaces"

import torchShader from "../shaders/torch.wgsl?raw"
import { randomDirectionFromCardinality, directionToWorld, reverseDirection } from "./direction"
import { mapToWorld } from "./dungeon"
import { MAX_LIGHTS } from "./lights"
import { TILE_SIZE } from "./tile"

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

export const generateTorchesInstancedMesh = (
    { device }: GameEngine,
    lights: Light[]
): InstancedBufferedMesh => {
    const mesh = Cube(vec3(), 1)

    const uvs = [
        vec2(0, 0),
        vec2(0, 1),
        vec2(0, 1),
        vec2(0, 0),
        vec2(0, 0),
        vec2(0, 1),
        vec2(0, 1),
        vec2(0, 0),
    ]

    const modelMatrices = lights.map(l => {
        const worldPosition = createTranslateMatrix(
            toVec3(add(l.position, add(scale(l.direction, -0.05), vec4(0, -0.55, 0, 0))))
        )
        const rotation = multMatrices(
            createRotationYMatrix(90),
            createRotationMatrix(30, toVec3(l.direction))
        )
        const stretch = createScaleMatrix(0.1, 0.75, 0.1)

        return multMatrices(multMatrices(worldPosition, rotation), stretch)
    })

    const { buffer: indexBuffer } = genreateIndexBuffer(
        device,
        new Uint32Array(flattenVector(mesh.triangleIndices.map(v => toVec3(v))))
    )
    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateVertexBuffer(
        device,
        new Float32Array(flattenVector(mesh.vertices)),
        "float32x4"
    )
    const { buffer: normalsBuffer, bufferLayout: normalsBufferLayout } = genreateVertexBuffer(
        device,
        new Float32Array(flattenVector(mesh.normals)),
        "float32x4",
        1
    )
    const { buffer: uvsBuffer, bufferLayout: uvsBufferLayout } = genreateVertexBuffer(
        device,
        new Float32Array(flattenVector(uvs)),
        "float32x2",
        2
    )

    return {
        vertexBuffer,
        vertexBufferLayout,
        vertexCount: mesh.vertices.length,

        normalsBuffer,
        normalsBufferLayout,

        uvsBuffer,
        uvsBufferLayout,

        indexBuffer,
        triangleCount: mesh.triangleCount,

        instances: lights.length,
        modelMatrices,
    }
}

export const createTorchesRenderPass = (
    {
        device,
        mainCanvas: {
            context,
            canvasFormat,
            depthData: { depthStencil, depthStencilTextureView },
            multisampleData: { msaaTextureView, multisample },
        },
    }: GameEngine,
    {
        vertexBuffer,
        vertexBufferLayout,
        normalsBuffer,
        normalsBufferLayout,
        uvsBuffer,
        uvsBufferLayout,
        indexBuffer,
        triangleCount,
        instances,
        modelMatrices,
    }: InstancedBufferedMesh,
    { playerPerspectiveBuffer }: GamePlayer,
    { lightSourcesBuffer }: GameLightData
): Renderable => {
    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout, normalsBufferLayout!, uvsBufferLayout!],
        canvasFormat,
        torchShader,
        "triangle-list",
        { primitive: { frontFace: "ccw", cullMode: "back" }, depthStencil, multisample }
    )

    const modelMatricesArray = new Float32Array(flattenMatrices(modelMatrices))
    const modelMatricesBuffer = device.createBuffer({
        size: byteLength.float32x4x4 * MAX_LIGHTS,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })
    device.queue.writeBuffer(modelMatricesBuffer, 0, modelMatricesArray)

    const uniformBindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            {
                binding: 0,
                resource: { buffer: playerPerspectiveBuffer },
            },
            { binding: 1, resource: { buffer: modelMatricesBuffer } },
            { binding: 2, resource: { buffer: lightSourcesBuffer } },
        ],
    })

    const torchesRenderPass = (encoder: GPUCommandEncoder) => {
        const colorAttachment: GPURenderPassColorAttachment = {
            view: msaaTextureView,
            resolveTarget: context.getCurrentTexture().createView(),
            loadOp: "load",
            clearValue: Colors.black,
            storeOp: "store",
        }
        const pass = encoder.beginRenderPass({
            colorAttachments: [colorAttachment],
            depthStencilAttachment: {
                view: depthStencilTextureView,
                depthLoadOp: "load",
                depthClearValue: 1.0,
                depthStoreOp: "store",
            },
        })

        pass.setPipeline(pipeline)
        pass.setIndexBuffer(indexBuffer!, "uint32")
        pass.setVertexBuffer(0, vertexBuffer)
        pass.setVertexBuffer(1, normalsBuffer!)
        pass.setVertexBuffer(2, uvsBuffer!)
        pass.setBindGroup(0, uniformBindGroup)
        pass.drawIndexed(triangleCount! * 3, instances)

        pass.end()
    }

    return { pass: torchesRenderPass }
}
