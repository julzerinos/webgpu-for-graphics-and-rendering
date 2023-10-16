import { IShapeInfo } from "../../types/shapes"
import { vec4 } from "."

// import { OBJDoc, parseOBJ } from "./ObjParser.js"

import { parseOBJ } from "./objParser"

export const objToShapes = (objFile: string): IShapeInfo[] => {
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

export const objToShape = async (objFile: string): IShapeInfo => {
    await parseOBJ("models/CornellBox.obj", 1, false)

    // const obj = new OBJDoc("public/models/CornellBox.obj")
    // await obj.parse(objFile, 1, true)

    // console.log(obj)

    // const indices = [] as number[]
    // const materialIndices = [] as number[]

    // console.log(obj.getDrawingInfo())

    // const materialMap = obj.mtls[0].materials.reduce(
    //     (map, m, i) => ({ ...map, [m.name]: m, index: i }),
    //     {}
    // )

    // console.log(materialMap)

    // for (const o of obj.objects) {
    //     indices.push(...o.faces.reduce((idxs, f) => [...idxs, ...f.vIndices, 1], []))
    //     // materialIndex.push
    //     materialIndices.push(
    //         ...o.faces.reduce(
    //             (matIdxs, f) => [...matIdxs, materialMap[f.materialName].index],
    //             [] as number[]
    //         )
    //     )
    // }

    // const shape: IShapeInfo = {
    //     vertices: obj.vertices.map(v => vec4(v.x, v.y, v.z, 1)),
    //     normals: [],
    //     triangleIndices: new Uint32Array(indices),
    //     triangleCount: obj.objects.reduce((count, o) => count + o.faces.length, 0),
    // }

    // return shape
}
