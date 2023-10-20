struct SceneData {
    pvm : mat4x4f,
    observer : vec4f,
    ligth_emission : vec4f,
    ambient_diffuse_specular_shininess : vec4f,
    shading_type : f32
};

@group(0) @binding(0) var<uniform> scene_data : SceneData;

const light_direction = vec3f(0, 0, -1.);
const visibility = 1.;

fn incident_light() -> vec3f
{
    return visibility * scene_data.ligth_emission.rgb;
}

fn phong(normal : vec3f, position : vec3f) -> vec3f
{
    var specular_reflectance = scene_data.ambient_diffuse_specular_shininess[2];
    var s = scene_data.ambient_diffuse_specular_shininess[3];

    var incident_light_direction = - light_direction;

    var reflected = 2 * dot(incident_light_direction, normal) * normal - incident_light_direction;
    var to_observer = normalize(scene_data.observer.xyz - position);

    var phong = specular_reflectance * incident_light() * pow(max(0, dot(reflected, to_observer)), s);

    return phong;
}

fn lambertian(normal : vec3f) -> vec3f
{
    var diffuse_reflectance = scene_data.ambient_diffuse_specular_shininess[1];
    var ambient_reflectance = scene_data.ambient_diffuse_specular_shininess[0];

    var lambertian_diffuse = diffuse_reflectance * incident_light() * max(0, dot(normal, -light_direction));

    return lambertian_diffuse + ambient_reflectance * scene_data.ligth_emission.rgb;
}

fn shading(color : vec4f, normal : vec3f, position : vec3f) -> vec4f
{
    return vec4f(lambertian(normal) * color.rgb + phong(normal, position), color.a);
}

struct VSOut {
    @builtin(position) position : vec4f,
    @location(0) color : vec4f,
    @location(1) model_position : vec3f,
    @location(2) normal : vec3f
};

@vertex
fn main_vs(@location(0) inPos : vec4f, @location(1) color : vec4f) -> VSOut
{
    var gouraud_shading = shading(.5 * inPos + .5, inPos.xyz, inPos.xyz);

    var vsOut : VSOut;
    vsOut.position = scene_data.pvm * inPos;
    vsOut.color = select(gouraud_shading, inPos, scene_data.shading_type > 0);

    vsOut.model_position = inPos.xyz;
    vsOut.normal = inPos.xyz;

    return vsOut;
}

@fragment
fn main_fs(@location(0) color : vec4f, @location(1) position : vec3f, @location(2) normal : vec3f) -> @location(0) vec4f
{
    var phong_shading = shading(.5 * color + .5, normalize(normal), position);

    var result = select(color, phong_shading, scene_data.shading_type > 0);
    return result;
}
