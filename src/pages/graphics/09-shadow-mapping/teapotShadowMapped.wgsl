@group(0) @binding(0) var<uniform> model : mat4x4f;
@group(0) @binding(1) var<uniform> projection_view : mat4x4f;

@vertex
fn main(@location(0) position : vec4f) -> @builtin(position) vec4f
{
    var projected = projection_view * model * position;
    return projected;
}
