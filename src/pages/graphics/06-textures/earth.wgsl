struct SceneData {
    pvm : mat4x4f,
};

@group(0) @binding(0) var<uniform> scene_data : SceneData;

@group(1) @binding(0) var texture_sampler : sampler;
@group(1) @binding(1) var texture : texture_2d<f32>;

const light_direction = vec3f(0, 0, -1.);
const visibility = 1.;
const diffuse_reflectance = 1.;
const ambient_reflectance = .4;
const ligth_emission = vec3f(1, 1, 1);
const PI = 3.14159;
const PI2 = 2 * PI;

fn incident_light() -> vec3f
{
    return visibility * ligth_emission;
}

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) color : vec4f,
    @location(1) model_position : vec3f,
    @location(2) normal : vec3f
};

@vertex
fn main_vs(@location(0) inPos : vec4f, @location(1) color : vec4f) -> VSOut
{
    var gouraud_shading = shading(.5 * inPos + .5, inPos.xyz, inPos.xyz);

    var vsOut : VSOut;
    vsOut.position = scene_data.pvm * inPos;
    vsOut.color = color;

    vsOut.model_position = inPos.xyz;
    vsOut.normal = inPos.xyz;

    return vsOut;
}

fn lambertian(normal : vec3f) -> vec3f
{
    var lambertian_diffuse = diffuse_reflectance * incident_light() * max(0, dot(normal, -light_direction));

    return lambertian_diffuse + ambient_reflectance * ligth_emission;
}

fn shading(color : vec4f, normal : vec3f, position : vec3f) -> vec4f
{
    return vec4f(lambertian(normal) * color.rgb, 1);
}

fn spherical_to_uv(spherical : vec3f) -> vec2f
{
    var u = 1 - atan2(spherical.z, spherical.x) / (PI2);
    var v = acos(spherical.y) / PI;

    return vec2f(u, v);
}

fn flip_uv(uv : vec2f) -> vec2f
{
    return vec2f(uv.x, 1 - uv.y);
}

@fragment
fn main_fs(@location(0) color : vec4f, @location(1) position : vec3f, @location(2) normal : vec3f) -> @location(0) vec4f
{
    var uv = spherical_to_uv(normal);
    var sample = textureSample(texture, texture_sampler, flip_uv(uv));

    var result = shading(sample, normalize(normal), position);
    return result;
}
