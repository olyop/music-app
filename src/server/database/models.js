import database from "./database.js"

import { artistSchema, albumSchema, songSchema } from "./schemas.js"

export const Artist = database.model("Artist", artistSchema, "artists")
export const Album = database.model("Album", albumSchema, "albums")
export const Song = database.model("Song", songSchema, "songs")
