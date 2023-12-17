import { BspTreeResults, getDrawingInfo, parseOBJ } from "../../libs/util"
// @ts-ignore
import { OBJDoc } from "./OBJParserJS"

import { build_bsp_tree } from "../../libs/util"
// @ts-ignore
import { build_bsp_tree as build_js } from "./BspTree" 

export const runTest = async () => {
    const modelPath = "models/CornellBoxWithBlocks.obj"

    const parseTs = await parseOBJ(modelPath)

    const objJs = new OBJDoc("test_model")
    var request = new XMLHttpRequest()
    request.onreadystatechange = function () {
        if (request.readyState == 4) {
            if (request.status != 404) {
                objJs.parse(request.responseText, 1, false)

                compare(parseTs, objJs)
            }
        }
    }
    request.open("GET", modelPath, true)
    request.send()
}

const compare = (objTs: OBJDoc, objJs: any) => {
    console.log("Vertices check")
    for (let i = 0; i < objTs.vertices.length; i++) {
        console.log(objTs.vertices[i], objJs.vertices[i])
    }

    console.log("objects check")
    for (let i = 0; i < objTs.objects.length; i++) {
        console.log(objTs.objects[i], objJs.objects[i])
    }

    const drawingInfoTs = getDrawingInfo(objTs)
    const drawingInfoJs = objJs.getDrawingInfo()
    console.log(drawingInfoTs, drawingInfoTs)

    for (let i = 0; i < drawingInfoTs.vertices.length; i++) {
        if (drawingInfoTs.vertices[i] !== drawingInfoJs.vertices[i])
            console.warn(
                `drawing vertices not equal at ${i}, ${drawingInfoTs.vertices[i]} ${drawingInfoJs.vertices[i]}`
            )
    }
    for (let i = 0; i < drawingInfoTs.normals.length; i++) {
        if (drawingInfoTs.normals[i] !== drawingInfoJs.normals[i])
            console.warn(
                `drawing normals not equal at ${i}, ${drawingInfoTs.normals[i]} ${drawingInfoJs.normals[i]}`
            )
    }
    for (let i = 0; i < drawingInfoTs.colors.length; i++) {
        if (drawingInfoTs.colors[i] !== drawingInfoJs.colors[i])
            console.warn(
                `drawing colors not equal at ${i}, ${drawingInfoTs.colors[i]} ${drawingInfoJs.colors[i]}`
            )
    }
    // for (let i = 0; i < drawingInfoTs.matIndices.length; i++) {
    //     if (drawingInfoTs.matIndices[i] !== drawingInfoJs.matIndices[i])
    //         console.warn(
    //             `drawing matIndices not equal at ${i}, ${drawingInfoTs.matIndices[i]} ${drawingInfoJs.vertices[i]}`
    //         )
    // }
    for (let i = 0; i < drawingInfoTs.indices.length; i++) {
        if (drawingInfoTs.indices[i] !== drawingInfoJs.indices[i])
            console.warn(
                `drawing indices not equal at ${i}, ${drawingInfoTs.indices[i]} ${drawingInfoJs.indices[i]}`
            )
    }

    const bspTreeTs = build_bsp_tree(drawingInfoTs)
    const bspTreeJs = build_js(drawingInfoJs)

    console.log(bspTreeTs, bspTreeJs)

    for (const k in bspTreeTs) {
        if (bspTreeJs[k] === undefined) continue

        console.log(k, bspTreeTs[k as keyof BspTreeResults], bspTreeJs[k])
    }

    for (let i = 0; i < bspTreeTs.treeIds.length; i++) {
        if (bspTreeTs.treeIds[i] !== bspTreeJs.treeIds[i])
            console.warn(
                `drawing bsptreeid not equal at ${i}, ${bspTreeTs.treeIds[i]} ${bspTreeJs.treeIds[i]}`
            )
    }
    for (let i = 0; i < bspTreeTs.bspPlanes.length; i++) {
        if (bspTreeTs.bspPlanes[i] !== bspTreeJs.bspPlanes[i])
            console.warn(
                `drawing bspplane not equal at ${i}, ${bspTreeTs.bspPlanes[i]} ${bspTreeJs.bspPlanes[i]}`
            )
    }
    for (let i = 0; i < bspTreeTs.bspTree.length; i++) {
        if (bspTreeTs.bspTree[i] !== bspTreeJs.bspTree[i])
            console.warn(
                `drawing bsptree not equal at ${i}, ${bspTreeTs.bspTree[i]} ${bspTreeJs.bspTree[i]}`
            )
    }
}

export default runTest
