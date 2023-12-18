import { initializePlayer, updatePlayerLookDirection, updatePlayerPosition } from "./logic/player"
import { createDungeonRender, generateDungeonMap, generateMeshFromTiles } from "./logic/dungeon"
import { createShadowMapPass } from "./logic/lights"
import { createPortalRender, generatePortalMesh } from "./logic/portal"
import { setupEngine } from "./engine/engine"
import { BufferedMesh, GamePlayer, GameState } from "./interfaces"
import { updateGameState } from "./logic/gameState"
import { createTorchesRenderPass, generateTorchesInstancedMesh } from "./logic/torch"
import {
    createCanvasSection,
    createCanvas,
    createTitle,
    createText,
    createRelevantFilesLink,
} from "../../../libs/web"
import { genreateVertexBuffer } from "../../../libs/webgpu"
import { Executable, ViewGenerator, ExecutableQueue } from "../../../types"

const execute: Executable = async () => {
    const gameEngine = await setupEngine()

    const player: GamePlayer = initializePlayer(gameEngine)
    gameEngine.input.mouseMoveListeners.push((dx, dy) =>
        updatePlayerLookDirection(gameEngine, player, dx, dy)
    )

    const { tileSet, tileMap } = generateDungeonMap()
    const dungeon = generateMeshFromTiles(tileSet.allTiles)

    const gameState: GameState = {
        map: tileMap,
        currentTile: null,
        tileChangeListeners: [],
        cheats: {
            noClip: false,
        },
    }

    const { buffer, bufferLayout } = genreateVertexBuffer(
        gameEngine.device,
        dungeon.vertices,
        "float32x4",
        0
    )
    const dungeonBufferedMesh: BufferedMesh = {
        vertexBuffer: buffer,
        vertexBufferLayout: bufferLayout,
        vertexCount: dungeon.vertices.length / 4,
    }

    const portalMesh = generatePortalMesh(tileSet.endTile!)
    const torchBMesh = generateTorchesInstancedMesh(gameEngine, dungeon.lights)

    const { renderable: shadowMapPass, lightData } = createShadowMapPass(
        gameEngine,
        [...dungeon.lights, ...portalMesh.lights],
        [dungeonBufferedMesh, player.shadowBufferedMesh, torchBMesh]
    )
    gameState.tileChangeListeners.push(shadowMapPass.onTileChange!)

    const { pass: dungeonRenderPass } = await createDungeonRender(
        gameEngine,
        dungeon,
        lightData,
        player
    )

    const { pass: portalRenderPass } = await createPortalRender(gameEngine, portalMesh, player)

    const { pass: torchesRenderPass } = createTorchesRenderPass(
        gameEngine,
        torchBMesh,
        player,
        lightData
    )

    const handleKeys = () => {
        updatePlayerPosition(gameEngine, player, gameState, gameEngine.input.keyMap)

        if (gameEngine.input.keyMap["p"]) {
            gameState.cheats.noClip = !gameState.cheats.noClip
            gameEngine.input.keyMap["p"] = false
            console.info("[cheats]: no clip toggled to", gameState.cheats.noClip)
        }
    }

    updatePlayerLookDirection(gameEngine, player, 0, 0)

    let frameNumber = 0
    const frame = (time: number) => {
        handleKeys()
        updateGameState(gameState, player)

        const encoder = gameEngine.device.createCommandEncoder()

        shadowMapPass.pass(encoder, time, frameNumber)

        dungeonRenderPass(encoder, time, frameNumber)
        portalRenderPass(encoder, time, frameNumber)
        torchesRenderPass(encoder, time, frameNumber)

        gameEngine.device.queue.submit([encoder.finish()])

        frameNumber++
        requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
}

const view: ViewGenerator = (div: HTMLElement, executeQueue: ExecutableQueue) => {
    const a = createRelevantFilesLink("graphics", ["/game", "/game/game.ts"])

    const title = createTitle("The WebGPU dungeon game")
    const intro = createText(`
It's hard to call this a game, there are no challenges or obstacles to overcome - it's more a showcase of a WebGPU-based game engine. 
The point of the "Game" is to traverse the dark dungeon, using the light sources or fog to make your way through the dark halls and finally find the exit portal. The explanations of the games systems are below the game itself.

You initiate the game by clicking on the canvas and can leave whenever by hitting [Esc]. When in the game look around with the mouse, move by using the [WASD] keys and activate sprinting with the [V] key.
`)

    const canvasSection = createCanvasSection()
    const canvas = createCanvas("game")
    canvasSection.append(canvas)

    const overviewTitle = createTitle("Overview of the game structure")
    const overview = createText(`
The game is made with Typescript and WebGPU. It is comprised of a few key systems which integrate with each other to create the final experience.
While this is an example of a game engine, it would have to be expanded and abstracted to be truly called an engine, as currently it is tailored to support the dungeon game. More on that later.

The game's key systems are: 

1) Dungeon map generation, which include creating a procedurally generated layout, creating the dungeon mesh in runtime and selecting the locations for lights to appear in the game.

2) The player system, which include camera movement and rotation.

3) Tiles and torches, which generate tile templates for the dungeon depending on how many walls should be open, as well as bounding the player inside the legal space (collision).

4) The game state (and portal) which trigger an event upon reaching the objective.

and of course, the most important system

5) The lighting system, which tracks active lights, generates shadow maps and controls light transition.

The game engine is an obejct which stores all the vital information about the game and resources requried for game components to function. 
It is responsible for access to the GPU device and stores a reference to the game canvas and the multisample state. 
Additionally, it will hold the global z-buffer shared among all render objects. It is also the middleman between user input and the game input handler.

The stages of the game can be categorized into two parts.

I. Initialization (run once)

- The engine is prepared (game canvas initialized, WebGPU prepared).

- The game map is generated. 

- Lights are defined and prepared in the light system. 

- Every object prepares its mesh (vertex and other attribute buffers).

II. Gameplay (run in a loop)

- The frame function is called.

- Input is checked and applied.

- The shadow map pass is run.

- The objects render pass is run.
`)

    const dungeonTitle = createTitle("The dungeon system")
    const dungeon = createText(`
Initially the dungeon is created as an array of arrays of tile-or-empty elements. The algorithm is simple - a recursive walk which populates tiles depending on the empty neighbors a tile has.
The first leaf in the walk is the END tile, which is where the portal is placed. Every other tile is sampled to either be a NORMAL or LIGHT tile, the latter of which will generate a light object for the light system to track.

The dungeon mesh is then generated by traversing the tiles map. For each tile, the tile system is polled to generate a local tile mesh with the appropriate walls removed to create a continuous corridor.
The tile mesh is offset accordingly to the map coordinates and merged with the dungeon mesh vertex (and other attributes) buffers. 
The map exists in integer array space and so mapping functions are created to quickly map a tile's position in world space and vice versa. 
During mesh creation, the dungeon is offset so that the center tile lays in the origin of the system, where the player is initialized.

The dungeon pipeline is configured to cull front faces, as we are interested in seeing the insides of the tiles. A z-buffer attachement is also vital to avoid z-fighting between tiles. 
Initially the idea was to use instancing to populate the tiles and remove their walls inside the shader, but there was an issue with the draw-order and blending when using instancing, therefore it was scrapped.

Within its shader, the dungeon does simple object operations - updating dungeon position according to the player position, updating the tiles depending on albedo and shadow map textures and calculate lighting for lit surfaces. 
An additional feature added to the dungeon is the aptly named "fog". Distant tiles are ususally dark due to the player-local active lights. 
To help the player get a sense for the surrounding dungeon structure further empty spaces are blended with a fog color. 
The blend factor is thesholded to ceratin steps and depends on the camera's depth component.
`)

    const playerTitle = createTitle("The player system")
    const player = createText(`
The player is a conceptual (apart from the lighting system) object. It represents the floating camera and handles movement can rotation which is then applied to the camera's extrinsic matrix. 

Movement is handled by moving the player along the directions of the player's local forward and right axes, which are initially set to the origins forwad and right axes. The player's height component (y) is always set to zero.
As the movement always depends on these two axes, it is vital they remain correct - which is the job of the rotation action. Sprinting is also an option, which simply increases the by-frame movement displacement amount.

Rotation applies an incremental quaternion to the player's forwrd (look direction) based on the frame mouse movement (tracked in the Pointer Lock API). 
After the look direction is updated, to maintain smooth movement the right axis is also updated as the normalzied cross product between the canon up direction and the player's new forward direction.

After movement is made, the player model buffer is updated, which exists only to be an actor in shadow map render passes.
`)

    const tileTitle = createTitle("The tile system and the torch system")
    const tile = createText(`
The tile does not exist in the GPU, as it is integrated into the dungeon system in the initialization stage. The tile still remains as a conceptual object during runtime.

During initialization, the tile generates a template mesh to be integrated into the dungeon mesh. It will generate a cube, 
but remove as many walls as are required to create a fit with the dungeon layout - this is referred to as the tile's cardinality.
The cube mesh does not use index buffers so as to support flat shading, which is only possible with duplicated vertices. 
For such as small mesh this is a negligible cost. UV coordinates are also created to allow the dungeon shader to apply the tile texture.
To save on textures used, there is only one texture file with all three variants of the tile wall/floor/ceiling textures stiched together, and the UVs reflect this.

During runtime, tiles remain at play as they are responsible for player-wall collisions. 
Players have to remain bound inside the tile's space, unless one of the tile walls is open. The collision is implemented by clamping the player's position to the allowed boundary (a small offset before the wall).
Whenever a player changes tiles, an event is triggered. This allows the decoupling and efficiency of certain actions, as not everything has to be recalculated on player movement.

The torches are simple stretched and rotated cubes, which are positioned to the light position inside a LIGHT type tile. 
The light position inside a tile is randomized based on the remaining walls a tile has - a tile with no walls cannot be a LIGHT type tile.

The torches are instanced objects with model matrices used to displace them accordingly. 
Additionally a trick is employed to color part of the torch with the color of the emitting light by slicing the upper part of the vertical uv coordinate.
`)
    const gameStateTitle = createTitle("The game state and portal system")
    const gameState = createText(`
A rather small part of the game, but worth a shoutout. The game state is responsible for checking for game objectives. The game state is interested in the player's current tile.
It will check if the player's map position is equal to that of the END type tile - which when observed will trigger the end "reward".

The portal - which is the in-game representation of the objective - is a graphical object with its own pass. The portal is created as a quad with the portal texture applied to it.
The portal's pipeline is configured to support blending, as only the portal color should be visible to the player and not the transparent background in the texture.
In the portal's shader, the uvs are dependent on a uniform time buffer to rotate the uvs about the texture's center, which creates a twirling effect. 
The portal is also another instance of a light.

The game state also tracks active cheats - such as "no clip" which allows the player to pass through walls (toggle with [P] key).
    `)

    const lightingTitle = createTitle("The lighting system")
    const lighting = createText(`
By far the most interesting part of this project was the creation of shadow maps. 

Lights are all defined as point lights for light calculation, but have a direction towards which their camera matrix is direction for the purpose of generating the shadow map.
The dungeon mesh, player mesh and torches meshes are all rendered in the the light sources perspective to populate the shadow map, later passed to the dungeon shader as a texture.

To keep things efficient, only four active lights are allowed in the scene at a given moment. These are updated the be the lights closest to the player whenever a player changes tiles.
Each light has its own position in the light information buffer and its own respective shadow map, but only active lights which have a shadow pass to render their shadow maps. 
Other lights are deactivated - their intensity is zero.

Flickering is implemented as a property function of time. The intensity "flickers" randomly up and down. 
This effect is also applied to the shadows by creating a small displacement in the light's model matrix during the shadow pass.

During the initialization stage, the light system gathers all the defined lights from object mesh data and creates a shared light information buffer which is later used by the dungeon and torches systems.
During the gameplay stage, the shadow pass always runs before object renders to update the currently casted shadows.
    `)

    const imporvementsTitle = createTitle("Room for improvement")
    const improvements = createText(`
The game (and game engine) is far from perfect. 
In this section I would like to focus on the steps to make this a better engine, as the game aspect is a trivial extension.

The first steps to creating a better engine would be to abstract and homogenize many of the functions in the system.
Currently all of the objects are explicitly created and explicitly called in the render pass. 
This should be instead replaced with a generic wrapper for any game object with a default material shader. 
This would also require the creation of a standardized shader base template, which other shader files would have to adhere to.
Shaders should be passed as a variable of the object, just as the rest of its data - mesh and other.

There should be clear distinction between the game logic and game engine layers. 
In the current form, game objects directly call interact with the WebGPU API. 
While this helps keep things simple and allows for exact behaviours to be exactly defined for each object,
there is a lot of responsibility vagueness and code duplicaiton which would lead to many more issues down the line.

Regarding clear responsibility and ownership - it would be a benefit to declare and create buffers for reused objects and data. 
This was partially set up with a player camera buffer created once (and updated only by the player) as well as the light information buffer controlled by the light system.
In the final form the management and transfer of globally known buffers should be the responsiblity of a separate system.

A final comment, the shadow maps have resolution issues which cause pixelated shadows. 
Either their rsolution should be increased or their generating light source camera matrices adjusted to ensure better shadows.
Percentage-closer filtering could later be employed to increase the quality of shadows. 
    `)

    div.append(
        title,
        intro,
        canvasSection,
        overviewTitle,
        a,
        overview,
        dungeonTitle,
        dungeon,
        playerTitle,
        player,
        tileTitle,
        tile,
        gameStateTitle,
        gameState,
        lightingTitle,
        lighting,
        imporvementsTitle,
        improvements
    )
    executeQueue.push(execute)
}

export default view
