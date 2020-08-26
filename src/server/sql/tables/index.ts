import importSql from "../importSql"

const importFile = importSql("tables")

export const TABLE_PLAYS = importFile("plays")
export const TABLE_SONGS = importFile("songs")
export const TABLE_USERS = importFile("users")
export const TABLE_ALBUMS = importFile("albums")
export const TABLE_GENRES = importFile("genres")
export const TABLE_ARTISTS = importFile("artists")
export const TABLE_PLAYLISTS = importFile("playlists")
export const TABLE_USERS_NEXTS = importFile("usersNexts")
export const TABLE_USERS_PREVS = importFile("usersPrevs")
export const TABLE_USERS_SONGS = importFile("usersSongs")
export const TABLE_SONGS_GENRES = importFile("songsGenres")
export const TABLE_USERS_ALBUMS = importFile("usersAlbums")
export const TABLE_USERS_QUEUES = importFile("usersQueues")
export const TABLE_SONGS_ARTISTS = importFile("songsArtistS")
export const TABLE_USERS_ARTISTS = importFile("usersArtists")
export const TABLE_ALBUMS_ARTISTS = importFile("albumsArtists")
export const TABLE_SONGS_REMIXERS = importFile("songsRemixers")
export const TABLE_PLAYLISTS_SONGS = importFile("playlistsSongs")
export const TABLE_USERS_PLAYLISTS = importFile("usersPlaylists")
export const TABLE_SONGS_FEATURINGS = importFile("songsFeaturings")