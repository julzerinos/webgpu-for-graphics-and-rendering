@group(0) @binding(0) var<uniform> projection_view : mat4x4f;
@group(1) @binding(0) var<storage> model_matrices : array<mat4x4f>;
@group(2) @binding(0) var<uniform> jitter_model_matrix : mat4x4f;

struct VertexOutput {
    @builtin(position) position : vec4f,
    @location(0) projected : vec4f
}

@vertex
fn main_vs(@location(0) position : vec4f, @builtin(instance_index) instance : u32) -> VertexOutput
{
    var projected = projection_view * model_matrices[instance] *jitter_model_matrix * position;
    return VertexOutput(projected, projected);
}

struct FragmentOutput {
    @location(0) debug : vec4f,
    @location(1) shadow_map : vec4f
}

@fragment
fn main_fs(input : VertexOutput) -> FragmentOutput
{
    let z = input.projected.z / input.projected.w;

    var fo : FragmentOutput;
    fo.debug = vec4f(z, 0, 0, 1.);
    fo.shadow_map = vec4f(z, z, z, 1.);

    return fo;
}
