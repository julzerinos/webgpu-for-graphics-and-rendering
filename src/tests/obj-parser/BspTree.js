// 02562 Rendering Framework
// Inspired by BSP tree in GEL (https://www2.compute.dtu.dk/projects/GEL/)
// BSP tree in GEL originally written by Bent Dalgaard Larsen.
// This file written by Jeppe Revall Frisvad, 2023
// Copyright (c) DTU Compute 2023

const max_objects = 4 // maximum number of objects in a leaf
const max_level = 20 // maximum number of levels in the tree
const f_eps = 1.0e-6
const d_eps = 1.0e-12
const BspNodeType = {
    bsp_x_axis: 0,
    bsp_y_axis: 1,
    bsp_z_axis: 2,
    bsp_leaf: 3,
}
var tree_objects = []
var root = null
var treeIds, bspTree, bspPlanes

function AccObj(idx, v0, v1, v2) {
    this.prim_idx = idx
    this.bbox = new Aabb(v0, v1, v2)
    return this
}

export function BspTree(objects) {
    this.max_level = max_level
    this.count = objects.length
    this.id = 0
    this.bbox = new Aabb()
    for (var i = 0; i < objects.length; ++i) this.bbox.include(objects[i].bbox)
    subdivide_node(this, this.bbox, 0, objects)
    return this
}

function subdivide_node(node, bbox, level, objects) {
    const TESTS = 4

    if (objects.length <= max_objects || level == max_level) {
        node.axis_leaf = BspNodeType.bsp_leaf
        node.id = tree_objects.length
        node.count = objects.length
        node.plane = 0.0

        for (var i = 0; i < objects.length; ++i) tree_objects.push(objects[i])
    } else {
        let left_objects = []
        let right_objects = []
        node.left = new Object()
        node.right = new Object()

        var min_cost = 1.0e27
        for (var i = 0; i < 3; ++i) {
            for (var k = 1; k < TESTS; ++k) {
                let left_bbox = new Aabb(bbox)
                let right_bbox = new Aabb(bbox)
                const max_corner = bbox.max[i]
                const min_corner = bbox.min[i]
                const center = ((max_corner - min_corner) * k) / TESTS + min_corner
                left_bbox.max[i] = center
                right_bbox.min[i] = center

                // Try putting the triangles in the left and right boxes
                var left_count = 0
                var right_count = 0
                for (var j = 0; j < objects.length; ++j) {
                    let obj = objects[j]
                    left_count += left_bbox.intersects(obj.bbox)
                    right_count += right_bbox.intersects(obj.bbox)
                }

                const cost = left_count * left_bbox.area() + right_count * right_bbox.area()
                if (cost < min_cost) {
                    min_cost = cost
                    node.axis_leaf = i
                    node.plane = center
                    node.left.count = left_count
                    node.left.id = 0
                    node.right.count = right_count
                    node.right.id = 0
                }
            }
        }

        // Now chose the right splitting plane
        const max_corner = bbox.max[node.axis_leaf]
        const min_corner = bbox.min[node.axis_leaf]
        const size = max_corner - min_corner
        const diff = f_eps < size / 8.0 ? size / 8.0 : f_eps
        let center = node.plane

        if (node.left.count == 0) {
            // Find min position of all triangle vertices and place the center there
            center = max_corner
            for (var j = 0; j < objects.length; ++j) {
                let obj = objects[j]
                let obj_min_corner = obj.bbox.min[node.axis_leaf]
                if (obj_min_corner < center) center = obj_min_corner
            }
            center -= diff
        }
        if (node.right.count == 0) {
            // Find max position of all triangle vertices and place the center there
            center = min_corner
            for (var j = 0; j < objects.length; ++j) {
                let obj = objects[j]
                let obj_max_corner = obj.bbox.max[node.axis_leaf]
                if (obj_max_corner > center) center = obj_max_corner
            }
            center += diff
        }

        node.plane = center
        let left_bbox = new Aabb(bbox)
        let right_bbox = new Aabb(bbox)
        left_bbox.max[node.axis_leaf] = center
        right_bbox.min[node.axis_leaf] = center

        // Now put the triangles in the right and left node
        for (var j = 0; j < objects.length; ++j) {
            let obj = objects[j]
            if (left_bbox.intersects(obj.bbox)) left_objects.push(obj)
            if (right_bbox.intersects(obj.bbox)) right_objects.push(obj)
        }

        objects = []
        subdivide_node(node.left, left_bbox, level + 1, left_objects)
        subdivide_node(node.right, right_bbox, level + 1, right_objects)
    }
}

export function build_bsp_tree(drawingInfo, device, buffers) {
    var objects = []
    for (var i = 0; i < drawingInfo.indices.length / 4; ++i) {
        let face = [
            drawingInfo.indices[i * 4] * 4,
            drawingInfo.indices[i * 4 + 1] * 4,
            drawingInfo.indices[i * 4 + 2] * 4,
        ]
        let v0 = vec3(
            drawingInfo.vertices[face[0]],
            drawingInfo.vertices[face[0] + 1],
            drawingInfo.vertices[face[0] + 2]
        )
        let v1 = vec3(
            drawingInfo.vertices[face[1]],
            drawingInfo.vertices[face[1] + 1],
            drawingInfo.vertices[face[1] + 2]
        )
        let v2 = vec3(
            drawingInfo.vertices[face[2]],
            drawingInfo.vertices[face[2] + 1],
            drawingInfo.vertices[face[2] + 2]
        )
        let acc_obj = new AccObj(i, v0, v1, v2)
        objects.push(acc_obj)
    }
    root = new BspTree(objects)
    treeIds = new Uint32Array(tree_objects.length)
    for (var i = 0; i < tree_objects.length; ++i) treeIds[i] = tree_objects[i].prim_idx
    const bspTreeNodes = (1 << (max_level + 1)) - 1
    bspPlanes = new Float32Array(bspTreeNodes)
    bspTree = new Uint32Array(bspTreeNodes * 4)

    function build_bsp_array(node, level, branch) {
        if (level > max_level) return
        let idx = (1 << level) - 1 + branch
        bspTree[idx * 4] = node.axis_leaf + (node.count << 2)
        bspTree[idx * 4 + 1] = node.id
        bspTree[idx * 4 + 2] = (1 << (level + 1)) - 1 + 2 * branch
        bspTree[idx * 4 + 3] = (1 << (level + 1)) + 2 * branch
        bspPlanes[idx] = node.plane
        if (node.axis_leaf === BspNodeType.bsp_leaf) return
        build_bsp_array(node.left, level + 1, branch * 2)
        build_bsp_array(node.right, level + 1, branch * 2 + 1)
    }
    build_bsp_array(root, 0, 0)

    // buffers.positions = device.createBuffer({
    //     size: drawingInfo.vertices.byteLength,
    //     usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE,
    // })
    // device.queue.writeBuffer(buffers.positions, 0, drawingInfo.vertices)

    // buffers.normals = device.createBuffer({
    //     size: drawingInfo.normals.byteLength,
    //     usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE,
    // })
    // device.queue.writeBuffer(buffers.normals, 0, drawingInfo.normals)

    // buffers.colors = device.createBuffer({
    //     size: drawingInfo.colors.byteLength,
    //     usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE,
    // })
    // device.queue.writeBuffer(buffers.colors, 0, drawingInfo.colors)

    // buffers.indices = device.createBuffer({
    //     size: drawingInfo.indices.byteLength,
    //     usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE,
    // })
    // device.queue.writeBuffer(buffers.indices, 0, drawingInfo.indices)

    // buffers.treeIds = device.createBuffer({
    //     size: treeIds.byteLength,
    //     usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE,
    // })
    // device.queue.writeBuffer(buffers.treeIds, 0, treeIds)

    // buffers.bspTree = device.createBuffer({
    //     size: bspTree.byteLength,
    //     usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE,
    // })
    // device.queue.writeBuffer(buffers.bspTree, 0, bspTree)

    // buffers.bspPlanes = device.createBuffer({
    //     size: bspPlanes.byteLength,
    //     usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.STORAGE,
    // })
    // device.queue.writeBuffer(buffers.bspPlanes, 0, bspPlanes)

    // const bbox = flatten([vec4(root.bbox.min), vec4(root.bbox.max)])
    // buffers.aabb = device.createBuffer({
    //     size: bbox.byteLength,
    //     usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    // })
    // device.queue.writeBuffer(buffers.aabb, 0, bbox)

    return {
        vertices: drawingInfo.vertices,
        normals: drawingInfo.normals,
        colors: drawingInfo.colors,
        indices: drawingInfo.indices,
        treeIds,
        bspTree,
        bspPlanes,
        aabb: root.bbox,
    }
}

function intersect_triangle(drawingInfo, r, hit, idx) {
    let face_x = drawingInfo.indices[idx * 4] * 4
    let face_y = drawingInfo.indices[idx * 4 + 1] * 4
    let face_z = drawingInfo.indices[idx * 4 + 2] * 4
    let v0 = vec3(
        drawingInfo.vertices[face_x],
        drawingInfo.vertices[face_x + 1],
        drawingInfo.vertices[face_x + 2]
    )
    let v1 = vec3(
        drawingInfo.vertices[face_y],
        drawingInfo.vertices[face_y + 1],
        drawingInfo.vertices[face_y + 2]
    )
    let v2 = vec3(
        drawingInfo.vertices[face_z],
        drawingInfo.vertices[face_z + 1],
        drawingInfo.vertices[face_z + 2]
    )
    let e0 = subtract(v1, v0)
    let e1 = subtract(v2, v0)
    let n = cross(e0, e1)
    let denom = dot(r.direction, n)
    if (Math.abs(denom) < 1.0e-8) {
        return false
    }
    let a = vec3(
        (v0[0] - r.origin[0]) / denom,
        (v0[1] - r.origin[1]) / denom,
        (v0[2] - r.origin[2]) / denom
    )
    let t = dot(a, n)
    if (t < r.tmin || t > r.tmax) {
        return false
    }
    let b = cross(a, r.direction)
    let beta = dot(b, e1)
    let gamma = -dot(b, e0)
    if (beta >= 0.0 && gamma >= 0.0 && beta + gamma <= 1.0) {
        hit.has_hit = true
        hit.dist = t
        hit.position = vec3(
            r.origin[0] + t * r.direction[0],
            r.origin[1] + t * r.direction[1],
            r.origin[2] + t * r.direction[2]
        )
        hit.normal = normalize(n)
        return true
    }
    return false
}

function intersect_min_max(r) {
    var tmin = -1.0e32
    var tmax = 1.0e32
    for (var i = 0; i < 3; ++i)
        if (Math.abs(r.direction[i]) > 1.0e-8) {
            const p1 = (root.bbox.min[i] - r.origin[i]) / r.direction[i]
            const p2 = (root.bbox.max[i] - r.origin[i]) / r.direction[i]
            const pmin = Math.min(p1, p2)
            const pmax = Math.max(p1, p2)
            tmin = Math.max(tmin, pmin)
            tmax = Math.min(tmax, pmax)
        }
    if (tmin > tmax || tmin > r.tmax || tmax < r.tmin) return false
    r.tmin = Math.max(tmin - 1.0e-4, r.tmin)
    r.tmax = Math.min(tmax + 1.0e-4, r.tmax)
    return true
}

function intersect_bsp_array(ray, hit) {
    let branch_node = new Uint32Array(max_level * 2)
    let branch_ray = new Float32Array(max_level * 2)
    let branch_lvl = 0
    let near_node = 0
    let far_node = 0
    let t = 0.0
    let node = 0
    for (let i = 0; i <= max_level; ++i) {
        let node_axis_leaf = bspTree[node * 4] & 3
        if (node_axis_leaf === BspNodeType.bsp_leaf) {
            const node_count = bspTree[node * 4] >> 2
            let found = false
            for (let j = 0; j < node_count; ++j) {
                const node_id = bspTree[node * 4 + 1]
                const obj_idx = treeIds[node_id + j]
                if (intersect_triangle(ray, hit, obj_idx)) {
                    ray.tmax = hit.dist
                    found = true
                }
            }
            if (found) {
                return true
            } else if (branch_lvl === 0) {
                return false
            } else {
                --branch_lvl
                i = branch_node[branch_lvl * 2]
                node = branch_node[branch_lvl * 2 + 1]
                ray.tmin = branch_ray[branch_lvl * 2]
                ray.tmax = branch_ray[branch_lvl * 2 + 1]
                continue
            }
        }

        const axis_direction = ray.direction[node_axis_leaf]
        const axis_origin = ray.origin[node_axis_leaf]
        if (axis_direction >= 0.0) {
            near_node = bspTree[node * 4 + 2] // left
            far_node = bspTree[node * 4 + 3] // right
        } else {
            near_node = bspTree[node * 4 + 3] // right
            far_node = bspTree[node * 4 + 2] // left
        }

        const node_plane = bspPlanes[node]
        const denom = Math.abs(axis_direction) < d_eps ? d_eps : axis_direction
        t = (node_plane - axis_origin) / denom

        if (t > ray.tmax) {
            node = near_node
        } else if (t < ray.tmin) {
            node = far_node
        } else {
            branch_node[branch_lvl * 2] = i
            branch_node[branch_lvl * 2 + 1] = far_node
            branch_ray[branch_lvl * 2] = t
            branch_ray[branch_lvl * 2 + 1] = ray.tmax
            ++branch_lvl
            ray.tmax = t
            node = near_node
        }
    }
    return false
}

function intersect_trimesh(ray, hit) {
    var subtree = []
    var near_node = null
    var far_node = null
    var t = 0.0
    var node = root
    for (let i = 0; i <= root.max_level; ++i) {
        if (node.axis_leaf === BspNodeType.bsp_leaf) {
            var found = false
            for (let j = 0; j < node.count; ++j) {
                const obj = tree_objects[node.id + j]
                if (intersect_triangle(ray, hit, obj.prim_idx)) {
                    ray.tmax = hit.dist
                    found = true
                }
            }
            if (found) return true
            else if (subtree.length === 0) return false
            else {
                branch = subtree.pop()
                i = branch.i
                ray.tmin = branch.tmin
                ray.tmax = branch.tmax
                node = branch.node
                continue
            }
        }

        const axis_direction = ray.direction[node.axis_leaf]
        const axis_origin = ray.origin[node.axis_leaf]
        if (axis_direction >= 0.0) {
            near_node = node.left
            far_node = node.right
        } else {
            near_node = node.right
            far_node = node.left
        }

        const denom = Math.abs(axis_direction) < d_eps ? d_eps : axis_direction
        t = (node.plane - axis_origin) / denom

        if (t > ray.tmax) node = near_node
        else if (t < ray.tmin) node = far_node
        else {
            var branch = new Object()
            branch.i = i
            branch.tmin = t
            branch.tmax = ray.tmax
            branch.node = far_node
            subtree.push(branch)
            ray.tmax = t
            node = near_node
        }
    }
}

function intersect_node(ray, hit, node) {
    if (node.axis_leaf === BspNodeType.bsp_leaf) {
        var found = false
        for (var i = 0; i < node.count; ++i) {
            const obj = tree_objects[node.id + i]
            if (intersect_triangle(ray, hit, obj.prim_idx)) {
                ray.tmax = hit.dist
                found = true
            }
        }
        return found
    } else {
        var near_node = null
        var far_node = null
        const axis_direction = ray.direction[node.axis_leaf]
        const axis_origin = ray.origin[node.axis_leaf]
        if (axis_direction >= 0.0) {
            near_node = node.left
            far_node = node.right
        } else {
            near_node = node.right
            far_node = node.left
        }

        var t = 0.0
        if (Math.abs(axis_direction) < d_eps) t = (node.plane - axis_origin) / d_eps
        else t = (node.plane - axis_origin) / axis_direction

        if (t > ray.tmax) return intersect_node(ray, hit, near_node)
        else if (t < ray.tmin) return intersect_node(ray, hit, far_node)
        else {
            var t_max = ray.tmax
            ray.tmax = t
            if (intersect_node(ray, hit, near_node)) return true
            else {
                ray.tmin = t
                ray.tmax = t_max
                return intersect_node(ray, hit, far_node)
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////////////
//
//  Angel.js
//
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------
//
//  Helper functions
//

function _argumentsToArray(args) {
    return [].concat.apply([], Array.prototype.slice.apply(args))
}

//----------------------------------------------------------------------------

function radians(degrees) {
    return (degrees * Math.PI) / 180.0
}

//----------------------------------------------------------------------------
//
//  Vector Constructors
//

function vec2() {
    var result = _argumentsToArray(arguments)

    switch (result.length) {
        case 0:
            result.push(0.0)
        case 1:
            result.push(0.0)
    }

    return result.splice(0, 2)
}

function vec3() {
    var result = _argumentsToArray(arguments)

    switch (result.length) {
        case 0:
            result.push(0.0)
        case 1:
            result.push(0.0)
        case 2:
            result.push(0.0)
    }

    return result.splice(0, 3)
}

function vec4() {
    var result = _argumentsToArray(arguments)

    switch (result.length) {
        case 0:
            result.push(0.0)
        case 1:
            result.push(0.0)
        case 2:
            result.push(0.0)
        case 3:
            result.push(1.0)
    }

    return result.splice(0, 4)
}

//----------------------------------------------------------------------------
//
//  Matrix Constructors
//

function mat2() {
    var v = _argumentsToArray(arguments)

    var m = []
    switch (v.length) {
        case 0:
            v[0] = 1
        case 1:
            m = [vec2(v[0], 0.0), vec2(0.0, v[0])]
            break

        default:
            m.push(vec2(v))
            v.splice(0, 2)
            m.push(vec2(v))
            break
    }

    m.matrix = true

    return m
}

//----------------------------------------------------------------------------

function mat3() {
    var v = _argumentsToArray(arguments)

    var m = []
    switch (v.length) {
        case 0:
            v[0] = 1
        case 1:
            m = [vec3(v[0], 0.0, 0.0), vec3(0.0, v[0], 0.0), vec3(0.0, 0.0, v[0])]
            break

        default:
            m.push(vec3(v))
            v.splice(0, 3)
            m.push(vec3(v))
            v.splice(0, 3)
            m.push(vec3(v))
            break
    }

    m.matrix = true

    return m
}

//----------------------------------------------------------------------------

function mat4() {
    var v = _argumentsToArray(arguments)

    var m = []
    switch (v.length) {
        case 0:
            v[0] = 1
        case 1:
            m = [
                vec4(v[0], 0.0, 0.0, 0.0),
                vec4(0.0, v[0], 0.0, 0.0),
                vec4(0.0, 0.0, v[0], 0.0),
                vec4(0.0, 0.0, 0.0, v[0]),
            ]
            break

        default:
            m.push(vec4(v))
            v.splice(0, 4)
            m.push(vec4(v))
            v.splice(0, 4)
            m.push(vec4(v))
            v.splice(0, 4)
            m.push(vec4(v))
            break
    }

    m.matrix = true

    return m
}

//----------------------------------------------------------------------------
//
//  Generic Mathematical Operations for Vectors and Matrices
//

function equal(u, v) {
    if (u.length != v.length) {
        return false
    }

    if (u.matrix && v.matrix) {
        for (var i = 0; i < u.length; ++i) {
            if (u[i].length != v[i].length) {
                return false
            }
            for (var j = 0; j < u[i].length; ++j) {
                if (u[i][j] !== v[i][j]) {
                    return false
                }
            }
        }
    } else if ((u.matrix && !v.matrix) || (!u.matrix && v.matrix)) {
        return false
    } else {
        for (var i = 0; i < u.length; ++i) {
            if (u[i] !== v[i]) {
                return false
            }
        }
    }

    return true
}

//----------------------------------------------------------------------------

function add(u, v) {
    var result = []

    if (u.matrix && v.matrix) {
        if (u.length != v.length) {
            throw "add(): trying to add matrices of different dimensions"
        }

        for (var i = 0; i < u.length; ++i) {
            if (u[i].length != v[i].length) {
                throw "add(): trying to add matrices of different dimensions"
            }
            result.push([])
            for (var j = 0; j < u[i].length; ++j) {
                result[i].push(u[i][j] + v[i][j])
            }
        }

        result.matrix = true

        return result
    } else if ((u.matrix && !v.matrix) || (!u.matrix && v.matrix)) {
        throw "add(): trying to add matrix and non-matrix variables"
    } else {
        if (u.length != v.length) {
            throw "add(): vectors are not the same dimension"
        }

        for (var i = 0; i < u.length; ++i) {
            result.push(u[i] + v[i])
        }

        return result
    }
}

//----------------------------------------------------------------------------

function subtract(u, v) {
    var result = []

    if (u.matrix && v.matrix) {
        if (u.length != v.length) {
            throw "subtract(): trying to subtract matrices" + " of different dimensions"
        }

        for (var i = 0; i < u.length; ++i) {
            if (u[i].length != v[i].length) {
                throw "subtract(): trying to subtact matrices" + " of different dimensions"
            }
            result.push([])
            for (var j = 0; j < u[i].length; ++j) {
                result[i].push(u[i][j] - v[i][j])
            }
        }

        result.matrix = true

        return result
    } else if ((u.matrix && !v.matrix) || (!u.matrix && v.matrix)) {
        throw "subtact(): trying to subtact  matrix and non-matrix variables"
    } else {
        if (u.length != v.length) {
            throw "subtract(): vectors are not the same length"
        }

        for (var i = 0; i < u.length; ++i) {
            result.push(u[i] - v[i])
        }

        return result
    }
}

//----------------------------------------------------------------------------

function mult(u, v) {
    var result = []

    if (u.matrix && v.matrix) {
        if (u.length != v.length) {
            throw "mult(): trying to add matrices of different dimensions"
        }

        for (var i = 0; i < u.length; ++i) {
            if (u[i].length != v[i].length) {
                throw "mult(): trying to add matrices of different dimensions"
            }
        }

        for (var i = 0; i < u.length; ++i) {
            result.push([])

            for (var j = 0; j < v.length; ++j) {
                var sum = 0.0
                for (var k = 0; k < u.length; ++k) {
                    sum += u[i][k] * v[k][j]
                }
                result[i].push(sum)
            }
        }

        result.matrix = true

        return result
    }

    if (u.matrix && u.length == v.length) {
        for (var i = 0; i < v.length; i++) {
            var sum = 0.0
            for (var j = 0; j < v.length; j++) {
                sum += u[i][j] * v[j]
            }
            result.push(sum)
        }
        return result
    } else {
        if (u.length != v.length) {
            throw "mult(): vectors are not the same dimension"
        }

        for (var i = 0; i < u.length; ++i) {
            result.push(u[i] * v[i])
        }

        return result
    }
}

//----------------------------------------------------------------------------
//
//  Basic Transformation Matrix Generators
//

function translate(x, y, z) {
    if (Array.isArray(x) && x.length == 3) {
        z = x[2]
        y = x[1]
        x = x[0]
    }

    var result = mat4()
    result[0][3] = x
    result[1][3] = y
    result[2][3] = z

    return result
}

//----------------------------------------------------------------------------

function rotate(angle, axis) {
    if (!Array.isArray(axis)) {
        axis = [arguments[1], arguments[2], arguments[3]]
    }

    var v = normalize(axis)

    var x = v[0]
    var y = v[1]
    var z = v[2]

    var c = Math.cos(radians(angle))
    var omc = 1.0 - c
    var s = Math.sin(radians(angle))

    var result = mat4(
        vec4(x * x * omc + c, x * y * omc - z * s, x * z * omc + y * s, 0.0),
        vec4(x * y * omc + z * s, y * y * omc + c, y * z * omc - x * s, 0.0),
        vec4(x * z * omc - y * s, y * z * omc + x * s, z * z * omc + c, 0.0),
        vec4()
    )

    return result
}

function rotateX(theta) {
    var c = Math.cos(radians(theta))
    var s = Math.sin(radians(theta))
    var rx = mat4(1.0, 0.0, 0.0, 0.0, 0.0, c, s, 0.0, 0.0, -s, c, 0.0, 0.0, 0.0, 0.0, 1.0)
    return rx
}
function rotateY(theta) {
    var c = Math.cos(radians(theta))
    var s = Math.sin(radians(theta))
    var ry = mat4(c, 0.0, -s, 0.0, 0.0, 1.0, 0.0, 0.0, s, 0.0, c, 0.0, 0.0, 0.0, 0.0, 1.0)
    return ry
}
function rotateZ(theta) {
    var c = Math.cos(radians(theta))
    var s = Math.sin(radians(theta))
    var rz = mat4(c, s, 0.0, 0.0, -s, c, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0)
    return rz
}

//----------------------------------------------------------------------------

function scalem(x, y, z) {
    if (Array.isArray(x) && x.length == 3) {
        z = x[2]
        y = x[1]
        x = x[0]
    }

    var result = mat4()
    result[0][0] = x
    result[1][1] = y
    result[2][2] = z

    return result
}

//----------------------------------------------------------------------------
//
//  ModelView Matrix Generators
//

function lookAt(eye, at, up) {
    if (!Array.isArray(eye) || eye.length != 3) {
        throw "lookAt(): first parameter [eye] must be an a vec3"
    }

    if (!Array.isArray(at) || at.length != 3) {
        throw "lookAt(): first parameter [at] must be an a vec3"
    }

    if (!Array.isArray(up) || up.length != 3) {
        throw "lookAt(): first parameter [up] must be an a vec3"
    }

    if (equal(eye, at)) {
        return mat4()
    }

    var v = normalize(subtract(at, eye)) // view direction vector
    var n = normalize(cross(v, up)) // perpendicular vector
    var u = normalize(cross(n, v)) // "new" up vector

    v = negate(v)

    var result = mat4(vec4(n, -dot(n, eye)), vec4(u, -dot(u, eye)), vec4(v, -dot(v, eye)), vec4())

    return result
}

//----------------------------------------------------------------------------
//
//  Projection Matrix Generators
//

function ortho(left, right, bottom, top, near, far) {
    if (left == right) {
        throw "ortho(): left and right are equal"
    }
    if (bottom == top) {
        throw "ortho(): bottom and top are equal"
    }
    if (near == far) {
        throw "ortho(): near and far are equal"
    }

    var w = right - left
    var h = top - bottom
    var d = far - near

    var result = mat4()
    result[0][0] = 2.0 / w
    result[1][1] = 2.0 / h
    result[2][2] = -2.0 / d
    result[0][3] = -(left + right) / w
    result[1][3] = -(top + bottom) / h
    result[2][3] = -(near + far) / d

    return result
}

//----------------------------------------------------------------------------

function perspective(fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(radians(fovy) / 2)
    var d = far - near

    var result = mat4()
    result[0][0] = f / aspect
    result[1][1] = f
    result[2][2] = -(near + far) / d
    result[2][3] = (-2 * near * far) / d
    result[3][2] = -1
    result[3][3] = 0.0

    return result
}

//----------------------------------------------------------------------------
//
//  Matrix Functions
//

function transpose(m) {
    if (!m.matrix) {
        return "transpose(): trying to transpose a non-matrix"
    }

    var result = []
    for (var i = 0; i < m.length; ++i) {
        result.push([])
        for (var j = 0; j < m[i].length; ++j) {
            result[i].push(m[j][i])
        }
    }

    result.matrix = true

    return result
}

//----------------------------------------------------------------------------
//
//  Vector Functions
//

function dot(u, v) {
    if (u.length != v.length) {
        throw "dot(): vectors are not the same dimension"
    }

    var sum = 0.0
    for (var i = 0; i < u.length; ++i) {
        sum += u[i] * v[i]
    }

    return sum
}

//----------------------------------------------------------------------------

function negate(u) {
    var result = []
    for (var i = 0; i < u.length; ++i) {
        result.push(-u[i])
    }

    return result
}

//----------------------------------------------------------------------------

function cross(u, v) {
    if (!Array.isArray(u) || u.length < 3) {
        throw "cross(): first argument is not a vector of at least 3"
    }

    if (!Array.isArray(v) || v.length < 3) {
        throw "cross(): second argument is not a vector of at least 3"
    }

    var result = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]

    return result
}

//----------------------------------------------------------------------------

function length(u) {
    return Math.sqrt(dot(u, u))
}

//----------------------------------------------------------------------------

function normalize(u, excludeLastComponent) {
    if (excludeLastComponent) {
        var last = u.pop()
    }

    var len = length(u)

    if (!isFinite(len)) {
        throw "normalize: vector " + u + " has zero length"
    }

    for (var i = 0; i < u.length; ++i) {
        u[i] /= len
    }

    if (excludeLastComponent) {
        u.push(last)
    }

    return u
}

//----------------------------------------------------------------------------

function mix(u, v, s) {
    if (typeof s !== "number") {
        throw "mix: the last paramter " + s + " must be a number"
    }

    if (u.length != v.length) {
        throw "vector dimension mismatch"
    }

    var result = []
    for (var i = 0; i < u.length; ++i) {
        result.push((1.0 - s) * u[i] + s * v[i])
    }

    return result
}

//----------------------------------------------------------------------------
//
// Vector and Matrix functions
//

function scale(s, u) {
    if (!Array.isArray(u)) {
        throw "scale: second parameter " + u + " is not a vector"
    }

    var result = []
    for (var i = 0; i < u.length; ++i) {
        result.push(s * u[i])
    }

    return result
}

//----------------------------------------------------------------------------
//
//
//

function flatten(v) {
    if (v.matrix === true) {
        v = transpose(v)
    }

    var n = v.length
    var elemsAreArrays = false

    if (Array.isArray(v[0])) {
        elemsAreArrays = true
        n *= v[0].length
    }

    var floats = new Float32Array(n)

    if (elemsAreArrays) {
        var idx = 0
        for (var i = 0; i < v.length; ++i) {
            for (var j = 0; j < v[i].length; ++j) {
                floats[idx++] = v[i][j]
            }
        }
    } else {
        for (var i = 0; i < v.length; ++i) {
            floats[i] = v[i]
        }
    }

    return floats
}

//----------------------------------------------------------------------------

var sizeof = {
    vec2: new Float32Array(flatten(vec2())).byteLength,
    vec3: new Float32Array(flatten(vec3())).byteLength,
    vec4: new Float32Array(flatten(vec4())).byteLength,
    mat2: new Float32Array(flatten(mat2())).byteLength,
    mat3: new Float32Array(flatten(mat3())).byteLength,
    mat4: new Float32Array(flatten(mat4())).byteLength,
}

// new functions 5/2/2015

// printing

function printm(m) {
    if (m.length == 2) for (var i = 0; i < m.length; i++) console.log(m[i][0], m[i][1])
    else if (m.length == 3)
        for (var i = 0; i < m.length; i++) console.log(m[i][0], m[i][1], m[i][2])
    else if (m.length == 4)
        for (var i = 0; i < m.length; i++) console.log(m[i][0], m[i][1], m[i][2], m[i][3])
}
// determinants

function det2(m) {
    return m[0][0] * m[1][1] - m[0][1] * m[1][0]
}

function det3(m) {
    var d =
        m[0][0] * m[1][1] * m[2][2] +
        m[0][1] * m[1][2] * m[2][0] +
        m[0][2] * m[2][1] * m[1][0] -
        m[2][0] * m[1][1] * m[0][2] -
        m[1][0] * m[0][1] * m[2][2] -
        m[0][0] * m[1][2] * m[2][1]
    return d
}

function det4(m) {
    var m0 = [
        vec3(m[1][1], m[1][2], m[1][3]),
        vec3(m[2][1], m[2][2], m[2][3]),
        vec3(m[3][1], m[3][2], m[3][3]),
    ]
    var m1 = [
        vec3(m[1][0], m[1][2], m[1][3]),
        vec3(m[2][0], m[2][2], m[2][3]),
        vec3(m[3][0], m[3][2], m[3][3]),
    ]
    var m2 = [
        vec3(m[1][0], m[1][1], m[1][3]),
        vec3(m[2][0], m[2][1], m[2][3]),
        vec3(m[3][0], m[3][1], m[3][3]),
    ]
    var m3 = [
        vec3(m[1][0], m[1][1], m[1][2]),
        vec3(m[2][0], m[2][1], m[2][2]),
        vec3(m[3][0], m[3][1], m[3][2]),
    ]
    return m[0][0] * det3(m0) - m[0][1] * det3(m1) + m[0][2] * det3(m2) - m[0][3] * det3(m3)
}

function det(m) {
    if (m.matrix != true) console.log("not a matrix")
    if (m.length == 2) return det2(m)
    if (m.length == 3) return det3(m)
    if (m.length == 4) return det4(m)
}

//---------------------------------------------------------

// inverses

function inverse2(m) {
    var a = mat2()
    var d = det2(m)
    a[0][0] = m[1][1] / d
    a[0][1] = -m[0][1] / d
    a[1][0] = -m[1][0] / d
    a[1][1] = m[0][0] / d
    a.matrix = true
    return a
}

function inverse3(m) {
    var a = mat3()
    var d = det3(m)

    var a00 = [vec2(m[1][1], m[1][2]), vec2(m[2][1], m[2][2])]
    var a01 = [vec2(m[1][0], m[1][2]), vec2(m[2][0], m[2][2])]
    var a02 = [vec2(m[1][0], m[1][1]), vec2(m[2][0], m[2][1])]
    var a10 = [vec2(m[0][1], m[0][2]), vec2(m[2][1], m[2][2])]
    var a11 = [vec2(m[0][0], m[0][2]), vec2(m[2][0], m[2][2])]
    var a12 = [vec2(m[0][0], m[0][1]), vec2(m[2][0], m[2][1])]
    var a20 = [vec2(m[0][1], m[0][2]), vec2(m[1][1], m[1][2])]
    var a21 = [vec2(m[0][0], m[0][2]), vec2(m[1][0], m[1][2])]
    var a22 = [vec2(m[0][0], m[0][1]), vec2(m[1][0], m[1][1])]

    a[0][0] = det2(a00) / d
    a[0][1] = -det2(a10) / d
    a[0][2] = det2(a20) / d
    a[1][0] = -det2(a01) / d
    a[1][1] = det2(a11) / d
    a[1][2] = -det2(a21) / d
    a[2][0] = det2(a02) / d
    a[2][1] = -det2(a12) / d
    a[2][2] = det2(a22) / d

    return a
}

function inverse4(m) {
    var a = mat4()
    var d = det4(m)

    var a00 = [
        vec3(m[1][1], m[1][2], m[1][3]),
        vec3(m[2][1], m[2][2], m[2][3]),
        vec3(m[3][1], m[3][2], m[3][3]),
    ]
    var a01 = [
        vec3(m[1][0], m[1][2], m[1][3]),
        vec3(m[2][0], m[2][2], m[2][3]),
        vec3(m[3][0], m[3][2], m[3][3]),
    ]
    var a02 = [
        vec3(m[1][0], m[1][1], m[1][3]),
        vec3(m[2][0], m[2][1], m[2][3]),
        vec3(m[3][0], m[3][1], m[3][3]),
    ]
    var a03 = [
        vec3(m[1][0], m[1][1], m[1][2]),
        vec3(m[2][0], m[2][1], m[2][2]),
        vec3(m[3][0], m[3][1], m[3][2]),
    ]
    var a10 = [
        vec3(m[0][1], m[0][2], m[0][3]),
        vec3(m[2][1], m[2][2], m[2][3]),
        vec3(m[3][1], m[3][2], m[3][3]),
    ]
    var a11 = [
        vec3(m[0][0], m[0][2], m[0][3]),
        vec3(m[2][0], m[2][2], m[2][3]),
        vec3(m[3][0], m[3][2], m[3][3]),
    ]
    var a12 = [
        vec3(m[0][0], m[0][1], m[0][3]),
        vec3(m[2][0], m[2][1], m[2][3]),
        vec3(m[3][0], m[3][1], m[3][3]),
    ]
    var a13 = [
        vec3(m[0][0], m[0][1], m[0][2]),
        vec3(m[2][0], m[2][1], m[2][2]),
        vec3(m[3][0], m[3][1], m[3][2]),
    ]
    var a20 = [
        vec3(m[0][1], m[0][2], m[0][3]),
        vec3(m[1][1], m[1][2], m[1][3]),
        vec3(m[3][1], m[3][2], m[3][3]),
    ]
    var a21 = [
        vec3(m[0][0], m[0][2], m[0][3]),
        vec3(m[1][0], m[1][2], m[1][3]),
        vec3(m[3][0], m[3][2], m[3][3]),
    ]
    var a22 = [
        vec3(m[0][0], m[0][1], m[0][3]),
        vec3(m[1][0], m[1][1], m[1][3]),
        vec3(m[3][0], m[3][1], m[3][3]),
    ]
    var a23 = [
        vec3(m[0][0], m[0][1], m[0][2]),
        vec3(m[1][0], m[1][1], m[1][2]),
        vec3(m[3][0], m[3][1], m[3][2]),
    ]

    var a30 = [
        vec3(m[0][1], m[0][2], m[0][3]),
        vec3(m[1][1], m[1][2], m[1][3]),
        vec3(m[2][1], m[2][2], m[2][3]),
    ]
    var a31 = [
        vec3(m[0][0], m[0][2], m[0][3]),
        vec3(m[1][0], m[1][2], m[1][3]),
        vec3(m[2][0], m[2][2], m[2][3]),
    ]
    var a32 = [
        vec3(m[0][0], m[0][1], m[0][3]),
        vec3(m[1][0], m[1][1], m[1][3]),
        vec3(m[2][0], m[2][1], m[2][3]),
    ]
    var a33 = [
        vec3(m[0][0], m[0][1], m[0][2]),
        vec3(m[1][0], m[1][1], m[1][2]),
        vec3(m[2][0], m[2][1], m[2][2]),
    ]

    a[0][0] = det3(a00) / d
    a[0][1] = -det3(a10) / d
    a[0][2] = det3(a20) / d
    a[0][3] = -det3(a30) / d
    a[1][0] = -det3(a01) / d
    a[1][1] = det3(a11) / d
    a[1][2] = -det3(a21) / d
    a[1][3] = det3(a31) / d
    a[2][0] = det3(a02) / d
    a[2][1] = -det3(a12) / d
    a[2][2] = det3(a22) / d
    a[2][3] = -det3(a32) / d
    a[3][0] = -det3(a03) / d
    a[3][1] = det3(a13) / d
    a[3][2] = -det3(a23) / d
    a[3][3] = det3(a33) / d

    return a
}
function inverse(m) {
    if (m.matrix != true) console.log("not a matrix")
    if (m.length == 2) return inverse2(m)
    if (m.length == 3) return inverse3(m)
    if (m.length == 4) return inverse4(m)
}

function normalMatrix(m, flag) {
    var a = mat4()
    a = inverse(transpose(m))
    if (flag != true) return a
    else {
        var b = mat3()
        for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) b[i][j] = a[i][j]
        return b
    }
}

// Axis-aligned bounding box (Aabb)

function Aabb(v0, v1, v2) {
    if (v2) {
        this.min = vec3(
            Math.min(v0[0], Math.min(v1[0], v2[0])),
            Math.min(v0[1], Math.min(v1[1], v2[1])),
            Math.min(v0[2], Math.min(v1[2], v2[2]))
        )
        this.max = vec3(
            Math.max(v0[0], Math.max(v1[0], v2[0])),
            Math.max(v0[1], Math.max(v1[1], v2[1])),
            Math.max(v0[2], Math.max(v1[2], v2[2]))
        )
    } else if (v1) {
        this.min = vec3(v0[0], v0[1], v0[2])
        this.max = vec3(v1[0], v1[1], v1[2])
    } else if (v0) {
        this.min = vec3(v0.min[0], v0.min[1], v0.min[2])
        this.max = vec3(v0.max[0], v0.max[1], v0.max[2])
    } else {
        this.min = vec3(1.0e37, 1.0e37, 1.0e37)
        this.max = vec3(-1.0e37, -1.0e37, -1.0e37)
    }
    return this
}

Aabb.prototype.include = function (x) {
    if (x.min && x.max) {
        for (var i = 0; i < 3; ++i) {
            this.min[i] = Math.min(this.min[i], x.min[i])
            this.max[i] = Math.max(this.max[i], x.max[i])
        }
    } else {
        for (var i = 0; i < 3; ++i) {
            this.min[i] = Math.min(this.min[i], x[i])
            this.max[i] = Math.max(this.max[i], x[i])
        }
    }
}

Aabb.prototype.set = function (v0, v1, v2) {
    if (v2) {
        this.min = vec3(
            Math.min(v0[0], Math.min(v1[0], v2[0])),
            Math.min(v0[1], Math.min(v1[1], v2[1])),
            Math.min(v0[2], Math.min(v1[2], v2[2]))
        )
        this.max = vec3(
            Math.max(v0[0], Math.max(v1[0], v2[0])),
            Math.max(v0[1], Math.max(v1[1], v2[1])),
            Math.max(v0[2], Math.max(v1[2], v2[2]))
        )
    } else if (v1) {
        this.min = v0
        this.max = v1
    } else {
        this.min = vec3(1.0e37, 1.0e37, 1.0e37)
        this.max = vec3(-1.0e37, -1.0e37, -1.0e37)
    }
}

Aabb.prototype.center = function (dim) {
    if (dim) return (this.min[dim] + this.max[dim]) * 0.5
    return vec3(
        (this.min[0] + this.max[0]) * 0.5,
        (this.min[1] + this.max[1]) * 0.5,
        (this.min[2] + this.max[2]) * 0.5
    )
}

Aabb.prototype.extent = function (dim) {
    if (dim) return this.max[dim] - this.min[dim]
    return vec3(this.max[0] - this.min[0], this.max[1] - this.min[1], this.max[2] - this.min[2])
}

Aabb.prototype.volume = function () {
    let d = this.extent()
    return d[0] * d[1] * d[2]
}

Aabb.prototype.area = function () {
    return 2.0 * this.halfArea()
}

Aabb.prototype.halfArea = function () {
    let d = this.extent()
    return d[0] * d[1] + d[1] * d[2] + d[2] * d[0]
}

Aabb.prototype.longestAxis = function () {
    let d = this.extent()
    if (d[0] > d[1]) return d[0] > d[2] ? 0 : 2
    return d[1] > d[2] ? 1 : 2
}

Aabb.prototype.maxExtent = function () {
    return this.extent(this.longestAxis())
}

Aabb.prototype.intersects = function (other) {
    if (other.min[0] > this.max[0] || other.max[0] < this.min[0]) return false
    if (other.min[1] > this.max[1] || other.max[1] < this.min[1]) return false
    if (other.min[2] > this.max[2] || other.max[2] < this.min[2]) return false
    return true
}
