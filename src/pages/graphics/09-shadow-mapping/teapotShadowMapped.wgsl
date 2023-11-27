@group(0) @binding(0) var<uniform> model : mat4x4f;
@group(0) @binding(1) var<uniform> projection_view : mat4x4f;

struct VertexOutput {
    @builtin(position) position : vec4f,
    @location(0) projected : vec4f
}

@vertex
fn main_vs(@location(0) position : vec4f) -> VertexOutput
{
    var projected = projection_view * model * position;
    return VertexOutput(projected, projected);
}

@fragment
fn main_fs(input : VertexOutput) -> @location(0) vec4f
{
    let z = input.projected.z / input.projected.w ;
    return vec4f(z, z, z, 1.);
}
