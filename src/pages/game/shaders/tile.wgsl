struct InstanceData {
    model : mat4x4f,
    cardinality : u32
}

@group(0) @binding(0) var<uniform> projection_view : mat4x4f;

@group(1) @binding(0) var<storage> models : array<mat4x4f>;
@group(1) @binding(1) var<storage> cardinalities : array<u32>;

struct VertexResult {
    @builtin(position) position : vec4f,
    @location(0) normal : vec3f,
    @location(1) visible : f32
};

@vertex
fn main_vs(@location(0) local : vec4f, @location(1) normal : vec4f, @builtin(instance_index) instance : u32
) -> VertexResult
{
    var cardinality = cardinalities[instance];

    var west = f32(~cardinality & 8) / 8 * max(0, dot(vec3f(1, 0, 0), normal.xyz));
    var south = f32(~cardinality & 4) / 4 * max(0, dot(vec3f(0, 0, 1), normal.xyz));
    var east = f32(~cardinality & 2) / 2 * max(0, dot(vec3f(-1, 0, 0), normal.xyz));
    var north = f32(~cardinality & 1) * max(0, dot(vec3f(0, 0, -1), normal.xyz));
    var up = max(0, dot(vec3f(0, -1, 0), normal.xyz));
    var down = max(0, dot(vec3f(0, 1, 0), normal.xyz));

    var vr : VertexResult;
    vr.position = projection_view * models[instance] * local;
    vr.normal = normal.xyz;
    vr.visible = west + south + east + north + up + down;
    return vr;
}

@fragment
fn main_fs(@location(0) normal : vec3f, @location(1) visible : f32) -> @location(0) vec4f
{
    return vec4f(normalize(normal.xyz) *.5 + .5, clamp(visible, .1, 1));
}