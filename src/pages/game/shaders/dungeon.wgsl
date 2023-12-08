@group(0) @binding(0) var<uniform> projection_view : mat4x4f;

@group(1) @binding(0) var texture_sampler : sampler;
@group(1) @binding(1) var texture : texture_2d<f32>;

struct LightSource {
    position : vec3f,
    direction : vec3f,
    projection : mat4x4f
};

@group(2) @binding(0) var<uniform> light_sources : array<LightSource, 6>;
@group(2) @binding(1) var shadow_map_1 : texture_2d<f32>;
@group(2) @binding(2) var shadow_map_2 : texture_2d<f32>;
@group(2) @binding(3) var shadow_map_3 : texture_2d<f32>;
@group(2) @binding(4) var shadow_map_4 : texture_2d<f32>;
@group(2) @binding(5) var shadow_map_5 : texture_2d<f32>;
@group(2) @binding(6) var shadow_map_6 : texture_2d<f32>;

const light_emission = vec3f(50);
const ambient_light = vec3f(.05);

struct VertexResult {
    @builtin(position) position : vec4f,
    @location(0) normal : vec3f,
    @location(1) uv : vec2f,
    @location(2) world_position : vec4f,
};

@vertex
fn main_vs(@location(0) local : vec4f, @location(1) normal : vec4f, @location(2) uv : vec2f
) -> VertexResult
{
    var vr : VertexResult;
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

    var visibility = 0.;
    switch (light_index)
    {
        default :
        {

        }
        case 0 :
        {
            visibility = 1 - textureLoad(shadow_map_1, vec2i(t.xy * 512), 0).r;
        }
        case 1 :
        {
            visibility = 1 - textureLoad(shadow_map_2, vec2i(t.xy * 512), 0).r;
        }
        case 2 :
        {
            visibility = 1 - textureLoad(shadow_map_3, vec2i(t.xy * 512), 0).r;
        }
        case 3 :
        {
            visibility = 1 - textureLoad(shadow_map_4, vec2i(t.xy * 512), 0).r;
        }
        case 4 :
        {
            visibility = 1 - textureLoad(shadow_map_5, vec2i(t.xy * 512), 0).r;
        }
        case 5 :
        {
            visibility = 1 - textureLoad(shadow_map_6, vec2i(t.xy * 512), 0).r;
        }
    }

    return visibility;
}

fn lambertian(normal : vec3f, world_position : vec4f) -> vec3f
{

    var lambertian = vec3f(0);

    for (var i : u32 = 5; i < 6; i++)
    {
        let light_position = light_sources[i].position;
        let line_to_light = light_position - world_position.xyz;
        let distance_to_light = length(line_to_light);

        let visibility = calculate_visibility(i, world_position);
        lambertian += visibility * light_emission * max(0, dot(normal, line_to_light / distance_to_light)) / (distance_to_light * distance_to_light);
    }

    return lambertian + ambient_light;
}

@fragment
fn main_fs(@location(0) normal : vec3f, @location(1) uv : vec2f, @location(2) world_position : vec4f) -> @location(0) vec4f
{
    let color = textureSample(texture, texture_sampler, uv);
    let shading = lambertian(normal, world_position);

    return vec4f(color.rgb * shading, color.a);
}
