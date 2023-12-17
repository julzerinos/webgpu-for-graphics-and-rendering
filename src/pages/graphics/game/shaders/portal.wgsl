@group(0) @binding(0) var<uniform> projection_view : mat4x4f;
@group(0) @binding(1) var<uniform> model_matrix : mat4x4f;
@group(0) @binding(2) var<uniform> time : f32;

@group(1) @binding(0) var texture_sampler : sampler;
@group(1) @binding(1) var texture : texture_2d<f32>;

struct VertexOutput {
    @builtin(position) position : vec4f,
    @location(0) normal : vec3f,
    @location(1) uv : vec2f
}

@vertex
fn main_vs(@location(0) position : vec4f, @location(1) normal : vec3f, @location(2) uv : vec2f) -> VertexOutput
{
    var vo : VertexOutput;
    vo.position = projection_view * model_matrix * position;
    vo.normal = normal;
    vo.uv = uv;
    return vo;
}


fn rotation_matrix_2d() -> mat3x3f
{
    let local_time = time / 1e3;
    let c = -cos(local_time);
    let s = sin(local_time);
    return mat3x3f(1, 0, 0, 0, 1, 0, .5, .5, 1) * mat3x3f(c, s, 0, -s, c, 0, 0, 0, 1) * mat3x3f(1, 0, 0, 0, 1, 0, -.5, -.5, 1);
}


@fragment
fn main_fs(input : VertexOutput) -> @location(0) vec4f
{
    let color = textureSample(texture, texture_sampler, (rotation_matrix_2d() * vec3f(input.uv, 1.)).xy);

    return color;
}
