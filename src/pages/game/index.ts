import { IRoute } from "../../types"

import { default as Game } from "./game"

export const GameRoute: IRoute = {
    generator: Game,
    name: "game",
}
