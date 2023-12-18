# webgpu-for-graphics-and-rendering

This project contains a collection of simple computer graphics examples created with the WebGPU API. The examples are broken down into two categories - Graphics and Rendering.

The graphics sections cover topics ranging from 2D drawing, mesh instantiation, computer graphics concepts discussion, textures, shadow mapping and quaternion rotations. The rendering sections cover topics randing from ray casting, path tracing, reflection, refractions, meshes, mesh partitioning, global illumination, progressive rendering and rendering concepts discussion. There are two final sections for each category; in computer graphics it is the creation of a simple game (engine), whereas for rendering it is an overview of setting up a custom debugging system.

Each of these sections are created in plain Typescript with the following structure - the view function is used to set up the layout for html elements and the generator function is executed to run the prepared example in the canvas. Each section will have a corresponding relevant links callout to redirect you to the file in the repository. Please note that some of the examples are computationally heavy and may require some time to set up, especially on older hardware.

## Deployment

After cloning the repository run the following

* `npm i` to install the required libraries (Typescript and Vite).
* `npm run dev` to start the development server (which hosts the files locally, usually on `http://localhost:5173/webgpu-for-graphics-and-rendering/`)

