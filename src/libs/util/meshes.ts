import { vec4 } from "."
import { Vector4 } from "../../types"
import { IShapeInfo } from "../../types/shapes"

import { OBJDoc } from "./objParser"

export const objToShape = (obj: OBJDoc, {}: {}): IShapeInfo => {
    let triangleCount = 0
    const triangleIndices = [] as Vector4[]
    const materialIndices = [] as number[]

    const materialMap = obj.mtls.reduce(
        (map, mtl, i) => ({
            ...map,
            ...mtl.materials.reduce((map, material, j) => ({ ...map, [material.name]: j }), {}),
        }),
        {}
    ) as { [key: string]: number }

    for (let i = 0; i < obj.objects.length; i++) {
        const object = obj.objects[i]

        triangleCount += object.faces.length

        for (let j = 0; j < object.faces.length; j++) {
            const face = object.faces[j]

            triangleIndices.push(vec4(...face.vIndices, 1))
            materialIndices.push(materialMap[face.materialName])
        }
    }

    const shape: IShapeInfo = {
        vertices: obj.vertices,
        normals: obj.normals,
        triangleCount,
        triangleIndices,
        materialIndices,
    }

    return shape
}