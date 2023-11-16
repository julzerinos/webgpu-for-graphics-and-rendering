@group(0) @binding(0) var<uniform> shadow_model : mat4x4f;

struct VSOut {
    @builtin(position) position : vec4f,
};

fn perspective_projection_matrix(fovy_rad : f32, aspect : f32, near : f32, far : f32) -> mat4x4f
{
    var f = 1. / tan(fovy_rad / 2);
    var d = far - near;

    return mat4x4f(vec4f(f / aspect, 0, 0, 0), vec4f(0, f, 0, 0), vec4f(0, 0, -(near + far) / d, -1), vec4f(0, 0, -2 * near * far / d, 0));
}

@vertex
fn main_vs(@location(0) inPos : vec4f) -> VSOut
{
    var perspective = perspective_projection_matrix(1.570796, 1, 0.1, 5);

    var vsOut : VSOut;
    vsOut.position = perspective * shadow_model * inPos;

    return vsOut;
}

@fragment
fn main_fs() -> @location(0) vec4f
{
    return vec4f(0, 0, 0, .3);
}
