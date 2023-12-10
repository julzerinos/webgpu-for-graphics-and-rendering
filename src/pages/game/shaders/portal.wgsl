@group(0) @binding(0) var<uniform> projection_view : mat4x4f;
@group(0) @binding(1) var<uniform> time : f32;
//@group(0) @binding(1) var<uniform> player_position : vec3f;

@group(1) @binding(0) var texture_sampler : sampler;
@group(1) @binding(1) var texture : texture_2d<f32>;

struct VertexOutput {
    @builtin(position) position : vec4f,
    @location(0) normal : vec3f,
    @location(1) uv : vec2f
}

fn rotation_matrix() -> mat4x4f
{
    let local_time = time / 1e3;
    let c = -cos(local_time);
    let s = sin(local_time);
    return mat4x4f(c, s, 0.0, 0.0, -s, c, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
}

@vertex
fn main_vs(@location(0) position : vec4f, @location(1) normal : vec3f, @location(2) uv : vec2f) -> VertexOutput
{
    var vo : VertexOutput;
    vo.position = projection_view * rotation_matrix() * position;
    vo.normal = normal;
    vo.uv = uv;
    return vo;
}

@fragment
fn main_fs(input : VertexOutput) -> @location(0) vec4f
{
    let a = time;
    let color = textureSample(texture, texture_sampler, input.uv);

    return color;
}
