@group(0) @binding(0) var texture_sampler : sampler;
@group(0) @binding(1) var grass_texture : texture_2d<f32>;

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) coords : vec2f,
};

@vertex
fn main_vs(@builtin(vertex_index) VertexIndex : u32) -> VSOut
{
    const pos = array<vec2f, 4 > (vec2f(-1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(1.0, -1.0));

    var vsOut : VSOut;
    vsOut.position = vec4f(pos[VertexIndex], 0.0, 1.0);
    vsOut.coords = pos[VertexIndex];

    return vsOut;
}

@fragment
fn main_fs(@location(0) coords : vec2f) -> @location(0) vec4f
{
    let uv = vec2f(coords.x, coords.y) *.5;

    return textureSample(grass_texture, texture_sampler, uv);
}
