import { ExecutableQueue, IRoute, ViewGenerator } from "../../types"

import { RaycastingIntroduction } from "./01-raycasting-introduction"
import { LightingModels } from "./02-lighting-models"
import { TextureMapping } from "./03-textures"
import { Meshes } from "./05-meshes"
import { SpatialPartitioning } from "./06-partitioning"
import { Progressive } from "./07-progressive"
import { BRDF } from "./08-brdf"
import { Environmental } from "./09-environmental"
import { DebuggingRendering } from "./debugging"

export const Rendering: ViewGenerator = (container: HTMLElement, executeQueue: ExecutableQueue) => {
    RaycastingIntroduction(container, executeQueue)
    LightingModels(container, executeQueue)
    TextureMapping(container, executeQueue)
    Meshes(container, executeQueue)
    Progressive(container, executeQueue)
    BRDF(container, executeQueue)
    Environmental(container, executeQueue)
}

export const renderingRoutes: IRoute = {
    path: "rendering",
    generator: Rendering,
    name: "Rendering",
    description: "",
    children: [
        {
            path: "raycasting-introduction",
            name: "Introduction to raycasting",
            description: "A conscise look into the anatomy of a raycasting system.",
            generator: RaycastingIntroduction,
        },
        {
            path: "lighting-models",
            name: "Lighting models",
            description: "An overview of the basic lighting models implemented in rendering.",
            generator: LightingModels,
        },
        {
            path: "texture-mapping",
            name: "Adding textures",
            description:
                "The process of applying textures to conceptual objects in a rendered scene.",
            generator: TextureMapping,
        },
        {
            path: "measuring-light",
            name: "Radiometry and photometry",
            description:
                "Understanding the process of measuring light through examples of photometric and radiometric equations.",
            generator: () => {},
        },
        {
            path: "meshes",
            name: "Mesh instantiation",
            description:
                "The simplest appraoch of writing mesh data into buffers to loop over in the render process.",
            generator: Meshes,
        },
        {
            path: "partitioning",
            name: "Partitioning mesh data",
            description: "Using the binary space partitioning tree (BSP) to manage large meshes.",
            generator: SpatialPartitioning,
        },
        {
            path: "progressive",
            name: "Progressive rendering",
            description:
                "Harnessing the power of progressive rendering to generate smooth render images.",
            generator: Progressive,
        },
        {
            path: "brdf",
            name: "Global illumination",
            description:
                "Introducing sampling ray paths to the light models in progressive rendering.",
            generator: BRDF,
        },
        {
            path: "environmental",
            name: "Environemntal mapping",
            description:
                "Reading light and color data from an environment map, placing rendered objects in a real life scene.",
            generator: Environmental,
        },
        {
            path: "10-production-rendering",
            name: "Production rendering",
            description: "A short discussion of production rendering with example from Blender.",
            generator: () => {},
        }, // TODO add images
        {
            path: "debugging",
            name: "An approach to debugging (project)",
            description:
                "A project delving into the options available to debug and understand rendering systems via displaying ray paths and reading color or variable values.",
            generator: DebuggingRendering,
        },
    ],
}
