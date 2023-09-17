struct ViewboxOptions {
    camera_constant : f32,
    aspect_ratio : f32
};

struct LightSettings {
    light_position : vec3f,
    light_intensity : f32,
    shade_all : f32
};

@group(0) @binding(0) var<uniform> viewbox : ViewboxOptions;
@group(1) @binding(0) var<uniform> light_settings : LightSettings;

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32
}

struct Ray {
    origin : vec3f,
    direction : vec3f,
    tmin : f32,
    tmax : f32
};

struct HitInfo {
    has_hit : bool,
    dist : f32,
    position : vec3f,
    normal : vec3f,
    color : vec3f,
    shade : bool
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

fn generate_ray(uv : vec2f) -> Ray
{
    var ray : Ray;

    const up = vec3f(0., 1., 0.);
    const target_point = vec3f(0., .5, 0.);
    const origin_point = vec3f(2., 1.5, 2.);

    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * viewbox.camera_constant;

    ray.origin = origin_point;
    ray.direction = normalize(q);
    ray.tmax = 100;
    ray.tmin = 0;

    return ray;
}

fn intersect_plane(r : Ray, hit : ptr < function, HitInfo>, position : vec3f, normal : vec3f) -> bool {
    var intersection = dot(position - r.origin, normal) / dot(r.direction, normal);

    var has_hit = intersection > r.tmin && intersection < r.tmax;

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).color = select((*hit).color, vec3f(.1, .7, 0.), has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, normal, has_hit);
    (*hit).shade = select((*hit).shade, select(false, true, light_settings.shade_all > 0), has_hit);

    return has_hit;
}
fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, v : array<vec3f, 3>) -> bool {
    var e0 = v[1] - v[0];
    var e1 = v[2] - v[0];
    var n = cross(e0, e1);

    var denom = dot(r.direction, n);
    var from_origin = v[0] - r.origin;

    var intersection = dot(from_origin, n) / denom;

    var beta = dot(cross(from_origin, r.direction), e1) / denom;
    var gamma = -dot(cross(from_origin, r.direction), e0) / denom;

    var has_hit = intersection > r.tmin && intersection < r.tmax && beta >= 0 && gamma >= 0 && beta + gamma <= 1;

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).color = select((*hit).color, vec3f(.4, .3, .2), has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, n, has_hit);
    (*hit).shade = select((*hit).shade, select(false, true, light_settings.shade_all > 0), has_hit);


    return has_hit;
}
fn intersect_sphere(r : Ray, hit : ptr < function, HitInfo>, center : vec3f, radius : f32, sphere_color : vec3f) -> bool {
    const a = 1;
    var b_half = dot(r.origin - center, r.direction);
    var c = dot(r.origin - center, r.origin - center) - radius * radius;
    var b_half_2 = b_half * b_half;
    var b_half_2_c = b_half_2 - c;

    var does_intersection_exist = b_half_2_c >= 0;
    var intersection = min(-b_half - sqrt(abs(b_half_2_c)), -b_half + sqrt(abs(b_half_2_c)));

    var n = normalize(intersection - center);

    var has_hit = does_intersection_exist && intersection > r.tmin && intersection < r.tmax;
    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, intersection, has_hit);
    (*hit).color = select((*hit).color, sphere_color, has_hit);
    (*hit).position = select((*hit).position, r.origin + intersection * r.direction, has_hit);
    (*hit).normal = select((*hit).normal, n, has_hit);
    (*hit).shade = select((*hit).shade, true, has_hit);

    return has_hit;
}
fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    var has_hit_plane = intersect_plane(*r, hit, vec3f(0., 0., 0.), vec3f(0., 1., 0.));
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_plane);

    var has_hit_sphere = intersect_sphere(*r, hit, vec3f(.0, .5, .0), .3, vec3f());
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_sphere);

    const triangle = array<vec3f, 3 > (vec3f(-.2, .1, .9), vec3f(.2, .1, .9), vec3f(-.2, .1, -.1));
    var has_hit_triangle = intersect_triangle(*r, hit, triangle);
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_triangle);

    var has_hit_lightbulb = intersect_sphere(*r, hit, light_settings.light_position, .03, vec3f(1., .95, 0.) * light_settings.light_intensity);
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_lightbulb);

    return (*hit).has_hit;
}

fn sample_point_light(pos : vec3f) -> Light {
    var incident_light = light_settings.light_intensity / length(light_settings.light_position - pos);

    var light : Light;
    light.L_i = vec3f(incident_light);

    return light;
}

fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f
{
    var L_emitted = vec3f();
    var L_ambient = vec3f();

    var light_info = sample_point_light((*hit).position);

    var direction_to_light = normalize(light_settings.light_position - (*hit).position);
    var transformed_light = 1.5 / 3.14 * light_info.L_i * max(0, dot((*hit).normal, direction_to_light));

    var L_observed = L_emitted + transformed_light + L_ambient;

    return L_observed + (*hit).color;
}

fn shade(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> vec3f
{
    return select((*hit).color, lambertian(r, hit), (*hit).shade);
}

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    const backgroundColor = vec4f(0.1, 0.3, 0.6, 1.0);
    const max_depth = 10;

    let uv = vec2f(coords.x * viewbox.aspect_ratio, coords.y) *.5;
    var r = generate_ray(uv);

    var result = vec3f(0.0);
    var hit = HitInfo(false, 0.0, vec3f(0.0), vec3f(0.0), vec3f(0.0), false);

    for (var i = 0; i< max_depth; i++)
    {
        if (!intersect_scene(&r, &hit))
        {
            result += backgroundColor.rgb;
            break;
        }

        result += shade(&r, &hit);

        if (hit.has_hit)
        {
            break;
        };
    }

    return vec4f(pow(result, vec3f(1.0 / 1.25)), 1.0);
}
