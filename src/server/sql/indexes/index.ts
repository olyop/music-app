import importSql from "../importSql"

const importFile = importSql("indexes")

export const USERS_NAME_INDEX = importFile("usersName")
export const SONGS_TITLE_INDEX = importFile("songsTitle")
export const GENRES_NAME_INDEX = importFile("genresName")
export const ALBUMS_TITLE_INDEX = importFile("albumsTitle")
export const ARTISTS_NAME_INDEX = importFile("artistsName")
export const PLAYLISTS_NAME_INDEX = importFile("playlistsName")	