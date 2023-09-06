struct Time {
    time : f32
};

@group(0) @binding(0) var<uniform> time : Time;

fn rotate_vec2(vector : vec2f, theta : f32) -> vec2f
{
    let x = vector.x * cos(theta) - vector.y * sin(theta);
    let y = vector.y * cos(theta) + vector.x * sin(theta);
    return vec2f(x, y);
}

@vertex
fn main_vs(@location(0) pos : vec2f) -> @builtin(position) vec4f
{
    let rotated = rotate_vec2(pos, cos(time.time));
    return vec4f(rotated, 0, 1);
}
@fragment
fn main_fs() -> @location(0) vec4f
{
    return vec4f(0.0, 0.0, 0.0, 1.0);
}
