@group(0) @binding(0) var marble_sampler : sampler;
@group(0) @binding(1) var marble_texture : texture_2d<f32>;

@group(1) @binding(0) var<uniform> projection_view : mat4x4f;
@group(1) @binding(1) var<uniform> light_proj_view : mat4x4f;
@group(1) @binding(2) var<uniform> teapot_model : mat4x4f;

@group(2) @binding(0) var shadow_map : texture_2d<f32>;

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) uv : vec2f,
    @location(1) shadow_lookup : vec4f
};

@vertex
fn main_vs(@location(0) position : vec4f, @location(1) uv : vec2f) -> VSOut
{
    var vsOut : VSOut;
    vsOut.position = projection_view * position;
    vsOut.uv = uv;

    var a = teapot_model;

    let pos_from_light = light_proj_view * position;
    vsOut.shadow_lookup = pos_from_light;
    //vec3f(pos_from_light.xy * vec2(0.5, -0.5) + vec2(0.5), pos_from_light.z);

    return vsOut;
}

@fragment
fn main_fs(@builtin(position) pos : vec4f, @location(0) uv : vec2f, @location(1) shadow_lookup : vec4f) -> @location(0) vec4f
{
    let t = (shadow_lookup.xyz / shadow_lookup.w) * vec3f(.5, -.5, 1) + vec3f(.5, .5, 0);

    var texture = textureSample(marble_texture, marble_sampler, uv);
    var visibility = 1- textureLoad(shadow_map, vec2i(t.xy * 512), 0);

    return visibility * texture;
}
