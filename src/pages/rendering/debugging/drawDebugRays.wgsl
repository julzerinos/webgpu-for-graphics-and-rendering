struct Line {
    a : vec3f,
    b : vec3f,
}

@group(0) @binding(0) var<storage, read> ray_path : array<Line>;

const light_direction : vec3f = vec3f(-1.);
const light_intensity = 1.5;
const visibility = 1.;

const sphere_refractive_index = 1.5;
const air_refractive_index = 1.;
const sphere_radius = 90;

const up = vec3f(0., 1., 0.);
const target_point = vec3f(277., 275., 0.);
const origin_point = vec3f(277., 275., -570.);
const camera_constant = 1;

const default_tmax = 2000;

const f1en2 = 0.01;
const f1en4 = 0.0001;
const f1en8 = 0.00000001;

const max_depth = 10;

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
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

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    return debug(.5 * coords);
}

fn intersect_line(r : Ray, line : Line) -> vec4f
{
    const thickness = 5.;

    let v = r.direction * default_tmax;
    let u = line.b.xyz - line.a.xyz;

    let u_has_length = length(u) > 0;

    let vxu = cross(v, u);
    let vxu_dot = dot(vxu, vxu);
    let lines_are_not_parallel = abs(vxu_dot) > 0;

    let t = dot(cross(line.a.xyz - r.origin, u), vxu) / (vxu_dot);
    let ray_point = r.origin + t * v;

    let s = dot(cross(line.a.xyz - r.origin, v), vxu) / (vxu_dot);
    let line_point = line.a.xyz + s * u;

    let d = length(line_point - ray_point);

    let is_inside_ray_section = t >= r.tmin && t <= 1;
    let is_inside_line_section = s >= 0 && s <= 1;
    let is_intersection_close_enough = d < thickness;

    let camera_safeguard = .0000000001;
    let is_in_camera = length(line.a - r.origin) < camera_safeguard || length(line.b - r.origin) < camera_safeguard;

    let did_hit = !is_in_camera && u_has_length && lines_are_not_parallel && is_inside_ray_section && is_inside_line_section && is_intersection_close_enough;

    let color = vec4f(select(0, 1., did_hit), 0, 0, select(0, 1., did_hit));

    return color;
}

fn debug(coords : vec2f) -> vec4f
{
    const opacity = 1.0;

    var r = generate_ray_from_camera(coords);

    var color = vec4f(0);
    for (var i = 0; i < max_depth; i++)
    {
        let line = ray_path[i];
        color += f32(max_depth - i*2) / max_depth * intersect_line(r, line);
    }

    return color;
}
