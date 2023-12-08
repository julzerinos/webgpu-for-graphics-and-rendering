@group(0) @binding(0) var<uniform> projection_view : mat4x4f;

@group(1) @binding(0) var tex_sampler : sampler;
@group(1) @binding(1) var texture : texture_2d<f32>;

struct VertexResult {
    @builtin(position) position : vec4f,
    @location(0) normal : vec3f,
    @location(1) uv : vec2f,
};

@vertex
fn main_vs(@location(0) local : vec4f, @location(1) normal : vec4f, @location(2) uv : vec2f
) -> VertexResult
{
    var vr : VertexResult;
    vr.position = projection_view * local;
    vr.normal = normal.xyz;
    vr.uv = uv;
    return vr;
}

@fragment
fn main_fs(@location(0) normal : vec3f, @location(1) uv : vec2f) -> @location(0) vec4f
{
    let color = textureSample(texture, tex_sampler, uv);
    return color;
}
