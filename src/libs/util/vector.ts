// Adapted from https://github.com/esangel/WebGL/blob/master/Common/MV.js

import { Matrix, Vector, Vector2, Vector3, Vector4, VectorFormat } from "../../types"

export const vec2 = (x: number = 0.0, y: number = 0.0): Vector2 => [x, y]
export const vec3 = (x: number = 0.0, y: number = 0.0, z: number = 0.0): Vector3 => [x, y, z]
export const vec4 = (
    x: number = 0.0,
    y: number = 0.0,
    z: number = 0.0,
    w: number = 1.0
): Vector4 => [x, y, z, w]

export const toVec3 = (v: Vector): Vector3 => {
    const x = v[0] ?? 0
    const y = v[1] ?? 0
    const z = v[2] ?? 0

    return vec3(x, y, z)
}

export const Vector3s: {
    [key in "up" | "down" | "left" | "right" | "forward" | "back"]: Vector3
} = {
    forward: vec3(0, 0, 1),
    back: vec3(0, 0, -1),
    up: vec3(0, 1, 0),
    down: vec3(0, -1, 0),
    right: vec3(1, 0, 0),
    left: vec3(-1, 0, 0),
}

export const flattenVector = (vectors: Vector[]): number[] =>
    ([] as Array<number>).concat(...vectors)

export const add = <T extends Vector>(v1: T, v2: T): T => {
    const output = []
    for (let i = 0; i < Math.min(v1.length, v2.length); i++) output.push(v1[i] + v2[i])
    return output as T
}

export const subtract = <T extends Vector>(v1: T, v2: T): T => {
    const output = []
    for (let i = 0; i < Math.min(v1.length, v2.length); i++) output.push(v1[i] - v2[i])
    return output as T
}

export const scale = <T extends Vector>(v: T, scale: number): T => {
    const output = []
    for (let i = 0; i < v.length; i++) output.push(scale * v[i])
    return output as T
}

export const center = <T extends Vector>(v1: T, v2: T): T => {
    const output = []
    for (let i = 0; i < Math.min(v1.length, v2.length); i++) output.push((v1[i] + v2[i]) / 2)
    return output as T
}

export const dot = <T extends Vector>(v1: T, v2: T): number => {
    let sum = 0
    for (let i = 0; i < Math.min(v1.length, v2.length); i++) sum += v1[i] * v2[i]
    return sum
}

export const elementWise = <T extends Vector>(v1: T, v2: T, zeroForMissing = true): T => {
    const output = []
    for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
        let a = zeroForMissing ? 0 : 1
        let b = zeroForMissing ? 0 : 1
        if (i < v1.length) a = v1[i]
        if (i < v2.length) b = v2[i]

        output.push(a * b)
    }
    return output as T
}

export const cross = (v1: Vector3, v2: Vector3): Vector3 => {
    return [
        v1[1] * v2[2] - v1[2] * v2[1],
        v1[2] * v2[0] - v1[0] * v2[2],
        v1[0] * v2[1] - v1[1] * v2[0],
    ]
}

export const isSmaller = (v1: Vector, v2: Vector): boolean => {
    for (let i = 0; i < Math.min(v1.length, v2.length); i++) if (v1[i] >= v2[i]) return false
    return true
}

export const absoluteMinVectors = <T extends Vector>(v1: T, v2: T): T => {
    const output = []
    for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
        let min = Number.POSITIVE_INFINITY
        if (i < v1.length) min = v1[i]
        if (i < v2.length) min = Math.min(min, v2[i])
        output.push(min)
    }
    return output as T
}

export const absoluteMaxVectors = <T extends Vector>(v1: T, v2: T): T => {
    const output = []
    for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
        let max = Number.NEGATIVE_INFINITY
        if (i < v1.length) max = v1[i]
        if (i < v2.length) max = Math.max(max, v2[i])
        output.push(max)
    }
    return output as T
}

export const normalize = <T extends Vector>(v: T) => scale<T>(v, 1 / magnitude(v))

export const sqrMagnitude = (v: Vector): number => dot(v, v)

export const magnitude = (v: Vector): number => Math.sqrt(sqrMagnitude(v))

export const vectorsEqual = <T extends Vector>(v1: T, v2: T): boolean => {
    if (v1.length != v2.length) return false

    for (let i = 0; i < Math.min(v1.length, v2.length); i++) if (v1[i] != v2[i]) return false
    return true
}

export const vectorMatrixMult = <T extends Vector, U extends Matrix>(v: T, m: U): T => {
    const output = []

    for (let i = 0; i < v.length; i++) {
        let sum = 0.0
        for (let j = 0; j < v.length; j++) sum += m[i][j] * v[j]

        output.push(sum)
    }

    return output as T
}

// //----------------------------------------------------------------------------

//----------------------------------------------------------------------------
//
//  Generic Mathematical Operations for Vectors and Matrices
//

// function equal(u, v) {
//     if (u.length != v.length) {
//         return false
//     }

//     if (u.matrix && v.matrix) {
//         for (var i = 0; i < u.length; ++i) {
//             if (u[i].length != v[i].length) {
//                 return false
//             }
//             for (var j = 0; j < u[i].length; ++j) {
//                 if (u[i][j] !== v[i][j]) {
//                     return false
//                 }
//             }
//         }
//     } else if ((u.matrix && !v.matrix) || (!u.matrix && v.matrix)) {
//         return false
//     } else {
//         for (var i = 0; i < u.length; ++i) {
//             if (u[i] !== v[i]) {
//                 return false
//             }
//         }
//     }

//     return true
// }

// //----------------------------------------------------------------------------

// function add(u, v) {
//     var result = []

//     if (u.matrix && v.matrix) {
//         if (u.length != v.length) {
//             throw "add(): trying to add matrices of different dimensions"
//         }

//         for (var i = 0; i < u.length; ++i) {
//             if (u[i].length != v[i].length) {
//                 throw "add(): trying to add matrices of different dimensions"
//             }
//             result.push([])
//             for (var j = 0; j < u[i].length; ++j) {
//                 result[i].push(u[i][j] + v[i][j])
//             }
//         }

//         result.matrix = true

//         return result
//     } else if ((u.matrix && !v.matrix) || (!u.matrix && v.matrix)) {
//         throw "add(): trying to add matrix and non-matrix variables"
//     } else {
//         if (u.length != v.length) {
//             throw "add(): vectors are not the same dimension"
//         }

//         for (var i = 0; i < u.length; ++i) {
//             result.push(u[i] + v[i])
//         }

//         return result
//     }
// }

// //----------------------------------------------------------------------------

// function subtract(u, v) {
//     var result = []

//     if (u.matrix && v.matrix) {
//         if (u.length != v.length) {
//             throw "subtract(): trying to subtract matrices" + " of different dimensions"
//         }

//         for (var i = 0; i < u.length; ++i) {
//             if (u[i].length != v[i].length) {
//                 throw "subtract(): trying to subtact matrices" + " of different dimensions"
//             }
//             result.push([])
//             for (var j = 0; j < u[i].length; ++j) {
//                 result[i].push(u[i][j] - v[i][j])
//             }
//         }

//         result.matrix = true

//         return result
//     } else if ((u.matrix && !v.matrix) || (!u.matrix && v.matrix)) {
//         throw "subtact(): trying to subtact  matrix and non-matrix variables"
//     } else {
//         if (u.length != v.length) {
//             throw "subtract(): vectors are not the same length"
//         }

//         for (var i = 0; i < u.length; ++i) {
//             result.push(u[i] - v[i])
//         }

//         return result
//     }
// }

//----------------------------------------------------------------------------

// function mult(u, v) {
//     var result = []

//     if (u.matrix && v.matrix) {
//         if (u.length != v.length) {
//             throw "mult(): trying to add matrices of different dimensions"
//         }

//         for (var i = 0; i < u.length; ++i) {
//             if (u[i].length != v[i].length) {
//                 throw "mult(): trying to add matrices of different dimensions"
//             }
//         }

//         for (var i = 0; i < u.length; ++i) {
//             result.push([])

//             for (var j = 0; j < v.length; ++j) {
//                 var sum = 0.0
//                 for (var k = 0; k < u.length; ++k) {
//                     sum += u[i][k] * v[k][j]
//                 }
//                 result[i].push(sum)
//             }
//         }

//         result.matrix = true

//         return result
//     }

//     if (u.matrix && u.length == v.length) {
//         for (var i = 0; i < v.length; i++) {
//             var sum = 0.0
//             for (var j = 0; j < v.length; j++) {
//                 sum += u[i][j] * v[j]
//             }
//             result.push(sum)
//         }
//         return result
//     } else {
//         if (u.length != v.length) {
//             throw "mult(): vectors are not the same dimension"
//         }

//         for (var i = 0; i < u.length; ++i) {
//             result.push(u[i] * v[i])
//         }

//         return result
//     }
// }

//---------------------------------------------------------------------------
// function rotateX(theta) {
//     var c = Math.cos(radians(theta))
//     var s = Math.sin(radians(theta))
//     var rx = mat4(1.0, 0.0, 0.0, 0.0, 0.0, c, s, 0.0, 0.0, -s, c, 0.0, 0.0, 0.0, 0.0, 1.0)
//     return rx
// }
// function rotateY(theta) {
//     var c = Math.cos(radians(theta))
//     var s = Math.sin(radians(theta))
//     var ry = mat4(c, 0.0, -s, 0.0, 0.0, 1.0, 0.0, 0.0, s, 0.0, c, 0.0, 0.0, 0.0, 0.0, 1.0)
//     return ry
// }
// function rotateZ(theta) {
//     var c = Math.cos(radians(theta))
//     var s = Math.sin(radians(theta))
//     var rz = mat4(c, s, 0.0, 0.0, -s, c, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0)
//     return rz
// }

// //----------------------------------------------------------------------------

//----------------------------------------------------------------------------

// function normalize(u, excludeLastComponent) {
//     if (excludeLastComponent) {
//         var last = u.pop()
//     }

//     var len = length(u)

//     if (!isFinite(len)) {
//         throw "normalize: vector " + u + " has zero length"
//     }

//     for (var i = 0; i < u.length; ++i) {
//         u[i] /= len
//     }

//     if (excludeLastComponent) {
//         u.push(last)
//     }

//     return u
// }

//----------------------------------------------------------------------------

// function mix(u, v, s) {
//     if (typeof s !== "number") {
//         throw "mix: the last paramter " + s + " must be a number"
//     }

//     if (u.length != v.length) {
//         throw "vector dimension mismatch"
//     }

//     var result = []
//     for (var i = 0; i < u.length; ++i) {
//         result.push((1.0 - s) * u[i] + s * v[i])
//     }

//     return result
// }

//----------------------------------------------------------------------------
//
// Vector and Matrix functions
//

// function scale(s, u) {
//     if (!Array.isArray(u)) {
//         throw "scale: second parameter " + u + " is not a vector"
//     }

//     var result = []
//     for (var i = 0; i < u.length; ++i) {
//         result.push(s * u[i])
//     }

//     return result
// }

//----------------------------------------------------------------------------
//
//
//

// new functions 5/2/2015

// printing

// function printm(m) {
//     if (m.length == 2) for (var i = 0; i < m.length; i++) console.log(m[i][0], m[i][1])
//     else if (m.length == 3)
//         for (var i = 0; i < m.length; i++) console.log(m[i][0], m[i][1], m[i][2])
//     else if (m.length == 4)
//         for (var i = 0; i < m.length; i++) console.log(m[i][0], m[i][1], m[i][2], m[i][3])
// }
// determinants

// function det(m) {
//     if (m.matrix != true) console.log("not a matrix")
//     if (m.length == 2) return det2(m)
//     if (m.length == 3) return det3(m)
//     if (m.length == 4) return det4(m)
// }

//---------------------------------------------------------

// inverses

// function inverse2(m) {
//     var a = mat2()
//     var d = det2(m)
//     a[0][0] = m[1][1] / d
//     a[0][1] = -m[0][1] / d
//     a[1][0] = -m[1][0] / d
//     a[1][1] = m[0][0] / d
//     a.matrix = true
//     return a
// }

// function inverse(m) {
//     if (m.matrix != true) console.log("not a matrix")
//     if (m.length == 2) return inverse2(m)
//     if (m.length == 3) return inverse3(m)
//     if (m.length == 4) return inverse4(m)
// }

// function normalMatrix(m, flag) {
//     var a = mat4()
//     a = inverse(transpose(m))
//     if (flag != true) return a
//     else {
//         var b = mat3()
//         for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) b[i][j] = a[i][j]
//         return b
//     }
// }
