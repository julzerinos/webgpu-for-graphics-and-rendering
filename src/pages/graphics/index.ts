import { ExecutableQueue, IRoute, ViewGenerator } from "../../types"

import { WebGPUBasics } from "./01-webgpu-basics"
import { Drawing } from "./02-interaction"
import { Projection } from "./03-projection"
import { Lighting } from "./04-lighting"
import { Meshes } from "./05-meshes"
import { Texturing } from "./06-textures"
import { EnvMapping } from "./07-env-mapping"
import { Shadows } from "./08-shadows"
import { ShadowMapping } from "./09-shadow-mapping"
import { CameraMovement } from "./10-camera-movement"
import { Game } from "./game"

export const Graphics: ViewGenerator = (container: HTMLElement, executeQueue: ExecutableQueue) => {
    if (!grapichsRoutes.children) throw "Graphics routes do not exist"

    for (const g of grapichsRoutes.children.map(c => c.generator)) g(container, executeQueue)
}

export const grapichsRoutes: IRoute = {
    path: "graphics",
    name: "Graphics",
    description: "",
    generator: Graphics,
    children: [
        {
            path: "webgpu-basics",
            name: "Introduction to the basics",
            description: "A walkthrough the basics of graphics and setting it up in WebGPU.",
            generator: WebGPUBasics,
        },
        {
            path: "drawing",
            name: "Drawing via interaction",
            description:
                "Using the browser interaction features to create a simple drawing application.",
            generator: Drawing,
        },
        {
            path: "projection",
            name: "Projection types",
            description: "An overview of the types of projections and GPU instancing.",
            generator: Projection,
        },
        {
            path: "lighting",
            name: "Lighting",
            description:
                "Showcase of the most common GPU lighting models and runtime mesh creation.",
            generator: Lighting,
        },
        {
            path: "meshes",
            name: "Mesh intstantiation",
            description: "Populating mesh data in the GPU and displaying a model in the frame.",
            generator: Meshes,
        },
        {
            path: "texturing",
            name: "Applying textures",
            description:
                "Using textures to add colors to a mesh and an overview of the WebGPU process mipmapping.",
            generator: Texturing,
        },
        {
            path: "env-mapping",
            name: "Environmental mapping",
            description:
                "Using environmental maps to populate color values reflected by mirror surfaces (with or without normal maps).",
            generator: EnvMapping,
        },
        {
            path: "shadows",
            name: "Shadows (projection)",
            description: "Creating shadows in the scene using projective shadowing.",
            generator: Shadows,
        },
        {
            path: "shadow-mapping",
            name: "Shadows (maps)",
            description: "Creating shadows in the scene using shadow maps.",
            generator: ShadowMapping,
        },
        {
            path: "camera-movement",
            name: "Other interaction types",
            description: "A showcase of other scene interaction methods.",
            generator: CameraMovement,
        },
        {
            path: "game",
            name: "A simple game engine (project)",
            description:
                "Using the graphics toolset to create a simple dungeon crawler with focus on lighting, shadow maps and player movement.",
            generator: Game,
        },
    ],
}
