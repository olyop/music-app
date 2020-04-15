import fs from "fs"
import path from "path"
import { SQL_FOLDER_PATH } from "../globals.js"

const importSql = type => name =>
  fs.readFileSync(path.join(SQL_FOLDER_PATH, type, `${name}.sql`))
    .toString()

const importInsert = importSql("inserts")
const importSelects = importSql("selects")

export const SELECT_ALBUM = importSelects("selectAlbum")
export const SELECT_ALBUMS = importSelects("selectAlbums")
export const SELECT_ARTIST = importSelects("selectArtist")
export const SELECT_ARTISTS = importSelects("selectArtists")

export const INSERT_ALBUM = importInsert("insertAlbum")
export const INSERT_ARTIST = importInsert("insertArtist")
export const INSERT_ALBUM_ARTIST = importInsert("insertAlbumArtist")
