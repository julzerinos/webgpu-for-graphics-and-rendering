struct InstanceData {
    model : mat4x4f
}

@group(0) @binding(0) var<uniform> projection_view : mat4x4f;

//@group(1) @binding(0) var<storage> instances_data : array<InstanceData>;

struct VertexResult {
    @builtin(position) position : vec4f,
    @location(0) normal : vec3f,
};

@vertex
fn main_vs(@location(0) local : vec4f, @location(1) normal : vec4f, @builtin(instance_index) instance : u32
) -> VertexResult
{
    var vr : VertexResult;
    vr.position = projection_view * (local + vec4f(0, 0, 5, 0));
    vr.normal = normal.xyz;
    return vr;
}

@fragment
fn main_fs(@location(0) normal : vec3f) -> @location(0) vec4f
{
    return vec4f(normal.xyz*.5 + .5, 1.);
}
