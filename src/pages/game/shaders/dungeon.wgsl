struct LightingOptions {
    light_intensity : f32
}

@group(0) @binding(0) var<uniform> projection_view : mat4x4f;
@group(0) @binding(1) var<uniform> light_intensity : f32;
@group(0) @binding(2) var<uniform> player_position : vec3f;

@group(1) @binding(0) var texture_sampler : sampler;
@group(1) @binding(1) var texture : texture_2d<f32>;

struct LightSource {
    position : vec3f,
    direction : vec3f,
    projection : mat4x4f
};

@group(2) @binding(0) var<uniform> light_sources : array<LightSource, 3>;
@group(2) @binding(1) var shadow_maps : texture_2d_array<f32>;

const light_emission_tint = vec3f(.9, .4, 0.);
const ambient_light = vec3f(.0);
const fog_tint = vec3f(.025, .025, .125);

struct VertexOutput {
    @builtin(position) position : vec4f,
    @location(0) normal : vec3f,
    @location(1) uv : vec2f,
    @location(2) world_position : vec4f,
};

@vertex
fn main_vs(@location(0) local : vec4f, @location(1) normal : vec4f, @location(2) uv : vec2f
) -> VertexOutput
{
    var vr : VertexOutput;
    vr.position = projection_view * local;
    vr.normal = normal.xyz;
    vr.uv = uv;
    vr.world_position = local;
    return vr;
}

fn calculate_visibility(light_index : u32, world_position : vec4f) -> f32
{
    let shadow_lookup = light_sources[light_index].projection * world_position;
    let t = (shadow_lookup.xyz / shadow_lookup.w) * vec3f(.5, -.5, 1) + vec3f(.5, .5, 0);

    var visibility = textureLoad(shadow_maps, vec2i(i32(t.x * 2048), i32(t.y * 512)), light_index, 0).r;

    let covered = abs(t.z - visibility) > 0.0003;
    visibility = select(visibility, 0., covered);

    visibility = select(visibility, max(.9, visibility), shadow_lookup.z < .3);

    let out_of_frustrum = t.x > 1 || t.x < 0 || t.y > 1 || t.y < 0 || shadow_lookup.z < 0.001;
    visibility = select(visibility, .9, out_of_frustrum);

    let behind_wall = shadow_lookup.z < -.16;
    visibility = select(visibility, 0., behind_wall);

    return visibility;
}

fn lambertian(normal : vec3f, world_position : vec4f) -> vec3f
{
    let light_emission = light_emission_tint * light_intensity;
    var lambertian = vec3f(0);

    for (var i : u32 = 0; i < 3; i++)
    {
        let light_position = light_sources[i].position;
        let line_to_light = light_position - world_position.xyz;
        let distance_to_light = length(line_to_light);
        let parallelity_to_light = max(0, dot(normal, line_to_light / distance_to_light));

        let light_wall_direction = light_sources[i].direction;
        let wall_light_boost = max(1, dot(normal, light_wall_direction) * 4.5);

        let visibility = calculate_visibility(i, world_position);
        lambertian += visibility * light_emission * parallelity_to_light * wall_light_boost / (distance_to_light * distance_to_light);
    }

    return lambertian + ambient_light;
}

fn distance_fog(world_position : vec4f) -> f32
{
    const fog_steps = 10;

    let distance_sqr = (world_position.x - player_position.x) * (world_position.x - player_position.x) + (world_position.z - player_position.z) * (world_position.z - player_position.z);
    let thresholded = round(fog_steps * (-smoothstep(16, 512, distance_sqr) + 1.)) / fog_steps;

    return 1 - thresholded;
}

@fragment
fn main_fs(input : VertexOutput) -> @location(0) vec4f
{
    let color = textureSample(texture, texture_sampler, input.uv);
    let shading = lambertian(input.normal, input.world_position);
    let fog_modifier = distance_fog(input.world_position);

    let result = (1 - fog_modifier) * color.rgb * shading + fog_modifier * fog_tint;

    return vec4f(result, color.a);
}
