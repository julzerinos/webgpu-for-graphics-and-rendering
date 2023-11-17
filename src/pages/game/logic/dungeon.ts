import {
    perspectiveProjection,
    vec3,
    lookAtMatrix,
    add,
    vec4,
    flattenVector,
} from "../../../libs/util"
import { Vector4 } from "../../../types"

const tileRenderData = (device: GPUDevice) => {
    // const tilePipeline = device.createRenderPipeline({
    //     layout:"auto",
    //     vertex:
    // })
}

const bottom = [
    vec4(1, -1, 1, 1),
    vec4(-1, -1, 1, 1),
    vec4(-1, -1, -1, 1),
    vec4(1, -1, -1, 1),
    vec4(-1, -1, -1, 1),
    vec4(1, -1, 1, 1),
]
const bottomNormals = [
    vec4(0, 1, 0, 0),
    vec4(0, 1, 0, 0),
    vec4(0, 1, 0, 0),
    vec4(0, 1, 0, 0),
    vec4(0, 1, 0, 0),
    vec4(0, 1, 0, 0),
]

const top = [
    vec4(1, 1, -1, 1),
    vec4(-1, 1, -1, 1),
    vec4(-1, 1, 1, 1),
    vec4(-1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, -1, 1),
]

const topNormals = [
    vec4(0, -1, 0, 0),
    vec4(0, -1, 0, 0),
    vec4(0, -1, 0, 0),
    vec4(0, -1, 0, 0),
    vec4(0, -1, 0, 0),
    vec4(0, -1, 0, 0),
]

const left = [
    vec4(-1, 1, -1, 1), //5
    vec4(-1, -1, -1, 1), //4
    vec4(-1, -1, 1, 1),
    vec4(-1, -1, 1, 1),
    vec4(-1, 1, 1, 1),
    vec4(-1, 1, -1, 1), //5
]

const leftNormals = [
    vec4(1, 0, 0, 0),
    vec4(1, 0, 0, 0),
    vec4(1, 0, 0, 0),
    vec4(1, 0, 0, 0),
    vec4(1, 0, 0, 0),
    vec4(1, 0, 0, 0),
]

const right = [
    vec4(-1, 1, 1, 1),
    vec4(1, -1, 1, 1), //3
    vec4(1, -1, -1, 1),
    vec4(1, -1, -1, 1),
    vec4(1, 1, -1, 1),
    vec4(-1, 1, 1, 1),
]

const rightNormals = [
    vec4(-1, 0, 0, 0),
    vec4(-1, 0, 0, 0),
    vec4(-1, 0, 0, 0),
    vec4(-1, 0, 0, 0),
    vec4(-1, 0, 0, 0),
    vec4(-1, 0, 0, 0),
]

const front = [
    vec4(-1, 1, 1, 1),
    vec4(-1, -1, 1, 1),
    vec4(1, -1, 1, 1), //3
    vec4(1, -1, 1, 1), //3
    vec4(1, 1, 1, 1),
    vec4(-1, 1, 1, 1),
]

const frontNormals = [
    vec4(0, 0, -1, 0),
    vec4(0, 0, -1, 0),
    vec4(0, 0, -1, 0),
    vec4(0, 0, -1, 0),
    vec4(0, 0, -1, 0),
    vec4(0, 0, -1, 0),
]

const back = [
    vec4(-1, -1, -1, 1), //4
    vec4(-1, 1, -1, 1), //5
    vec4(1, 1, -1, 1),
    vec4(1, 1, -1, 1),
    vec4(1, -1, -1, 1),
    vec4(-1, -1, -1, 1), //4
]

const backNormals = [
    vec4(0, 0, 1, 0),
    vec4(0, 0, 1, 0),
    vec4(0, 0, 1, 0),
    vec4(0, 0, 1, 0),
    vec4(0, 0, 1, 0),
    vec4(0, 0, 1, 0),
]

export const TileMeshData = {
    vertices: new Float32Array(
        flattenVector(([] as Vector4[]).concat(right, left, top, bottom, front, back))
    ),
    normals: new Float32Array(
        flattenVector(
            ([] as Vector4[]).concat(
                rightNormals,
                leftNormals,
                topNormals,
                bottomNormals,
                frontNormals,
                backNormals
            )
        )
    ),
}
