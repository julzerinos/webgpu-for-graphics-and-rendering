import { IShapeInfo } from "../../types/shapes"
import { vec4 } from "."

import { OBJDoc } from "./ObjParser.js"

export const objToShape = (objFile: string): IShapeInfo[] => {
    const shapes = [] as IShapeInfo[]

    const obj = new OBJDoc("public/models/teapot.obj")
    obj.parse(objFile, 1, true)

    console.log(obj)

    for (const m of obj.objects) {
        const shape: IShapeInfo = {
            vertices: obj.vertices.map(v => vec4(v.x, v.y, v.z, 1)),
            normals: obj.normals.map(n => vec4(n.x, n.y, n.z, 1)),
            triangleIndices: new Uint32Array(
                m.faces.reduce((indices, face) => {
                    indices.push(...face.vIndices, 0)
                    return indices
                }, [] as number[])
            ),
            triangleCount: m.faces.length,
        }

        shapes.push(shape)
    }

    return shapes
}
