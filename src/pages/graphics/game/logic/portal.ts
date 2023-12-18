import {
    vec3,
    vec4,
    scale,
    vectorMatrixMult,
    createRotationYMatrix,
    flattenVector,
    vec2,
    add,
    createTranslateMatrix,
    toVec3,
    loadTexture,
    flattenMatrix,
} from "../../../../libs/util"
import { asset } from "../../../../libs/web"
import {
    genreateIndexBuffer,
    genreateVertexBuffer,
    setupShaderPipeline,
    createTextureBind,
    writeToBufferF32,
} from "../../../../libs/webgpu"
import { Vector4 } from "../../../../types"
import { Light, Tile, Mesh, Direction, GameEngine, GamePlayer, Renderable } from "../interfaces"
import portalShader from "../shaders/portal.wgsl?raw"
import { randomDirectionFromCardinality, directionToWorld } from "./direction"
import { mapToWorld } from "./dungeon"
import { TILE_SIZE } from "./tile"

export const portalLight = (position: Vector4, direction: Vector4): Light => ({
    direction: direction,
    position: position,
    intensity: 4,
    tint: vec3(35 / 100, 50 / 100, 9 / 100),
    active: false,
})

export const generatePortalMesh = (tile: Tile): Mesh => {
    const world = vec4(...mapToWorld(tile.position), 0)

    const direction = randomDirectionFromCardinality(tile.cardinality)
    const worldDirection = directionToWorld[direction]
    const halfSize = 2
    const depthOffset = scale(worldDirection, TILE_SIZE / 2 - 0.1)

    let vertices = [
        vec4(-halfSize, halfSize, 0, 1),
        vec4(-halfSize, -halfSize, 0, 1),
        vec4(halfSize, -halfSize, 0, 1),
        vec4(halfSize, halfSize, 0, 1),
    ]
    if (direction === Direction.EAST || direction === Direction.WEST)
        vertices = vertices.map(v => vectorMatrixMult(v, createRotationYMatrix(90)))

    const triangles = new Uint32Array(flattenVector([vec3(0, 1, 3), vec3(3, 1, 2)]))
    const uvs = new Float32Array(flattenVector([vec2(0, 0), vec2(0, 1), vec2(1, 1), vec2(1, 0)]))
    const normals = new Float32Array(
        flattenVector([worldDirection, worldDirection, worldDirection, worldDirection])
    )

    return {
        vertices: new Float32Array(flattenVector(vertices)),
        triangles,
        uvs,
        normals,
        lights: [portalLight(add(world, depthOffset), worldDirection)],
        modelMatrix: createTranslateMatrix(toVec3(add(world, depthOffset))),
    }
}

export const createPortalRender = async (
    {
        device,
        mainCanvas: {
            context,
            canvasFormat,
            depthData: { depthStencil, depthStencilTextureView },
            multisampleData: { msaaTextureView, multisample },
        },
    }: GameEngine,
    portalMesh: Mesh,
    { playerPerspectiveBuffer }: GamePlayer
): Promise<Renderable> => {
    const { texture, sampler } = await loadTexture(device, asset("game/portal.png"))

    const { buffer: indexBuffer } = genreateIndexBuffer(device, portalMesh.triangles!)
    const { buffer: vertexBuffer, bufferLayout: vertexBufferLayout } = genreateVertexBuffer(
        device,
        portalMesh.vertices,
        "float32x4"
    )
    const { buffer: normalBuffer, bufferLayout: normalBufferLayout } = genreateVertexBuffer(
        device,
        portalMesh.normals,
        "float32x4",
        1
    )
    const { buffer: uvBuffer, bufferLayout: uvBufferLayout } = genreateVertexBuffer(
        device,
        portalMesh.uvs,
        "float32x2",
        2
    )

    const pipeline = setupShaderPipeline(
        device,
        [vertexBufferLayout, normalBufferLayout, uvBufferLayout],
        canvasFormat,
        portalShader,
        "triangle-list",
        { primitive: { frontFace: "ccw", cullMode: "none" }, depthStencil, multisample },
        {
            blend: {
                color: {
                    operation: "add",
                    srcFactor: "src-alpha",
                    dstFactor: "one-minus-src-alpha",
                },
                alpha: { operation: "add", srcFactor: "one", dstFactor: "zero" },
            },
        }
    )

    const modelMatrix = new Float32Array(flattenMatrix(portalMesh.modelMatrix!))
    const modelMatrixBuffer = device.createBuffer({
        size: modelMatrix.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })
    device.queue.writeBuffer(modelMatrixBuffer, 0, modelMatrix)

    const timeArray = new Float32Array([0])
    const timeBuffer = device.createBuffer({
        size: timeArray.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })
    device.queue.writeBuffer(timeBuffer, 0, timeArray)

    const uniformBindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            {
                binding: 0,
                resource: { buffer: playerPerspectiveBuffer },
            },
            { binding: 1, resource: { buffer: modelMatrixBuffer } },
            { binding: 2, resource: { buffer: timeBuffer } },
        ],
    })

    const textureBind = createTextureBind(device, pipeline, texture, sampler, 1)

    const portalRenderPass = (encoder: GPUCommandEncoder, time: number) => {
        writeToBufferF32(device, timeBuffer, new Float32Array([time]), 0)

        const colorAttachment: GPURenderPassColorAttachment = {
            view: msaaTextureView,
            resolveTarget: context.getCurrentTexture().createView(),
            loadOp: "load",
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
        pass.setIndexBuffer(indexBuffer, "uint32")
        pass.setVertexBuffer(0, vertexBuffer)
        pass.setVertexBuffer(1, normalBuffer)
        pass.setVertexBuffer(2, uvBuffer)
        pass.setBindGroup(0, uniformBindGroup)
        pass.setBindGroup(1, textureBind)
        pass.drawIndexed(6)

        pass.end()
    }

    return { pass: portalRenderPass }
}
