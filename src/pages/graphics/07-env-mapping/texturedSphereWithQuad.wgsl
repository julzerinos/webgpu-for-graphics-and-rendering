//struct SceneData {
//pvm : mat4x4f,
//};
//
//@group(0) @binding(0) var<uniform> scene_data : SceneData;

@group(0) @binding(0) var cube_sampler : sampler;
@group(0) @binding(1) var cube_texture : texture_cube < f32>;

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
    @location(0) normal : vec3f
};

@vertex
fn main_vs(@location(0) inPos : vec4f) -> VSOut
{
    var gouraud_shading = shading(.5 * inPos + .5, inPos.xyz, inPos.xyz);

    var vsOut : VSOut;
    vsOut.position = inPos;

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

@fragment
fn main_fs(@location(0) normal : vec3f) -> @location(0) vec4f
{
    var sample = textureSample(cube_texture, cube_sampler, normal);

    //var result = shading(sample, normalize(normal), position);
    return sample;
}
