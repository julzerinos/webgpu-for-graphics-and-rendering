struct VertexNormal {
    vertex : vec3f,
    normal : vec3f
};

struct IndexMaterial {
    indices : vec3u,
    mat : u32
};

struct Material {
    color : vec4f,
    specular : vec4f,
    emission : vec4f,
    illum_shininess_ior : vec3f
};

@group(0) @binding(0) var<storage> vertex_normals : array<VertexNormal>;
@group(0) @binding(1) var<storage> index_mats : array<IndexMaterial>;
@group(0) @binding(2) var<storage> materials : array<Material>;

@group(1) @binding(0) var<storage> bspPlanes : array<f32>;
@group(1) @binding(1) var<storage> bspTree : array<vec4u>;
@group(1) @binding(2) var<storage> treeIds : array<u32>;

struct Aabb {
    min : vec3f,
    max : vec3f,
};

struct SceneData {
    frame_num : u32,
    canvas_width : u32,
    canvas_height : u32
}

@group(2) @binding(0) var<uniform> aabb : Aabb;
@group(2) @binding(1) var<uniform> scene_data : SceneData;
@group(2) @binding(2) var<uniform> shader_type : u32;

@group(3) @binding(0) var render_texture : texture_2d<f32>;
@group(3) @binding(1) var environment_sampler : sampler;
@group(3) @binding(2) var environment_texture : texture_2d<f32>;

const MAX_LEVEL = 20u;
const BSP_LEAF = 3u;
var<private> branch_node : array<vec2u, MAX_LEVEL>;
var<private> branch_ray : array<vec2f, MAX_LEVEL>;

const sphere_refractive_index = 1.5;
const air_refractive_index = 1.;
const sphere_radius = 90;

const up = vec3f(0., 1., 0.);
const target_point = vec3f(0, 2, 0.);
const origin_point = vec3f(0, 2, 7);
const camera_constant =1;

const sun_direction = normalize(vec3f(5, -.5, -.5));
const sun_intensity = vec3f(.8, .8, .8);

const default_tmin = .01;
const default_tmax = 10000;

const f1en2 = 0.01;
const f1en4 = 0.0001;
const f1en8 = 0.00000001;
const f1en16 = 0.0000000000000001;

const PI = 3.14;

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32,
    pos : vec3f
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

    object : u32,

    dist : f32,
    position : vec3f,
    normal : vec3f,

    diffuse : vec3f,
    emission : vec3f,
    //prev_refractive : f32,
    //next_refractive : f32,

    direct : bool,
    path_factor : vec3f,
    bounce_factor : vec3f,

    background : bool,
    uv : vec2f
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
    var hit_info : HitInfo;

    hit_info.depth = 0;
    hit_info.has_hit = false;
    hit_info.continue_trace = false;

    hit_info.object = 0;

    hit_info.dist = 0;
    hit_info.position = vec3f();
    hit_info.normal = vec3f();

    hit_info.diffuse = vec3f();
    hit_info.emission = vec3f();
    //hit_info.prev_refractive = 1.;
    //hit_info.next_refractive = 1.;

    hit_info.direct = true;
    hit_info.path_factor = vec3f(1);
    hit_info.bounce_factor = vec3f(1);

    hit_info.background = false;
    hit_info.uv = vec2f();

    return hit_info;
}

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * camera_constant;

    return construct_ray_default(origin_point, normalize(q));
}

fn construct_ray_default(origin : vec3f, direction : vec3f) -> Ray
{
    return construct_ray(origin, direction, default_tmin, default_tmax);
}

fn construct_ray(origin : vec3f, direction : vec3f, tmin : f32, tmax : f32) -> Ray
{
    var ray_indirect : Ray;
    ray_indirect.origin = origin;
    ray_indirect.direction = direction;
    ray_indirect.tmax = tmax;
    ray_indirect.tmin = tmin;
    return ray_indirect;
}


//Intersecting objects //

fn barycentric_normal(v_ns : array<vec3f, 3 >, beta : f32, gamma : f32) -> vec3f {
    var alpha = 1 - beta - gamma;
    var interpolated_normal = alpha * v_ns[0] + beta * v_ns[1] + gamma * v_ns[2];
    return normalize(interpolated_normal);
}

fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, face : u32) -> bool {
    var vertex_mat_lookup = index_mats[face];
    var indices = vertex_mat_lookup.indices.xyz;
    var material_index = vertex_mat_lookup.mat;

    var vertex_normal_x = vertex_normals[indices.x];
    var vertex_normal_y = vertex_normals[indices.y];
    var vertex_normal_z = vertex_normals[indices.z];

    var v = array<vec3f, 3 > (vertex_normal_x.vertex, vertex_normal_y.vertex, vertex_normal_z.vertex);
    var v_ns = array<vec3f, 3> (vertex_normal_x.normal, vertex_normal_y.normal, vertex_normal_z.normal);

    var mat = materials[material_index];

    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);
    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var beta = dot(cross(from_origin, r.direction), e1) / denom;
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;
    var alpha = 1 - beta - gamma;

    var normal = barycentric_normal(v_ns, beta, gamma);

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    (*hit).has_hit = (*hit).has_hit || has_hit;

    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);

    (*hit).object = select((*hit).object, 0, has_hit);

    (*hit).diffuse = select((*hit).diffuse, mat.color.rgb, has_hit);
    (*hit).emission = select((*hit).emission, mat.emission.rgb, has_hit);
    (*hit).normal = select((*hit).normal, normal, has_hit);

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
        let node_axis_leaf = tree_node.x & 3u;
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

fn intersect_min_max(r : ptr < function, Ray>) -> bool
{
    let p1 = (aabb.min - (*r).origin) / (*r).direction;
    let p2 = (aabb.max - (*r).origin) / (*r).direction;
    let pmin = min(p1, p2);
    let pmax = max(p1, p2);
    let tmin = max(pmin.x, max(pmin.y, pmin.z));
    let tmax = min(pmax.x, min(pmax.y, pmax.z));
    if(tmin > tmax || tmin > (*r).tmax || tmax < (*r).tmin)
    {
        return false;
    }
    (*r).tmin = max(tmin - f1en2, (*r).tmin);
    (*r).tmax = min(tmax + f1en2, (*r).tmax);
    return true;
}

fn intersect_plane(r : Ray, hit : ptr < function, HitInfo>) -> bool {
    const plane_position = vec3f(0);
    const plane_normal = vec3f(0, 1., 0);
    const plane_tangent = vec3f(-1, 0, 0);
    const plane_binormal = vec3f(0, 0., 1);

    var distance = dot(plane_position - r.origin, plane_normal) / dot(r.direction, plane_normal);
    var intersection = r.origin + distance * r.direction;

    var has_hit = distance > r.tmin && distance < r.tmax;

    var u = dot((intersection - plane_position), plane_tangent);
    var v = dot((intersection - plane_position), plane_binormal);

    (*hit).has_hit = (*hit).has_hit || has_hit;

    (*hit).dist = select((*hit).dist, distance, has_hit);
    (*hit).position = select((*hit).position, intersection, has_hit);

    (*hit).object = select((*hit).object, 1, has_hit);
    (*hit).normal = select((*hit).normal, plane_normal, has_hit);

    return has_hit;
}

fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    (*hit).has_hit = false;

    //var hit_plane = intersect_plane(*r, hit);
    //(*r).tmax = select((*r).tmax, (*hit).dist, hit_plane);

    if (!intersect_min_max(r))
    {
        return (*hit).has_hit;
    }

    var hit_cb = intersect_trimesh(r, hit);
    (*r).tmax = select((*r).tmax, (*hit).dist, hit_cb);

    return (*hit).has_hit;
}

//Lighting


fn check_occulusion_directional(position : vec3f, direction : vec3f) -> bool
{
    const surface_offset = .1;

    var r = construct_ray(position + direction * surface_offset, direction, default_tmin, 10);
    var hit = generate_default_hitinfo();

    return intersect_scene(&r, &hit);
}

fn sample_sun_light(position : vec3f) -> Light {
    let env_visibility = select(1., 0., check_occulusion_directional(position, -sun_direction));

    var light : Light;
    light.L_i = sun_intensity * env_visibility;
    light.w_i = sun_direction;
    return light;
}

fn sample_environment_light(position : vec3f, direction : vec3f, seed : ptr < function, u32>) -> Light
{
    let sampled_sphere_direction = sample_cosine_weighted_hemisphere(direction, seed);
    let environment = get_environment(sampled_sphere_direction);
    let env_visibility = select(1., 0.4, check_occulusion_directional(position, sampled_sphere_direction));

    var light : Light;
    light.L_i = environment * env_visibility;
    light.w_i = direction;
    return light;
}

fn indirect_illumination(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> bool
{
    var p_reflect = ((*hit).diffuse.r + (*hit).diffuse.g + (*hit).diffuse.b) / 3;
    var event = rnd(seed);

    var absorb = event >= p_reflect;

    var sampled_sphere_direction = sample_cosine_weighted_hemisphere((*hit).normal, seed);

    (*r).origin = (*hit).position + .01 * sampled_sphere_direction;
    (*r).direction = sampled_sphere_direction;
    (*r).tmin = 0.01;
    (*r).tmax = 10000;
    (*hit).path_factor *= (*hit).diffuse / p_reflect;

    return absorb;
}

fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> vec3f
{
    var emission = select(0., 1., (*hit).direct) * (*hit).emission;

    var absorb = indirect_illumination(r, hit, seed);
    (*hit).direct = absorb && (*hit).direct;
    (*hit).continue_trace = !absorb;

    let env_light = sample_environment_light((*hit).position, (*hit).normal, seed).L_i;

    let L_direct = (env_light) * (*hit).diffuse;

    var L_observed = emission + L_direct;
    return L_observed;
}

fn mirror(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f
{
    (*r).direction = normalize(reflect((*r).direction, (*hit).normal));
    (*r).origin = (*hit).position + (*r).direction * .01;
    (*r).tmin = default_tmin;
    (*r).tmax = default_tmax;

    (*hit).continue_trace = true;
    (*hit).direct = true;

    return vec3f();
}

fn holdout_shadow(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> vec3f
{
    let sampled_sphere_direction = sample_cosine_weighted_hemisphere((*hit).normal, seed);
    let env_visibility = select(1., 0., check_occulusion_directional((*hit).position, sampled_sphere_direction));
    //let sun_visiblity = select(1., .4, check_occulusion_directional((*hit).position, -sun_direction));

    let environment = get_environment((*r).direction);

    return environment * env_visibility;
}

fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>, seed : ptr < function, u32>) -> vec3f
{
    (*hit).continue_trace = false;

    // if ((*hit).object == 1)
    // {
    //     return holdout_shadow(r, hit, seed);
    // }

    switch (shader_type)
    {
        default :
        {
        }
        case 1 :
        {
            return mirror(r, hit);
        }
        case 3 :
        {
            return (*hit).diffuse;
        }
    }

    return lambertian(r, hit, seed);
}

fn get_environment(direction : vec3f) -> vec3f
{
    let uv = angular_map(direction);

    let background = textureSampleLevel(environment_texture, environment_sampler, uv, 0.);

    let hdr_range = background * 256;
    let hdr_exponent = hdr_range.a;
    let hdr = (hdr_range.rgb + .5) / 256 * pow(2, hdr_exponent - 128);

    return background.rgb;
}

//Fragment shader

struct FSOut {
    @location(0) frame : vec4f,
    @location(1) accum : vec4f
}

@fragment
fn main_fs(@builtin(position) fragcoord : vec4f, @location(0) coords : vec2f) -> FSOut
{
    const max_depth = 10;

    let launch_idx = u32(fragcoord.y) * scene_data.canvas_width + u32(fragcoord.x);
    var t = tea(launch_idx, scene_data.frame_num);
    let jitter = vec2f(rnd(&t), rnd(&t)) / f32(scene_data.canvas_height);

    var uv = coords * vec2f(1, .5) + jitter;

    var r : Ray;
    var hit : HitInfo;
    r = generate_ray_from_camera(uv);
    hit = generate_default_hitinfo();

    var light_result = vec3f();

    for (hit.depth = 0; hit.depth < max_depth; hit.depth++)
    {
        if (!intersect_scene(&r, &hit))
        {
            light_result += hit.bounce_factor * get_environment(r.direction);
            break;
        }

        var light = shader(&r, &hit, &t);
        light_result += hit.bounce_factor * light;

        if (!hit.continue_trace)
        {
            break;
        };
        hit.bounce_factor = hit.path_factor;
    }

    let curr_sum = textureLoad(render_texture, vec2u(fragcoord.xy), 0).rgb * f32(scene_data.frame_num);
    let accum_color = (light_result + curr_sum) / f32(scene_data.frame_num + 1u);

    var fs_out : FSOut;
    fs_out.frame = vec4f(pow(accum_color, vec3f(1.0 / 1.25)), 1.0);
    fs_out.accum = vec4f(accum_color, 1.0);
    return fs_out;
}

//Utility

//PRNG xorshift seed generator by NVIDIA
fn tea(val0 : u32, val1 : u32) -> u32
{
    const N = 16u;  //User specified number of iterations
    var v0 = val0;
    var v1 = val1;
    var s0 = 0u;
    for(var n = 0u; n < N; n++)
    {
        s0 += 0x9e3779b9;
        v0 += ((v1<<4) + 0xa341316c)^(v1 + s0)^((v1>>5) + 0xc8013ea4);
        v1 += ((v0<<4) + 0xad90777d)^(v0 + s0)^((v0>>5) + 0x7e95761e);
    }
    return v0;
}

fn mcg31(prev : ptr < function, u32>) -> u32
{
    const LCG_A = 1977654935u;
    *prev = (LCG_A * (*prev)) & 0x7FFFFFFF;
    return * prev;
}

//Generate random float in [0, 1)
fn rnd(prev : ptr < function, u32>) -> f32
{
    return f32(mcg31(prev)) / f32(0x80000000);
}

//Given a direction vector v sampled around the z-axis of a
//local coordinate system, this function applies the same
//rotation to v as is needed to rotate the z-axis to the
//actual direction n that v should have been sampled around
//[Frisvad, Journal of Graphics Tools 16, 2012;
//Duff et al., Journal of Computer Graphics Techniques 6, 2017].
fn rotate_to_normal(normal : vec3f, v : vec3f) -> vec3f
{
    let signbit = sign(normal.z + f1en16);
    let a = -1.0f / (1.0f + abs(normal.z));
    let b = normal.x * normal.y * a;
    return vec3f(1.0f + normal.x * normal.x * a, b, -signbit * normal.x) * v.x
    + vec3f(signbit * b, signbit * (1.0f + normal.y * normal.y * a), -normal.y) * v.y
    + normal * v.z;
}

//Given spherical coordinates, where theta is the
//polar angle and phi is the azimuthal angle, this
//function returns the corresponding direction vector
fn spherical_direction(sin_theta : f32, cos_theta : f32, phi : f32) -> vec3f
{
    let sin_phi = sin(phi);
    let cos_phi = cos(phi);
    return vec3f(sin_theta * cos_phi, sin_theta * sin_phi, cos_theta);
}

fn sample_cosine_weighted_hemisphere(normal : vec3f, seed : ptr < function, u32>) -> vec3f
{
    var eps_1 = rnd(seed);
    var eps_2 = rnd(seed);

    var theta = acos(sqrt(1 - eps_1));
    var phi = 2 * PI * eps_2;

    var direction = spherical_direction(sin(theta), cos(theta), phi);

    return rotate_to_normal(normal, direction);
}

fn angular_map(spherical : vec3f) -> vec2f
{
    let r = acos(-spherical.z) / (2 * PI * length(spherical.xy));
    var u = .5 + r * spherical.x;
    var v = .5 + r * spherical.y;

    return vec2f(u, v);
}
