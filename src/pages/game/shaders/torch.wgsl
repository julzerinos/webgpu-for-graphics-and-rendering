@group(0) @binding(0) var<uniform> projection_view : mat4x4f;
@group(0) @binding(1) var<uniform> model_matrices : array<mat4x4f, 30>;

struct LightSource {
    position : vec4f,
    direction : vec4f,
    projection : mat4x4f,
    light_tint : vec4f,
};

@group(0) @binding(2) var<uniform> light_sources : array<LightSource, 30>;

struct VertexOutput {
    @builtin(position) position : vec4f,
    @location(0) normal : vec3f,
    @location(1) uv : vec2f,
    @location(2) light_emit : vec3f
}

@vertex
fn main_vs(@location(0) position : vec4f, @location(1) normal : vec3f, @location(2) uv : vec2f, @builtin(instance_index) instance : u32) -> VertexOutput
{
    var vo : VertexOutput;
    vo.position = projection_view * model_matrices[instance] * position;
    vo.normal = normal;
    vo.uv = uv;
    vo.light_emit = light_sources[instance].light_tint.rgb * min(light_sources[instance].light_tint.w/4, light_sources[instance].light_tint.w+.4);
    return vo;
}

@fragment
fn main_fs(input : VertexOutput) -> @location(0) vec4f
{
    const stick = vec3f(.15, .2, .05);
    let fire_burn = input.light_emit;

    let fire_burn_color_modifier = step(.85, input.uv.y);

    let color = fire_burn_color_modifier * fire_burn + (1 - fire_burn_color_modifier) * stick;
    return vec4f(color, 1.);
}
