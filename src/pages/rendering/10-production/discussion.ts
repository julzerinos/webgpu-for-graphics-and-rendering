import { ViewGenerator } from "../../../types"

import { asset, createImage, createText, createTitle } from "../../../libs/web"

const view: ViewGenerator = (div: HTMLElement) => {
    const title = createTitle("A quick Ted Talk about production rendering")
    const description = createText(`
Blender Cycles is a mature rendering system with the majority of rendering features fleshed out. 
It does not come as a surprise to see Blender (Cycles) used in production environemnts.

Cycles is very easy to set up a render with. 
Any user already familiar with Blender can quickly set up a scene and tweak the material settings on scene objects to create interesting scenes. 
All the algorithms, computations and mathematical somersaults are hiden benath sliders, knobs and buttons, which makes rendering a breeze. 
The rendering process practically handles itself beyond changing some input and output parameters (such as target texture size or max bounce/ray depth count).

Much of this ease also comes from the streamlined materials configuration prepared for the user in Blender.
All of the materials are really the same shader, controlled by the same input variables. The user has to conform to this setup (and conform again after an update eventually changes things).
If the user is ready to invest in learning the Blender way of rendering, then all is well. An issue may be the grinding between mindsets of a programming-oriented shader author vs the vision of the Blender Cycles team.

A strength that custom made software via the means of direct APIs such as WebGPU is the ability to create conceptual objects. 
In Blender everything initially has to be a mesh, which makes sense when thinking of Blender as software where 3D modelling and rasterization are first class citizens.
In custom software shapes and entire scenes can be populated with beautiful mathematical algorithms - from simple primitives (planes, spheres, lines) to more complex visualizations or animations.

This observation leads to the key differentiation between Blender and a custom rendering pipeline. 
Blender Cycles is specifically dedicated to high quality rendering of static scenes. A render in Blender will likely outclass any other render in a custom pipeline. 
It is the custom pipeline, on the other hand, which give the artist to go crazy on animations, visualizations or mesh-less scenes. 
While Blender may offer features such as particle systems, sometimes complex creations may only be produced by directly interfacing the device through shaders.

Below are three renders from Blender cycles. They all share the same HDR texture environmental map (<a href="https://polyhaven.com/a/autumn_park">Autumn Park by Sergej Majboroda</a>).
The cow model is sourced from <a href="https://sketchfab.com/3d-models/cow-58d15c2d67b147d09bc5e46f0fbcb0b2">sinork123 on Sketchfab</a>.
`)
    const image1 = createImage(asset("resources/render_mirrors.png"))
    const image2 = createImage(asset("resources/render_ornaments.png"))
    const image3 = createImage(asset("resources/render_cows.png"))

    div.append(title, description, image1, image2, image3)
}

export default view
