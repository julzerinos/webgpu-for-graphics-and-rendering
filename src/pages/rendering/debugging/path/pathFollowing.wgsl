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
@group(0) @binding(2) var<storage> light_faces : array<u32>;
@group(0) @binding(3) var<storage> materials : array<Material>;

@group(1) @binding(0) var<storage> bspPlanes : array<f32>;
@group(1) @binding(1) var<storage> bspTree : array<vec4u>;
@group(1) @binding(2) var<storage> treeIds : array<u32>;

struct Aabb {
    min : vec3f,
    max : vec3f,
};

@group(2) @binding(0) var<uniform> aabb : Aabb;
@group(2) @binding(1) var<uniform> jitters : array<vec4f, 4>;
@group(2) @binding(2) var<uniform> mouse_uv : vec4f;
@group(2) @binding(3) var<uniform> light_indices_count : u32;
@group(2) @binding(4) var<uniform> store_line_type : u32;

struct Line {
    a : vec3f,
    b : vec3f,
}

@group(3) @binding(0) var<storage, read_write> ray_path : array<Line>;

const MAX_LEVEL = 20u;
const BSP_LEAF = 3u;
var<private> branch_node : array<vec2u, MAX_LEVEL>;
var<private> branch_ray : array<vec2f, MAX_LEVEL>;

const light_direction : vec3f = vec3f(-1.);
const light_intensity = 1.5;
const visibility = 1.;

const sphere_refractive_index = 1.5;
const air_refractive_index = 1.;

const up = vec3f(0., 1., 0.);
const target_point = vec3f(277., 275., 0.);
const origin_point = vec3f(277., 275., -570.);
const camera_constant = 1;

const default_tmax = 2000;

const f1en2 = 0.01;
const f1en4 = 0.0001;
const f1en8 = 0.00000001;

const max_depth = 10;

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

    dist : f32,
    position : vec3f,
    normal : vec3f,

    object : u32,
    color : vec3f,

    diffuse : f32,
    specular : f32,
    shininess : f32,
    prev_refractive : f32,
    next_refractive : f32,
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
    return HitInfo(0, false, false, 0., vec3f(0.), vec3f(0.), 0, vec3f(0.), 1., 1., 1., 1, 1);
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
    return construct_ray(origin, direction, .01, default_tmax);
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

    var normal = n;

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    var color = mat.color + mat.emission;

    (*hit).has_hit = (*hit).has_hit || has_hit;

    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normalize(normal), has_hit);

    (*hit).object = select((*hit).object, 0, has_hit);
    (*hit).color = select((*hit).color, color.rgb, has_hit);

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


fn intersect_sphere(r : Ray, hit : ptr < function, HitInfo>, object : u32, center : vec3f, radius : f32) -> bool {

    var from_center = r.origin - center;
    var b_half = dot(from_center, r.direction);
    var c = dot(from_center, from_center) - radius * radius;
    var b_half_2_c = b_half * b_half - c;

    var does_intersection_exist = b_half_2_c >= 0;

    var distance_1 = -b_half - sqrt(abs(b_half_2_c));
    var distance_2 = -b_half + sqrt(abs(b_half_2_c));
    var distance_1_in_range = distance_1 >= r.tmin && distance_1 <= r.tmax;
    var distance_2_in_range = distance_2 >= r.tmin && distance_2 <= r.tmax;

    var min_distance = min(distance_1, distance_2);
    var distance = select(distance_2, select(distance_1, min_distance, distance_2_in_range), distance_1_in_range);

    var intersection = r.origin + distance * r.direction;
    var n = normalize(intersection - center);

    var is_intersection_from_inside = dot(n, r.direction) > 0;
    var next_refr_index = select(sphere_refractive_index, air_refractive_index, is_intersection_from_inside);
    var context_n = select(n, -n, is_intersection_from_inside);

    var has_hit = does_intersection_exist && distance >= r.tmin && distance <= r.tmax;
    (*hit).has_hit = (*hit).has_hit || has_hit;

    (*hit).dist = select((*hit).dist, distance, has_hit);
    (*hit).position = select((*hit).position, intersection, has_hit);

    (*hit).object = select((*hit).object, object, has_hit);
    (*hit).normal = select((*hit).normal, context_n, has_hit);

    (*hit).prev_refractive = select((*hit).prev_refractive, (*hit).next_refractive, has_hit && object == 2);
    (*hit).next_refractive = select((*hit).next_refractive, next_refr_index, has_hit && object == 2);

    return has_hit;
}

fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    (*hit).has_hit = false;

    const mirror_material = 1;
    const refractive_material = 2;

    (*r).tmax = select((*r).tmax, (*hit).dist, intersect_sphere(*r, hit, refractive_material, vec3f(230, 120, 70), 90));
    (*r).tmax = select((*r).tmax, (*hit).dist, intersect_sphere(*r, hit, refractive_material, vec3f(400, 90, 150), 45));
    (*r).tmax = select((*r).tmax, (*hit).dist, intersect_sphere(*r, hit, refractive_material, vec3f(400, 90, 250), 65));

    (*r).tmax = select((*r).tmax, (*hit).dist, intersect_sphere(*r, hit, mirror_material, vec3f(230, 66, 350), 40));

    if (!intersect_min_max(r))
    {
        return (*hit).has_hit;
    }

    let hit_cb = intersect_trimesh(r, hit);
    (*r).tmax = select((*r).tmax, (*hit).dist, hit_cb);

    return (*hit).has_hit;
}

        //Lighting

fn get_area_light_center() -> vec3f
{
    var center_light_position = vec3f(0.);
    for (var i : u32 = 0; i < light_indices_count; i++)
    {
        var vertex_mat_lookup = index_mats[light_faces[i]];
        var indices = vertex_mat_lookup.indices.xyz;

        var vertex_0 = vertex_normals[indices.x].vertex;
        var vertex_1 = vertex_normals[indices.y].vertex;
        var vertex_2 = vertex_normals[indices.z].vertex;

        center_light_position += vertex_0 + vertex_1 + vertex_2;
    }
    center_light_position /= f32(light_indices_count * 3);
    return center_light_position;
}

fn calculate_area_light_intensity(direction : vec3f) -> vec3f
{
    var intensity = vec3f(0.);
    for (var i : u32 = 0; i < light_indices_count; i++)
    {
        var vertex_mat_lookup = index_mats[light_faces[i]];
        var indices = vertex_mat_lookup.indices.xyz;
        var material_index = vertex_mat_lookup.mat;
        var mat = materials[material_index];

        var vertex_0 = vertex_normals[indices.x].vertex;
        var vertex_1 = vertex_normals[indices.y].vertex;
        var vertex_2 = vertex_normals[indices.z].vertex;

        var e0 = vertex_1 - vertex_0;
        var e1 = vertex_2 - vertex_0;
        var n = cross(e0, e1);
        var area = length(n) / 2;

        intensity += max(0, dot(-direction, normalize(n))) * mat.emission.rgb * area;
    }

    return intensity;
}

fn sample_area_light(pos : vec3f) -> Light
{
    var area_light_center = get_area_light_center();

    var line = area_light_center - pos;
    var dist = length(line);
    var direction = line / dist;

    var incident_light = calculate_area_light_intensity(direction) / (dist * dist);

    return Light(vec3f(incident_light), normalize(direction), dist, area_light_center);
}

fn check_occulusion(position : vec3f, light : vec3f) -> bool
{
    const surface_offset = .01;

    var line = light - position;
    var direction = normalize(line);
    var distance = length(line) - surface_offset;

    var r = construct_ray(position, direction, surface_offset, distance);
    var hit = generate_default_hitinfo();

    return intersect_scene(&r, &hit);
}


fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var light_info = sample_area_light((*hit).position);
    var lambertian_light = ((*hit).diffuse / 3.14) * visibility * max(0, dot((*hit).normal, light_info.w_i)) * light_info.L_i;

    var is_occluded = check_occulusion((*hit).position, light_info.pos);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1;
    var L_reflected = .9 * lambertian_light * occlusion_modifier;
    var L_observed = L_ambient + L_reflected;

    return LightResult(L_observed, vec3f(0));
}

fn mirror(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    (*r).direction = normalize(reflect((*r).direction, (*hit).normal));
    (*r).origin = (*hit).position;
    (*r).tmax = default_tmax;
    (*r).tmin = .01;

    (*hit).continue_trace = true;

    return LightResult(vec3f(1.), vec3f(0));
}

fn refractive(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var ni_nt = (*hit).prev_refractive / (*hit).next_refractive;

    var incident = -(*r).direction;
    var r_n_dot = dot(incident, (*hit).normal);

    var t_sin = ni_nt * (r_n_dot * (*hit).normal - incident);
    var cos2 = 1 - ni_nt * ni_nt * (1 - r_n_dot * r_n_dot);
    var direction = t_sin - (*hit).normal * sqrt(abs(cos2));

    var is_reflected = cos2 < 0;
    var reflected_direction = reflect((*r).direction, (*hit).normal);

    (*r).direction = normalize(select(direction, reflected_direction, is_reflected));
    (*r).origin = (*hit).position + .1 * (*r).direction;
    (*r).tmin = .01;
    (*r).tmax = default_tmax;

    (*hit).continue_trace = true;

    return LightResult(vec3f(1), vec3f(0));
}

fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    (*hit).continue_trace = false;

    switch ((*hit).object)
    {
        default :
        {
        }
        case 1 :
        {
            return mirror(r, hit);
        }
        case 2 :
        {
            return refractive(r, hit);
        }
    }

    return lambertian(r, hit);
}

//Fragment shader

fn render(coords : vec2f) -> vec4f
{
    const jitter_count = 4;
    const backgroundColor = vec4f(0.1, 0.3, 0.6, 1.0);

    var light_result : LightResult;
    var r : Ray;
    var hit : HitInfo;

    var colors = array<vec3f, 4 > ();
    var lights = array<LightResult, 4 > ();

    for (var i = 0; i < jitter_count; i++)
    {
        var uv = coords + jitters[i].xy;
        r = generate_ray_from_camera(uv);
        hit = generate_default_hitinfo();
        light_result = LightResult(vec3f(1), vec3f(0));

        for (hit.depth = 0; hit.depth < max_depth; hit.depth++)
        {
            if (!intersect_scene(&r, &hit))
            {
                hit.color += backgroundColor.rgb;

                if (i == 0 && is_mouse_pixel(uv+.5))
                {
                    hit.position = r.origin + r.direction * r.tmax;
                    store_line(r, hit);
                }
                break;
            }

            if (i == 0 && is_mouse_pixel(uv+.5))
            {
                store_line(r, hit);
            }

            var next_light_result = shader(&r, &hit);
            light_result.additive += next_light_result.additive;
            light_result.multiplicative *= next_light_result.multiplicative;

            if (!hit.continue_trace)
            {
                break;
            };
        }

        colors[i] = hit.color;
        lights[i] = light_result;
    }

    var final_result = vec3f();
    var j : i32;
    for (j = 0; j < jitter_count; j++)
    {
        var substrata_result = lights[j].multiplicative * colors[j] + lights[j].additive;
        final_result += substrata_result / f32(jitter_count);
    }

    return vec4f(pow(final_result, vec3f(1.0 / 1.25)), 1.0);
}

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    return render(coords*.5);
}

//DEBUG

fn is_mouse_pixel(coords01 : vec2f) -> bool
{
    return length(round(mouse_uv.xy * 512) - round(coords01 * 512)) <= .0;
}

fn store_line(ray : Ray, hit : HitInfo)
{
    if (store_line_type == 1 && hit.depth >0)
    {
        return;
    }

    let line_a = select(ray.origin, hit.position, store_line_type == 1);
    let line_b = select(hit.position, hit.position + 100 * hit.normal, store_line_type == 1);

    ray_path[hit.depth] = Line(line_a, line_b);
}
