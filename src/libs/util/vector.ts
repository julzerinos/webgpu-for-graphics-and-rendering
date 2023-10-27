// Adapted from https://github.com/esangel/WebGL/blob/master/Common/MV.js

import { Vector, Vector2, Vector3, Vector4, VectorFormat } from "../../types"

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
        let min = Number.MAX_VALUE
        if (i < v1.length) min = v1[i]
        if (i < v2.length) min = Math.min(min, v2[i])
        output.push(min)
    }
    return output as T
}

export const absoluteMaxVectors = <T extends Vector>(v1: T, v2: T): T => {
    const output = []
    for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
        let max = Number.MIN_VALUE
        if (i < v1.length) max = v1[i]
        if (i < v2.length) max = Math.max(max, v2[i])
        output.push(max)
    }
    return output as T
}

export const normalize = <T extends Vector>(v: T) => scale<T>(v, 1 / magnitude(v))

export const magnitude = (v: Vector): number => Math.sqrt(dot(v, v))

export const vectorByteLength: { [key in VectorFormat]: number } = {
    float32x2: new Float32Array(vec2()).byteLength,
    float32x3: new Float32Array(vec3()).byteLength,
    float32x4: new Float32Array(vec4()).byteLength,
}

export const vectorsEqual = <T extends Vector>(v1: T, v2: T): boolean => {
    if (v1.length != v2.length) return false

    for (let i = 0; i < Math.min(v1.length, v2.length); i++) if (v1[i] != v2[i]) return false
    return true
}

// function mat2() {
//     var v = _argumentsToArray(arguments)

//     var m = []
//     switch (v.length) {
//         case 0:
//             v[0] = 1
//         case 1:
//             m = [vec2(v[0], 0.0), vec2(0.0, v[0])]
//             break

//         default:
//             m.push(vec2(v))
//             v.splice(0, 2)
//             m.push(vec2(v))
//             break
//     }

//     m.matrix = true

//     return m
// }

// //----------------------------------------------------------------------------

// function mat3() {
//     var v = _argumentsToArray(arguments)

//     var m = []
//     switch (v.length) {
//         case 0:
//             v[0] = 1
//         case 1:
//             m = [vec3(v[0], 0.0, 0.0), vec3(0.0, v[0], 0.0), vec3(0.0, 0.0, v[0])]
//             break

//         default:
//             m.push(vec3(v))
//             v.splice(0, 3)
//             m.push(vec3(v))
//             v.splice(0, 3)
//             m.push(vec3(v))
//             break
//     }

//     m.matrix = true

//     return m
// }

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

// function det2(m) {
//     return m[0][0] * m[1][1] - m[0][1] * m[1][0]
// }

// function det3(m) {
//     var d =
//         m[0][0] * m[1][1] * m[2][2] +
//         m[0][1] * m[1][2] * m[2][0] +
//         m[0][2] * m[2][1] * m[1][0] -
//         m[2][0] * m[1][1] * m[0][2] -
//         m[1][0] * m[0][1] * m[2][2] -
//         m[0][0] * m[1][2] * m[2][1]
//     return d
// }

// function det4(m) {
//     var m0 = [
//         vec3(m[1][1], m[1][2], m[1][3]),
//         vec3(m[2][1], m[2][2], m[2][3]),
//         vec3(m[3][1], m[3][2], m[3][3]),
//     ]
//     var m1 = [
//         vec3(m[1][0], m[1][2], m[1][3]),
//         vec3(m[2][0], m[2][2], m[2][3]),
//         vec3(m[3][0], m[3][2], m[3][3]),
//     ]
//     var m2 = [
//         vec3(m[1][0], m[1][1], m[1][3]),
//         vec3(m[2][0], m[2][1], m[2][3]),
//         vec3(m[3][0], m[3][1], m[3][3]),
//     ]
//     var m3 = [
//         vec3(m[1][0], m[1][1], m[1][2]),
//         vec3(m[2][0], m[2][1], m[2][2]),
//         vec3(m[3][0], m[3][1], m[3][2]),
//     ]
//     return m[0][0] * det3(m0) - m[0][1] * det3(m1) + m[0][2] * det3(m2) - m[0][3] * det3(m3)
// }

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

// function inverse3(m) {
//     var a = mat3()
//     var d = det3(m)

//     var a00 = [vec2(m[1][1], m[1][2]), vec2(m[2][1], m[2][2])]
//     var a01 = [vec2(m[1][0], m[1][2]), vec2(m[2][0], m[2][2])]
//     var a02 = [vec2(m[1][0], m[1][1]), vec2(m[2][0], m[2][1])]
//     var a10 = [vec2(m[0][1], m[0][2]), vec2(m[2][1], m[2][2])]
//     var a11 = [vec2(m[0][0], m[0][2]), vec2(m[2][0], m[2][2])]
//     var a12 = [vec2(m[0][0], m[0][1]), vec2(m[2][0], m[2][1])]
//     var a20 = [vec2(m[0][1], m[0][2]), vec2(m[1][1], m[1][2])]
//     var a21 = [vec2(m[0][0], m[0][2]), vec2(m[1][0], m[1][2])]
//     var a22 = [vec2(m[0][0], m[0][1]), vec2(m[1][0], m[1][1])]

//     a[0][0] = det2(a00) / d
//     a[0][1] = -det2(a10) / d
//     a[0][2] = det2(a20) / d
//     a[1][0] = -det2(a01) / d
//     a[1][1] = det2(a11) / d
//     a[1][2] = -det2(a21) / d
//     a[2][0] = det2(a02) / d
//     a[2][1] = -det2(a12) / d
//     a[2][2] = det2(a22) / d

//     return a
// }

// function inverse4(m) {
//     var a = mat4()
//     var d = det4(m)

//     var a00 = [
//         vec3(m[1][1], m[1][2], m[1][3]),
//         vec3(m[2][1], m[2][2], m[2][3]),
//         vec3(m[3][1], m[3][2], m[3][3]),
//     ]
//     var a01 = [
//         vec3(m[1][0], m[1][2], m[1][3]),
//         vec3(m[2][0], m[2][2], m[2][3]),
//         vec3(m[3][0], m[3][2], m[3][3]),
//     ]
//     var a02 = [
//         vec3(m[1][0], m[1][1], m[1][3]),
//         vec3(m[2][0], m[2][1], m[2][3]),
//         vec3(m[3][0], m[3][1], m[3][3]),
//     ]
//     var a03 = [
//         vec3(m[1][0], m[1][1], m[1][2]),
//         vec3(m[2][0], m[2][1], m[2][2]),
//         vec3(m[3][0], m[3][1], m[3][2]),
//     ]
//     var a10 = [
//         vec3(m[0][1], m[0][2], m[0][3]),
//         vec3(m[2][1], m[2][2], m[2][3]),
//         vec3(m[3][1], m[3][2], m[3][3]),
//     ]
//     var a11 = [
//         vec3(m[0][0], m[0][2], m[0][3]),
//         vec3(m[2][0], m[2][2], m[2][3]),
//         vec3(m[3][0], m[3][2], m[3][3]),
//     ]
//     var a12 = [
//         vec3(m[0][0], m[0][1], m[0][3]),
//         vec3(m[2][0], m[2][1], m[2][3]),
//         vec3(m[3][0], m[3][1], m[3][3]),
//     ]
//     var a13 = [
//         vec3(m[0][0], m[0][1], m[0][2]),
//         vec3(m[2][0], m[2][1], m[2][2]),
//         vec3(m[3][0], m[3][1], m[3][2]),
//     ]
//     var a20 = [
//         vec3(m[0][1], m[0][2], m[0][3]),
//         vec3(m[1][1], m[1][2], m[1][3]),
//         vec3(m[3][1], m[3][2], m[3][3]),
//     ]
//     var a21 = [
//         vec3(m[0][0], m[0][2], m[0][3]),
//         vec3(m[1][0], m[1][2], m[1][3]),
//         vec3(m[3][0], m[3][2], m[3][3]),
//     ]
//     var a22 = [
//         vec3(m[0][0], m[0][1], m[0][3]),
//         vec3(m[1][0], m[1][1], m[1][3]),
//         vec3(m[3][0], m[3][1], m[3][3]),
//     ]
//     var a23 = [
//         vec3(m[0][0], m[0][1], m[0][2]),
//         vec3(m[1][0], m[1][1], m[1][2]),
//         vec3(m[3][0], m[3][1], m[3][2]),
//     ]

//     var a30 = [
//         vec3(m[0][1], m[0][2], m[0][3]),
//         vec3(m[1][1], m[1][2], m[1][3]),
//         vec3(m[2][1], m[2][2], m[2][3]),
//     ]
//     var a31 = [
//         vec3(m[0][0], m[0][2], m[0][3]),
//         vec3(m[1][0], m[1][2], m[1][3]),
//         vec3(m[2][0], m[2][2], m[2][3]),
//     ]
//     var a32 = [
//         vec3(m[0][0], m[0][1], m[0][3]),
//         vec3(m[1][0], m[1][1], m[1][3]),
//         vec3(m[2][0], m[2][1], m[2][3]),
//     ]
//     var a33 = [
//         vec3(m[0][0], m[0][1], m[0][2]),
//         vec3(m[1][0], m[1][1], m[1][2]),
//         vec3(m[2][0], m[2][1], m[2][2]),
//     ]

//     a[0][0] = det3(a00) / d
//     a[0][1] = -det3(a10) / d
//     a[0][2] = det3(a20) / d
//     a[0][3] = -det3(a30) / d
//     a[1][0] = -det3(a01) / d
//     a[1][1] = det3(a11) / d
//     a[1][2] = -det3(a21) / d
//     a[1][3] = det3(a31) / d
//     a[2][0] = det3(a02) / d
//     a[2][1] = -det3(a12) / d
//     a[2][2] = det3(a22) / d
//     a[2][3] = -det3(a32) / d
//     a[3][0] = -det3(a03) / d
//     a[3][1] = det3(a13) / d
//     a[3][2] = -det3(a23) / d
//     a[3][3] = det3(a33) / d

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
