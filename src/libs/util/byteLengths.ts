import { flattenMatrix, mat4, vec2, vec3, vec4 } from "."
import { MatrixFormat, SingleFormat, VectorFormat } from "../../types"

export const singleByteLength: { [key in SingleFormat]: number } = {
    float32: new Float32Array([0]).byteLength,
    uint32: new Uint32Array([0]).byteLength,
}

export const vectorByteLength: { [key in VectorFormat]: number } = {
    float32x2: new Float32Array(vec2()).byteLength,
    float32x3: new Float32Array(vec3()).byteLength,
    float32x4: new Float32Array(vec4()).byteLength,
}

export const matrixByteLength: { [key in MatrixFormat]: number } = {
    // float32x4: new Float32Array(mat4()).byteLength,
    // mat2: new Float32Array(flatten(mat2())).byteLength,
    // mat3: new Float32Array(flatten(mat3())).byteLength,
    float32x4x4: new Float32Array(flattenMatrix(mat4())).byteLength,
}

export const byteLength: { [key in VectorFormat | SingleFormat | MatrixFormat]: number } = {
    ...singleByteLength,
    ...vectorByteLength,
    ...matrixByteLength,
}
