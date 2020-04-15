import fs from "fs"
import path from "path"

const { readFileSync } = fs

const importQuery = name => readFileSync(
  path.join("src", "server", "sql", `${name}.sql`),
).toString()

export const ADD_ALBUM = importQuery("addAlbum")
export const GET_ALBUM = importQuery("getAlbum")
export const GET_ALBUMS = importQuery("getAlbums")
