@group(0) @binding(0) var texture_sampler : sampler;
@group(0) @binding(1) var grass_texture : texture_2d<f32>;

@group(1) @binding(0) var<storage> triangle_positions : array<vec3f>;
@group(1) @binding(1) var<storage> triangle_faces : array<vec3u>;

const light_position : vec3f = vec3f(0, 1, 0);
const sphere_refractive_index = 1.5;
const air_refractive_index = 1.;
const texture_scale = .4;

struct Plane {
    tangent : vec3f,
    binormal : vec3f,
    normal : vec3f
};

struct Light {
    L_i : vec3f,
    w_i : vec3f,
    dist : f32
};

struct LightResult {
    multiplicative : vec3f,
    additive : vec3f
}

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

    shader : u32,

    prev_refractive : f32,
    next_refractive : f32,

    diffuse : f32,
    specular : f32,
    shininess : f32,

    texture : bool,
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
    return HitInfo(0, false, false, 0., vec3f(0.), vec3f(0.), vec3f(0.), 0, 1., 1., 0., 0., 0., false, vec2f(0, 0));
}

fn generate_ray_from_camera(uv : vec2f) -> Ray
{
    const up = vec3f(0., 1., 0.);
    const target_point = vec3f(0., .5, 0.);
    const origin_point = vec3f(2., 1.5, 2.);
    const camera_constant = 1;

    var v = normalize(target_point - origin_point);
    var b1 = normalize(cross(v, up));
    var b2 = cross(b1, v);

    var q = b1 * uv.x + b2 * uv.y + v * 1;

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

fn intersect_plane(r : Ray, hit : ptr < function, HitInfo>, position : vec3f, plane : Plane) -> bool {
    var distance = dot(position - r.origin, plane.normal) / dot(r.direction, plane.normal);
    var intersection = r.origin + distance * r.direction;

    var has_hit = distance > r.tmin && distance < r.tmax;

    var u = dot((intersection - position), plane.tangent);
    var v = dot((intersection - position), plane.binormal);

    (*hit).has_hit = (*hit).has_hit || has_hit;
    (*hit).dist = select((*hit).dist, distance, has_hit);
    (*hit).color = select((*hit).color, vec3f(0, 1, 0), has_hit);
    (*hit).position = select((*hit).position, intersection, has_hit);
    (*hit).normal = select((*hit).normal, plane.normal, has_hit);

    (*hit).shader = select((*hit).shader, 1, has_hit);
    (*hit).diffuse = select((*hit).diffuse, 1., has_hit);
    //(*hit).prev_refractive = select((*hit).prev_refractive, 1., has_hit);
    //(*hit).next_refractive = select((*hit).next_refractive, 1., has_hit);
    (*hit).specular = select((*hit).specular, .2, has_hit);
    (*hit).shininess = select((*hit).shininess, 60., has_hit);

    (*hit).texture = select((*hit).texture, true, has_hit);
    (*hit).uv = select((*hit).uv, vec2f(u, v), has_hit);

    return has_hit;
}

fn intersect_triangle(r : Ray, hit : ptr < function, HitInfo>, face : u32) -> bool {
    var vertex_lookup = triangle_faces[face];
    var v = array<vec3f, 3 > (triangle_positions[vertex_lookup.x], triangle_positions[vertex_lookup.y], triangle_positions[vertex_lookup.z]);

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
    (*hit).normal = select((*hit).normal, normalize(n), has_hit);

    (*hit).shader = select((*hit).shader, 1, has_hit);
    (*hit).diffuse = select((*hit).diffuse, .8, has_hit);
    //(*hit).prev_refractive = select((*hit).prev_refractive, 1., has_hit);
    //(*hit).next_refractive = select((*hit).next_refractive, 1., has_hit);
    (*hit).specular = select((*hit).specular, .2, has_hit); ;
    (*hit).shininess = select((*hit).shininess, 60., has_hit); ;

    (*hit).texture = select((*hit).texture, false, has_hit);

    return has_hit;
}

fn intersect_sphere(r : Ray, hit : ptr < function, HitInfo>, center : vec3f, radius : f32, sphere_color : vec3f) -> bool {

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
    (*hit).color = select((*hit).color, sphere_color, has_hit);
    (*hit).position = select((*hit).position, intersection, has_hit);
    (*hit).normal = select((*hit).normal, context_n, has_hit);

    (*hit).shader = select((*hit).shader, 5, has_hit);
    (*hit).diffuse = select((*hit).diffuse, .9, has_hit);
    (*hit).prev_refractive = select((*hit).prev_refractive, (*hit).next_refractive, has_hit);
    (*hit).next_refractive = select((*hit).next_refractive, next_refr_index, has_hit);
    (*hit).specular = select((*hit).specular, .1, has_hit);
    (*hit).shininess = select((*hit).shininess, 42., has_hit);

    (*hit).texture = select((*hit).texture, false, has_hit);

    return has_hit;
}

fn intersect_scene(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> bool
{
    (*hit).has_hit = false;

    const plane = Plane(vec3f(-1.0, 0.0, 0.0), vec3f(0.0, 0.0, 1.0), vec3f(0.0, 1.0, 0.0));
    var has_hit_plane = intersect_plane(*r, hit, vec3f(0., 0., 0.), plane);
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_plane);

    var sphere_center = vec3f(0, .5, 0);
    var has_hit_sphere = intersect_sphere(*r, hit, sphere_center, .3, vec3f(0., 0., 0.));
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_sphere);

    var has_hit_triangle = intersect_triangle(*r, hit, 0);
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_triangle);

    var has_hit_lightbulb = intersect_sphere(*r, hit, light_position + vec3f(0, .035, 0), .03, vec3f(1., .95, 0.));
    (*hit).shader = select((*hit).shader, 0, has_hit_lightbulb);
    (*r).tmax = select((*r).tmax, (*hit).dist, has_hit_lightbulb);

    return (*hit).has_hit;
}

//Lighting //

fn sample_point_light(pos : vec3f) -> Light {
    const light_intensity = 3.14;

    var direction = light_position - pos;
    var dist = length(direction);
    var incident_light = light_intensity / (dist * dist);

    var light = Light(vec3f(incident_light), direction, dist);

    return light;
}

fn check_occulusion(position : vec3f, light : vec3f) -> bool
{
    const surface_offset = 0.001;

    var line = light - position;
    var direction = normalize(line);
    var distance = length(line) - surface_offset;

    var r = construct_ray(position + direction * surface_offset, direction, surface_offset, distance);
    var hit = generate_default_hitinfo();

    return intersect_scene(&r, &hit);
}

fn lambertian(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var light_info = sample_point_light((*hit).position);
    var lambertian_light = (*hit).diffuse / 3.14 * light_info.L_i * dot((*hit).normal, light_info.w_i);

    var is_occluded = check_occulusion((*hit).position, light_position);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1;
    var L_reflected = .9 * lambertian_light * occlusion_modifier;
    var L_observed = L_ambient + L_reflected;

    return LightResult(L_observed, vec3f(0));
}

fn mirror(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    (*r).direction = normalize(reflect((*r).direction, (*hit).normal));
    (*r).origin = (*hit).position + (*r).direction * .001;
    (*r).tmax = 100.;

    (*hit).continue_trace = true;

    return LightResult(vec3f(1), vec3f(0));
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
    (*r).origin = (*hit).position + (*r).direction * .01;
    (*r).tmax = 100.;

    (*hit).continue_trace = true;

    return LightResult(vec3f(1), vec3f(0));
}

fn phong(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var light_info = sample_point_light((*hit).position);
    var lighting = light_info.L_i * dot(light_info.w_i, (*hit).normal) / 3.14;

    var diffuse_lighting = (*hit).diffuse * lighting;

    var reflection = normalize(reflect(-light_info.w_i, (*hit).normal));
    var specular = (*hit).specular * ((*hit).shininess + 2) * .5 * pow(dot(-(*r).direction, reflection), (*hit).shininess);

    var is_occluded = check_occulusion((*hit).position, light_position);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1;
    var L_diffuse = .9 * diffuse_lighting * occlusion_modifier;
    var L_specular = specular * lighting * occlusion_modifier;

    return LightResult(L_ambient + L_diffuse, vec3f(max(L_specular.r, 0)));
}


fn glossy(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    var light_info = sample_point_light((*hit).position);
    var lighting = light_info.L_i * dot(light_info.w_i, (*hit).normal) / 3.14;

    var diffuse_lighting = (*hit).diffuse * lighting;

    var reflection = normalize(reflect(-light_info.w_i, (*hit).normal));
    var specular = (*hit).specular * ((*hit).shininess + 2) * .5 * pow(dot(-(*r).direction, reflection), (*hit).shininess);

    var is_occluded = check_occulusion((*hit).position, light_position);
    var occlusion_modifier = select(1., 0., is_occluded);

    var L_ambient = .1 * (*hit).color;
    var L_diffuse = .9 * diffuse_lighting * (*hit).color * occlusion_modifier;
    var L_specular = specular * lighting * occlusion_modifier;

    refractive(r, hit);

    return LightResult(vec3f(1), vec3f(max(L_specular.r, 0)));
}

fn shader(r : ptr < function, Ray>, hit : ptr < function, HitInfo>) -> LightResult
{
    (*hit).continue_trace = false;

    switch ((*hit).shader)
    {
        default :
        {
        }
        case 1 :
        {
            return lambertian(r, hit);
        }
        case 2 :
        {
            return mirror(r, hit);
        }
        case 3 :
        {
            return refractive(r, hit);
        }
        case 4 :
        {
            return phong(r, hit);
        }
        case 5 :
        {
            return glossy(r, hit);
        }
    }

    return LightResult(vec3f(1), vec3f(0));
}

//Texturing //

fn texture(is_textured : bool, uv : vec2f, light : LightResult, color : vec3f) -> vec3f
{
    var sampled_texture = textureSample(grass_texture, texture_sampler, uv * texture_scale).rgb;

    var result = light.multiplicative * select(color, sampled_texture, is_textured) + light.additive;

    return result;
}

//Fragment shader //

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    const backgroundColor = vec4f(0.1, 0.3, 0.6, 1.0);
    const max_depth = 10;

    var light_result : LightResult;
    var r : Ray;
    var hit : HitInfo;

    var uv = vec2f(coords.x, coords.y) *.5;
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

    var final_result = texture(hit.texture, hit.uv, light_result, hit.color);

    return vec4f(pow(final_result, vec3f(1.0 / 1.25)), 1.0);
}
