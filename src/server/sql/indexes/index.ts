import importSql from "../importSql"

const importFile = importSql("indexes")

export const USERS_SEARCH_INDEX = importFile("usersSearch")
export const SONGS_SEARCH_INDEX = importFile("songsSearch")
export const GENRES_SEARCH_INDEX = importFile("genresSearch")
export const ALBUMS_SEARCH_INDEX = importFile("albumsSearch")
export const ARTISTS_SEARCH_INDEX = importFile("artistsSearch")
export const PLAYLISTS_SEARCH_INDEX = importFile("playlistsSearch")