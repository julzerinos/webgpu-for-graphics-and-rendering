struct SceneData {
    pvm : mat4x4f,
    observer : vec4f,
};

@group(0) @binding(0) var<uniform> scene_data : SceneData;

const light_direction = normalize(vec3f(-1, 0, -1));
const ligth_emission = vec4f(.8, .8, .8, 1);
const ambient_diffuse_specular_shininess = vec4f(.4, 1, .6, 20);
const visibility = 1.;

fn incident_light() -> vec3f
{
    return visibility * ligth_emission.rgb;
}

fn phong(normal : vec3f, position : vec3f) -> vec3f
{
    var specular_reflectance = ambient_diffuse_specular_shininess[2];
    var s = ambient_diffuse_specular_shininess[3];

    var incident_light_direction = - light_direction;

    var reflected = 2 * dot(incident_light_direction, normal) * normal - incident_light_direction;
    var to_observer = normalize(scene_data.observer.xyz - position);

    var phong = specular_reflectance * incident_light() * pow(max(0, dot(reflected, to_observer)), s);

    return phong;
}

fn lambertian(normal : vec3f) -> vec3f
{
    var diffuse_reflectance = ambient_diffuse_specular_shininess[1];
    var ambient_reflectance = ambient_diffuse_specular_shininess[0];

    var lambertian_diffuse = diffuse_reflectance * incident_light() * max(0, dot(normal, -light_direction));

    return lambertian_diffuse + ambient_reflectance * ligth_emission.rgb;
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
fn main_vs(@location(0) inPos : vec4f, @location(1) normal : vec3f) -> VSOut
{
    var vsOut : VSOut;
    vsOut.position = scene_data.pvm * vec4f(inPos.xyz, 1);
    vsOut.color = vec4f(1, 1, 1, 1);
    vsOut.model_position = inPos.xyz;
    vsOut.normal = normal;

    return vsOut;
}

@fragment
fn main_fs(@location(0) color : vec4f, @location(1) position : vec3f, @location(2) normal : vec3f) -> @location(0) vec4f
{
    var phong_shading = shading(.5 * color + .5, normalize(normal), position);

    return phong_shading;
}
