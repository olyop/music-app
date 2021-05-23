import importSql from "../importSql"

const importFile = importSql("exists")

export const EXISTS_ALBUM = importFile("album")
export const EXISTS_COLUMN = importFile("column")
export const EXISTS_USER_DOC = importFile("userDoc")
export const EXISTS_ALBUM_SONG = importFile("albumSong")
export const EXISTS_PLAYLIST_SONG = importFile("playlistSong")