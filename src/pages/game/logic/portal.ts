import {
    flattenMatrix,
    flattenVector,
    identity4x4,
    loadTexture,
    vec2,
    vec3,
    vec4,
} from "../../../libs/util"
import {
    createBind,
    createTextureBind,
    genreateIndexBuffer,
    genreateVertexBuffer,
    setupShaderPipeline,
    writeToBufferF32,
} from "../../../libs/webgpu"
import { Matrix4x4 } from "../../../types"
import { GameEngine, Mesh, Renderable } from "../interfaces"

import portalShader from "../shaders/portal.wgsl?raw"

export const generatePortalMesh = (halfSize: number): Mesh => {
    const vertices = new Float32Array(
        flattenVector([
            vec4(-halfSize, halfSize, 0, 1),
            vec4(-halfSize, -halfSize, 0, 1),
            vec4(halfSize, -halfSize, 0, 1),
            vec4(halfSize, halfSize, 0, 1),
        ])
    )
    const triangles = new Uint32Array(flattenVector([vec3(0, 1, 3), vec3(3, 1, 2)]))
    const uvs = new Float32Array(flattenVector([vec2(0, 0), vec2(0, 1), vec2(1, 1), vec2(1, 0)]))
    const normals = new Float32Array(
        flattenVector([vec4(0, 0, 1, 0), vec4(0, 0, 1, 0), vec4(0, 0, 1, 0), vec4(0, 0, 1, 0)])
    )

    return {
        vertices,
        triangles,
        uvs,
        normals,
    }
}

export const createPortalRender = async ({
    device,
    mainCanvas: {
        context,
        canvasFormat,
        depthData: { depthStencil, depthStencilTextureView },
        multisampleData: { msaaTextureView, multisample },
    },
}: GameEngine): Promise<Renderable> => {
    const { texture, sampler } = await loadTexture(device, "game/portal.png")
    const portalMesh = generatePortalMesh(2)

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

    const {
        bindGroup: uniformBindGroup,
        buffers: [playerCameraBuffer, timeBuffer],
    } = createBind(
        device,
        pipeline,
        [new Float32Array(flattenMatrix(identity4x4())), new Float32Array([0])],
        "UNIFORM"
    )

    const textureBind = createTextureBind(device, pipeline, texture, sampler, 1)

    const portalRenderPass = (encoder: GPUCommandEncoder, time: number) => {
        writeToBufferF32(device, timeBuffer, new Float32Array([time]), 0)

        const colorAttachment: GPURenderPassColorAttachment = {
            view: msaaTextureView,
            resolveTarget: context.getCurrentTexture().createView(),
            loadOp: "load",
            // clearValue: Colors.blueScreenBlue,
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

    const onPlayerView = (cameraMatrix: Matrix4x4) => {
        writeToBufferF32(
            device,
            playerCameraBuffer,
            new Float32Array(flattenMatrix(cameraMatrix)),
            0
        )
    }

    return { pass: portalRenderPass, onPlayerView }
}
