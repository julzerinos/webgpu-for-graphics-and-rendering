@group(0) @binding(0) var<storage> indices : array<vec4u>;
@group(0) @binding(1) var<storage> vertices : array<vec3f>;
@group(0) @binding(2) var<storage> normals : array<vec3f>;

struct Aabb {
    min : vec3f,
    max : vec3f,
};

struct objMeta {
    aabb : Aabb,
    triangle_count : u32
};

@group(1) @binding(0) var<uniform> obj_meta : objMeta;



@group(2) @binding(0) var<storage> treeIds : array<u32>;
@group(2) @binding(1) var<storage> bspTree : array<vec4u>;
@group(2) @binding(2) var<storage> bspPlanes : array<f32>;

const MAX_LEVEL = 20u;
const BSP_LEAF = 3u;
var<private> branch_node : array<vec2u, MAX_LEVEL>;
var<private> branch_ray : array<vec2f, MAX_LEVEL>;

const light_direction : vec3f = vec3f(-1.);
const light_intensity = 1.5;

const up = vec3f(0., 1., 0.);
const target_point = vec3f(-.02, .11, 0.);
const origin_point = vec3f(-.02, .11, .6);
const camera_constant = 3.5;

const f1en4 = 0.0001;
const f1en8 = 0.00000001;

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32
};

struct LightResult {
    multiplicative : vec3f,
    additive : vec3f
};

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    depth : i32,
    has_hit : bool,
    continue_trace : bool,

    dist : f32,
    position : vec3f,
    normal : vec3f,
    color : vec3f,

    diffuse : f32,
};

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

//Constructing rays //

fn generate_default_hitinfo() -> HitInfo
{
    return HitInfo(0, false, false, 0., vec3f(0.), vec3f(0.), vec3f(0.), 1.);
}

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * camera_constant;

    return construct_ray_100units(origin_point, normalize(q));
}

fn construct_ray_100units(origin : vec3f, direction : vec3f) -> Ray
{
    return construct_ray(origin, direction, .001, 100);
}

fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray
{
    var ray : Ray;
    ray.origin = origin;
    ray.direction = direction;
    ray.tmax = tmax;
    ray.tmin = tmin;
    return ray;
}


//Intersecting objects //

fn barycentric_normal(v_ns : array<vec3f, 3 >, beta : f32, gamma : f32) -> vec3f {
    var alpha = 1 - beta - gamma;
    var interpolated_normal = alpha * v_ns[0] + beta * v_ns[1] + gamma * v_ns[2];
    return normalize(interpolated_normal);
}

fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, face : u32) -> bool {
    var vertex_lookup = indices[face];
    var v = array<vec3f, 3 > (vertices[vertex_lookup.x], vertices[vertex_lookup.y], vertices[vertex_lookup.z]);
    var v_ns = array<vec3f, 3> (normals[vertex_lookup.x], normals[vertex_lookup.y], normals[vertex_lookup.z]);

    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);
    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var beta = dot(cross(from_origin, r.direction), e1) / denom;
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;

    var normal = n;

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).color = select((*hit).color, vec3f(.9), has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normalize(normal), has_hit);

    return has_hit;
}

fn intersect_trimesh(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    var branch_lvl = 0u;
    var near_node = 0u;
    var far_node = 0u;
    var t = 0.0f;
    var node = 0u;
    for(var i = 0u; i <= MAX_LEVEL; i++)
    {
        let tree_node = bspTree[node];
        let node_axis_leaf = tree_node.x&3u;
        if (node_axis_leaf == BSP_LEAF)
        {
            let node_count = tree_node.x>>2u;
            let node_id = tree_node.y;
            var found = false;

            for(var j = 0u; j < node_count; j++)
            {
                let obj_idx = treeIds[node_id + j];
                if(intersect_triangle(*r, hit, obj_idx))
                {
                    (*r).tmax = (*hit).dist;
                    found = true;
                }
            }

            if (found)
            {
                return true;
            }

            if (branch_lvl == 0u)
            {
                return false;
            }

            branch_lvl -= 1;
            i = branch_node[branch_lvl].x;
            node = branch_node[branch_lvl].y;
            (*r).tmin = branch_ray[branch_lvl].x;
            (*r).tmax = branch_ray[branch_lvl].y;

            continue;
        }
        let axis_direction = (*r).direction[node_axis_leaf];
        let axis_origin = (*r).origin[node_axis_leaf];
        if(axis_direction >= 0.0f)
        {
            near_node = tree_node.z;
            far_node = tree_node.w;
        }
        else
        {
            near_node = tree_node.w;
            far_node = tree_node.z;
        }
        let node_plane = bspPlanes[node];
        let denom = select(axis_direction, f1en8, abs(axis_direction) < f1en8);
        t = (node_plane - axis_origin) / denom;
        if(t > (*r).tmax)
        {
            node = near_node;
        }
        else if(t < (*r).tmin)
        {
            node = far_node;
        }
        else
        {
            branch_node[branch_lvl].x = i;
            branch_node[branch_lvl].y = far_node;
            branch_ray[branch_lvl].x = t;
            branch_ray[branch_lvl].y = (*r).tmax;
            branch_lvl++;
            (*r).tmax = t;
            node = near_node;
        }
    }
    return false;
}

fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    (*hit).has_hit = false;

    for (var i : u32 = 0; i < obj_meta.triangle_count; i++)
    {
        var has_hit_triangle = intersect_triangle(*r, hit, i);
        (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_triangle);
    }

    return (*hit).has_hit;
}

        //Lighting

fn sample_directional_light(light_direction : vec3f) -> Light {
    var light = Light(vec3f(light_intensity), -light_direction, 0.);
    return light;
}

fn check_occulusion_directional(position : vec3f, direction : vec3f) -> bool
{
    const surface_offset = 0.001;
    const max_distance = 100.;

    var r = construct_ray(position + direction * surface_offset, direction, surface_offset, max_distance);
    var hit = generate_default_hitinfo();

    return intersect_scene(&r, &hit);
}

fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var light_info = sample_directional_light(light_direction);
    var lambertian_light = (*hit).diffuse / 3.14 * light_info.L_i * dot((*hit).normal, light_info.w_i);

    var is_occluded = check_occulusion_directional((*hit).position, light_direction);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1;
    var L_reflected = .9 * lambertian_light * occlusion_modifier;
    var L_observed = L_ambient + L_reflected;

    return LightResult(L_observed, vec3f(0));
}

fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    return lambertian(r, hit);
}

//BSP


fn intersect_min_max(r : ptr < function, Ray>) -> bool
{
    let p1 = (obj_meta.aabb.min - (*r).origin) / (*r).direction;
    let p2 = (obj_meta.aabb.max - (*r).origin) / (*r).direction;
    let pmin = min(p1, p2);
    let pmax = max(p1, p2);
    let tmin = max(pmin.x, max(pmin.y, pmin.z));
    let tmax = min(pmax.x, min(pmax.y, pmax.z));
    if(tmin > tmax || tmin > (*r).tmax || tmax < (*r).tmin)
    {
        return false;
    }
    (*r).tmin = max(tmin - f1en4, (*r).tmin);
    (*r).tmax = min(tmax + f1en4, (*r).tmax);
    return true;
}

//Fragment shader

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    const backgroundColor = vec4f(0.1, 0.3, 0.6, 1.0);
    const max_depth = 10;

    var light_result : LightResult;
    var r : Ray;
    var hit : HitInfo;

    var uv = coords *.5;
    r = generate_ray_from_camera(uv);
    hit = generate_default_hitinfo();
    light_result = LightResult(vec3f(1), vec3f(0));

    for (hit.depth = 0; hit.depth < max_depth; hit.depth++)
    {
        if (!intersect_scene(&r, &hit))
        {
            hit.color += backgroundColor.rgb;
            break;
        }

        var next_light_result = shader(&r, &hit);
        light_result.additive += next_light_result.additive;
        light_result.multiplicative *= next_light_result.multiplicative;

        if (!hit.continue_trace)
        {
            break;
        };
    }

    var final_result = light_result.multiplicative * hit.color + light_result.additive;

    return vec4f(pow(final_result, vec3f(1.0 / 1.25)), 1.0);
}
