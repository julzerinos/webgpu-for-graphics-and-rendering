// objParser.ts is based on the previous implementations in Javascript
// OBJParser.js from OBJViewer.js (c) 2012 matsuda and itami, later modified by Jeppe Revall Frisvad, 2014/2023

import { vec4 } from "."
import { Vector3, Vector4 } from "../../types"

const createOBJDoc = (filename: string): OBJDoc => ({
    filename,
    mtls: [],
    objects: [],
    vertices: [],
    normals: [],
})

export interface OBJDoc {
    filename: string
    mtls: MTLDoc[]
    objects: OBJObject[]
    vertices: Vector4[]
    normals: Vector4[]
}

export const parseOBJ = async (
    filePath: string,
    scale: number = 1,
    reverse: boolean = false
): Promise<OBJDoc> => {
    const f = await fetch(filePath)
    const reader = f.body?.getReader()

    if (!reader) throw new Error("Could not get reader for obj file.")

    const objDoc = createOBJDoc(filePath)
    const firstObject = createOBJObject("_default")
    objDoc.objects.push(firstObject)

    const parseMeta: ParseMeta = {
        objDoc,
        currentObject: firstObject,
        scale,
        currentMaterialName: "",
        filename: filePath,
        reverse,
    }

    let carryOver = ""

    while (true) {
        const { value: chunk, done: readerDone } = await reader.read()

        if (readerDone) break

        const asString = new TextDecoder("utf-8").decode(chunk, { stream: true })
        const lines = asString.split("\n")

        const isThereAnythingToCarryOver = carryOver !== ""
        if (isThereAnythingToCarryOver) {
            lines[0] = carryOver + lines[0]
            carryOver = ""
        }

        const isLastLineIncomplete = lines[lines.length - 1] !== ""
        if (isLastLineIncomplete) carryOver = lines.pop() as string

        for (const l of lines) await parseOBJLine(l, parseMeta)
    }

    return objDoc
}

interface ParseMeta {
    objDoc: OBJDoc
    currentObject: OBJObject
    currentMaterialName: string
    scale: number
    filename: string
    reverse: boolean
}

const parseOBJLine = async (line: string, parseMeta: ParseMeta): Promise<void> => {
    const sp = createStringParser(line)

    const command = getWord(sp) // Get command
    if (command.length === 0) return // check null command

    switch (command) {
        case "#":
            return // Skip comments

        case "mtllib": // Read Material chunk
            var path = parseMtllib(sp, parseMeta.filename)
            var mtl = createMTLDoc() // Create MTL instance
            parseMeta.objDoc.mtls.push(mtl)

            const r = await fetch(path)
            if (!r.body) throw new Error("No MTL body to read.")

            await parseMTL(r.body.getReader(), mtl)

            return // Go to the next line

        case "o":
        case "g": // Read Object name
            const objectIndex =
                parseMeta.currentObject.numIndices === 0
                    ? parseMeta.objDoc.objects.length - 1
                    : parseMeta.objDoc.objects.length

            const object = parseObjectName(sp)
            parseMeta.objDoc.objects[objectIndex] = object
            parseMeta.currentObject = object

            return // Go to the next line

        case "v": // Read vertex
            const vertex = parseVertex(sp, parseMeta.scale)
            parseMeta.objDoc.vertices.push(vertex)
            return // Go to the next line

        case "vn": // Read normal
            const normal = parseNormal(sp)
            parseMeta.objDoc.normals.push(normal)
            return // Go to the next line

        case "usemtl": // Read Material name
            parseMeta.currentMaterialName = parseUsemtl(sp)
            return // Go to the next line

        case "f": // Read face
            const face = parseFace(sp, parseMeta.currentMaterialName)
            calcFaceNormals(face, parseMeta.objDoc, parseMeta.reverse)
            addFace(parseMeta.currentObject, face)
            return // Go to the next line
    }
}

const parseMtllib = (sp: StringParser, fileName: string) => {
    // Get directory path
    var i = fileName.lastIndexOf("/")
    var dirPath = ""
    if (i > 0) dirPath = fileName.substring(0, i + 1)

    return dirPath + getWord(sp) // Get path
}

const parseObjectName = (sp: StringParser): OBJObject => {
    var name = getWord(sp)
    return createOBJObject(name)
}

const parseVertex = (sp: StringParser, scale: number): Vector4 => {
    var x = getFloat(sp) * scale
    var y = getFloat(sp) * scale
    var z = getFloat(sp) * scale
    return vec4(x, y, z, 1)
}

const parseNormal = (sp: StringParser): Vector4 => {
    var x = getFloat(sp)
    var y = getFloat(sp)
    var z = getFloat(sp)
    return vec4(x, y, z, 0)
}

const parseUsemtl = (sp: StringParser) => getWord(sp)

const parseFace = (sp: StringParser, materialName: string): Face => {
    const face = createFace(materialName)
    // get indices
    for (;;) {
        const word = getWord(sp)
        if (word.length === 0) break
        const subWords = word.split("/")
        if (subWords.length >= 1) {
            const vi = parseInt(subWords[0]) - 1
            if (!isNaN(vi)) face.vIndices.push(vi)
        }
        if (subWords.length >= 3) {
            const ni = parseInt(subWords[2]) - 1
            face.nIndices.push(ni)
        } else {
            face.nIndices.push(-1)
        }
    }

    return face
}

const calcFaceNormals = (face: Face, objDoc: OBJDoc, reverse: boolean) => {
    var v0 = [
        objDoc.vertices[face.vIndices[0]][0],
        objDoc.vertices[face.vIndices[0]][1],
        objDoc.vertices[face.vIndices[0]][2],
    ] as Vector3
    var v1 = [
        objDoc.vertices[face.vIndices[1]][0],
        objDoc.vertices[face.vIndices[1]][1],
        objDoc.vertices[face.vIndices[1]][2],
    ] as Vector3
    var v2 = [
        objDoc.vertices[face.vIndices[2]][0],
        objDoc.vertices[face.vIndices[2]][1],
        objDoc.vertices[face.vIndices[2]][2],
    ] as Vector3

    var normal = calcNormal(v0, v1, v2)
    if (normal == null) {
        if (face.vIndices.length >= 4) {
            var v3 = [
                objDoc.vertices[face.vIndices[3]][0],
                objDoc.vertices[face.vIndices[3]][1],
                objDoc.vertices[face.vIndices[3]][2],
            ] as Vector3
            normal = calcNormal(v1, v2, v3)
        }
        if (normal == null) {
            normal = [0.0, 1.0, 0.0]
        }
    }
    if (reverse) {
        normal[0] = -normal[0]
        normal[1] = -normal[1]
        normal[2] = -normal[2]
    }
    face.normal = vec4(normal[0], normal[1], normal[2], 0)

    // Devide to triangles if face contains over 3 points.
    if (face.vIndices.length > 3) {
        var n = face.vIndices.length - 2
        var newVIndices = new Array(n * 3)
        var newNIndices = new Array(n * 3)
        for (var i = 0; i < n; i++) {
            newVIndices[i * 3 + 0] = face.vIndices[0]
            newVIndices[i * 3 + 1] = face.vIndices[i + 1]
            newVIndices[i * 3 + 2] = face.vIndices[i + 2]
            newNIndices[i * 3 + 0] = face.nIndices[0]
            newNIndices[i * 3 + 1] = face.nIndices[i + 1]
            newNIndices[i * 3 + 2] = face.nIndices[i + 2]
        }
        face.vIndices = newVIndices
        face.nIndices = newNIndices
    }
    face.numIndices = face.vIndices.length

    return face
}

// // Analyze the material file
const parseMTL = async (fileReader: ReadableStreamDefaultReader, mtl: MTLDoc) => {
    const parseMeta = {
        material: createMaterial("", vec4()),
        mtl,
    }

    while (true) {
        const { value: chunk, done: readerDone } = await fileReader.read()

        if (readerDone) break

        const asString = new TextDecoder("utf-8").decode(chunk, { stream: true })
        const lines = asString.split("\n")

        for (const l of lines) parseMTLLine(l, parseMeta)
    }

    mtl.complete = true
}

const parseMTLLine = (line: string, parseMeta: { material: Material; mtl: MTLDoc }) => {
    const sp = createStringParser(line)

    const command = getWord(sp) // Get command
    if (command.length === 0) return // check null command

    switch (command) {
        case "#":
            return // Skip comments

        case "newmtl": // Read Material chunk
            const name = parseNewmtl(sp) // Get name
            parseMeta.material = createMaterial(name, vec4(0.8, 0.8, 0.8, 1.0))
            parseMeta.mtl.materials.push(parseMeta.material)
            return // Go to the next line

        case "Kd": // Read diffuse color coefficient as color
            //if (name == "") continue; // Go to the next line because of Error
            if (parseMeta.material) parseMeta.material.color = parseRGB(sp)
            return // Go to the next line

        case "Ka": // Read ambient color coefficient as emission
            if (parseMeta.material) parseMeta.material.emission = parseRGB(sp)
            return // Go to the next line

        case "Ks": // Read specular color coefficient
            if (parseMeta.material) parseMeta.material.specular = parseRGB(sp)
            return // Go to the next line

        case "Ni": // Read specular color coefficient
            if (parseMeta.material) parseMeta.material.ior = getFloat(sp)
            return // Go to the next line

        case "Ns": // Read specular color coefficient
            if (parseMeta.material) parseMeta.material.shininess = getFloat(sp)
            return // Go to the next line

        case "illum": // Read specular color coefficient
            if (parseMeta.material) parseMeta.material.illum = getInt(sp)
            return // Go to the next line
    }
}

// // Check Materials
// OBJDoc.prototype.isMTLComplete = function () {
//     if (this.mtls.length == 0) return true
//     for (var i = 0; i < this.mtls.length; i++) {
//         if (!this.mtls[i].complete) return false
//     }
//     return true
// }

// // Find color by material name
// OBJDoc.prototype.findMaterial = function (name) {
//     for (var i = 0; i < this.mtls.length; i++) {
//         for (var j = 0; j < this.mtls[i].materials.length; j++) {
//             if (this.mtls[i].materials[j].name == name) {
//                 return this.mtls[i].materials[j]
//             }
//         }
//     }
//     return new Color(0.8, 0.8, 0.8, 1)
// }

// //------------------------------------------------------------------------------
// // Retrieve the information for drawing 3D model
// OBJDoc.prototype.getDrawingInfo = function () {
//     // Create an arrays for vertex coordinates, normals, colors, and indices
//     var numVertices = 0
//     var numIndices = 0
//     var numFaces = 0
//     for (var i = 0; i < this.objects.length; i++) {
//         numIndices += this.objects[i].numIndices + this.objects[i].faces.length
//         numFaces += this.objects[i].faces.length
//     }
//     var numVertices = this.vertices.length
//     var vertices = new Float32Array(numVertices * 4)
//     var normals = new Float32Array(numVertices * 4)
//     var colors = new Float32Array(numVertices * 4)
//     var indices = new Uint32Array(numIndices)
//     var mat_indices = new Uint32Array(numFaces)
//     var materials = []
//     var mat_map = new Map()
//     var light_indices = []

//     // Set vertex, normal and color
//     var index_indices = 0
//     var face_indices = 0
//     for (var i = 0; i < this.objects.length; i++) {
//         var object = this.objects[i]
//         for (var j = 0; j < object.faces.length; j++) {
//             var face = object.faces[j]
//             var mat_idx = mat_map.get(face.materialName)
//             var mat
//             if (mat_idx === undefined) {
//                 mat = this.findMaterial(face.materialName)
//                 mat_map.set(face.materialName, materials.length)
//                 mat_idx = materials.length
//                 materials.push(mat)
//             } else {
//                 mat = materials[mat_idx]
//             }
//             if (
//                 mat.emission !== undefined &&
//                 mat.emission.r + mat.emission.g + mat.emission.b > 0.0
//             )
//                 light_indices.push(face_indices)
//             mat_indices[face_indices++] = mat_idx
//             var color = mat.color === undefined ? new Color(0.8, 0.8, 0.8, 1.0) : mat.color
//             var faceNormal = face.normal
//             for (var k = 0; k < face.vIndices.length; k++) {
//                 // Set index
//                 var vIdx = face.vIndices[k]
//                 indices[index_indices] = vIdx
//                 // Copy vertex
//                 var vertex = this.vertices[vIdx]
//                 vertices[vIdx * 4 + 0] = vertex.x
//                 vertices[vIdx * 4 + 1] = vertex.y
//                 vertices[vIdx * 4 + 2] = vertex.z
//                 vertices[vIdx * 4 + 3] = 1.0
//                 // Copy color
//                 colors[vIdx * 4 + 0] = color.r
//                 colors[vIdx * 4 + 1] = color.g
//                 colors[vIdx * 4 + 2] = color.b
//                 colors[vIdx * 4 + 3] = color.a
//                 // Copy normal
//                 var nIdx = face.nIndices[k]
//                 if (nIdx >= 0) {
//                     var normal = this.normals[nIdx]
//                     normals[vIdx * 4 + 0] = normal.x
//                     normals[vIdx * 4 + 1] = normal.y
//                     normals[vIdx * 4 + 2] = normal.z
//                     normals[vIdx * 4 + 3] = 0.0
//                 } else {
//                     normals[vIdx * 4 + 0] = faceNormal.x
//                     normals[vIdx * 4 + 1] = faceNormal.y
//                     normals[vIdx * 4 + 2] = faceNormal.z
//                     normals[vIdx * 4 + 3] = 0.0
//                 }
//                 index_indices++
//             }
//             indices[index_indices++] = 0
//         }
//     }

//     return new DrawingInfo(
//         vertices,
//         normals,
//         colors,
//         indices,
//         materials,
//         mat_indices,
//         new Uint32Array(light_indices)
//     )
// }

// //------------------------------------------------------------------------------
// // MTLDoc Object
// //------------------------------------------------------------------------------
// var MTLDoc = function () {
//     this.complete = false // MTL is configured correctly
//     this.materials = new Array(0)
// }

const createMTLDoc = (): MTLDoc => ({ complete: false, materials: [] })

interface MTLDoc {
    complete: boolean
    materials: Material[]
}

const parseNewmtl = (sp: StringParser) => getWord(sp) // Get name

const parseRGB = (sp: StringParser) => {
    var r = getFloat(sp)
    var g = getFloat(sp)
    var b = getFloat(sp)
    return vec4(r, g, b, 1)
}

const createMaterial = (name: string, color: Vector4): Material => ({
    name,
    color,
    illum: 0,
    shininess: 0,
    ior: 1,
    specular: vec4(),
    emission: vec4(),
})

export interface Material {
    name: string
    color: Vector4
    illum: number
    shininess: number
    ior: number
    specular: Vector4
    emission: Vector4
}

const createOBJObject = (name: string): OBJObject => ({ name, faces: [], numIndices: 0 })

interface OBJObject {
    name: string
    faces: Face[]
    numIndices: number
}

const addFace = (objObject: OBJObject, face: Face) => {
    objObject.faces.push(face)
    objObject.numIndices += face.numIndices
}

const createFace = (materialName: string = ""): Face => ({
    materialName,
    vIndices: [],
    nIndices: [],
    normal: vec4(1),
    numIndices: 0,
})

interface Face {
    materialName: string
    vIndices: number[]
    nIndices: number[]
    normal: Vector4
    numIndices: number
}

// //------------------------------------------------------------------------------
// // DrawInfo Object
// //------------------------------------------------------------------------------
// var DrawingInfo = function (
//     vertices,
//     normals,
//     colors,
//     indices,
//     materials,
//     mat_indices,
//     light_indices
// ) {
//     this.vertices = vertices
//     this.normals = normals
//     this.colors = colors
//     this.indices = indices
//     this.materials = materials
//     this.mat_indices = mat_indices
//     this.light_indices = light_indices
// }

// //------------------------------------------------------------------------------

interface StringParser {
    str: string
    index: number
}

const createStringParser = (str: string): StringParser => ({ str, index: 0 })

const skipDelimiters = (sp: StringParser) => {
    let i
    const len = sp.str.length
    for (i = sp.index; i < len; i++) {
        const c = sp.str.charAt(i)
        // Skip TAB, Space, '(', ')
        if (c == "\t" || c == " " || c == "(" || c == ")" || c == '"') continue
        break
    }
    sp.index = i
}

const skipToNextWord = (sp: StringParser) => {
    skipDelimiters(sp)
    var n = getWordLength(sp.str, sp.index)
    sp.index += n + 1
}

// // Get word
const getWord = (sp: StringParser): string => {
    skipDelimiters(sp)
    const n = getWordLength(sp.str, sp.index)
    if (n === 0) return ""
    const word = sp.str.substring(sp.index, sp.index + n)
    sp.index += n + 1

    return word
}

// Get integer
const getInt = (sb: StringParser) => {
    return parseInt(getWord(sb))
}

// Get floating number
const getFloat = (sb: StringParser) => {
    return parseFloat(getWord(sb))
}

// Get the length of word
const getWordLength = (str: string, start: number): number => {
    // var n = 0
    let i
    for (i = start; i < str.length; i++) {
        var c = str.charAt(i)
        if (c == "\t" || c == " " || c == "(" || c == ")" || c == '"') break
    }
    return i - start
}

// //------------------------------------------------------------------------------
// // Common function
// //------------------------------------------------------------------------------
const calcNormal = (p0: Vector3, p1: Vector3, p2: Vector3): Vector3 => {
    // v0: a vector from p1 to p0, v1; a vector from p1 to p2
    var v0 = new Float32Array(3)
    var v1 = new Float32Array(3)
    for (var i = 0; i < 3; i++) {
        v0[i] = p0[i] - p1[i]
        v1[i] = p2[i] - p1[i]
    }

    // The cross product of v0 and v1
    var c = Array<number>(3)
    c[0] = v0[1] * v1[2] - v0[2] * v1[1]
    c[1] = v0[2] * v1[0] - v0[0] * v1[2]
    c[2] = v0[0] * v1[1] - v0[1] * v1[0]

    var x = c[0],
        y = c[1],
        z = c[2],
        g = Math.sqrt(x * x + y * y + z * z)
    if (g) {
        if (g == 1) return c as Vector3
    } else {
        c[0] = 0
        c[1] = 0
        c[2] = 0
        return c as Vector3
    }
    g = 1 / g
    c[0] = x * g
    c[1] = y * g
    c[2] = z * g
    return c as Vector3
}
