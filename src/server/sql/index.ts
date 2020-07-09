import fs from "fs"
import { join } from "path"

// import { sql } from "../helpers"
import { SQL_FOLER_PATH } from "../globals"

const importFile = (path: string) =>
	fs.readFileSync(path).toString()

const sqlPath = (folder: string, file: string) =>
	join(SQL_FOLER_PATH, folder, `${file}.sql`)

const importFileTable = (file: string) => importFile(sqlPath("tables", file))
const importFileCheck = (file: string) => importFile(sqlPath("checks", file))
const importFileExists = (file: string) => importFile(sqlPath("exists", file))
const importFileSelect = (file: string) => importFile(sqlPath("selects", file))
const importFileInsert = (file: string) => importFile(sqlPath("inserts", file))
const importFileUpdate = (file: string) => importFile(sqlPath("updateS", file))
const importFileDelete = (file: string) => importFile(sqlPath("deletes", file))

export const INSERT_USER = importFileInsert("user")
export const INSERT_SONG = importFileInsert("song")
export const INSERT_ALBUM = importFileInsert("album")
export const INSERT_GENRE = importFileInsert("genre")
export const INSERT_ARTIST = importFileInsert("artist")
export const INSERT_USER_DOC = importFileInsert("userDoc")
export const INSERT_SONG_FEAT = importFileInsert("songFeat")
export const INSERT_SONG_GENRE = importFileInsert("songGenre")
export const INSERT_SONG_ARTIST = importFileInsert("songArtist")
export const INSERT_SONG_REMIXER = importFileInsert("songRemixer")
export const INSERT_ALBUM_ARTIST = importFileInsert("albumArtist")

export const SELECT_PLAY = importFileSelect("play")
export const SELECT_SONG = importFileSelect("song")
export const SELECT_USER = importFileSelect("user")
export const SELECT_ALBUM = importFileSelect("album")
export const SELECT_GENRE = importFileSelect("genre")
export const SELECT_SONGS = importFileSelect("songs")
export const SELECT_ALBUMS = importFileSelect("albums")
export const SELECT_ARTIST = importFileSelect("artist")
export const SELECT_GENRES = importFileSelect("genres")
export const SELECT_SEARCH = importFileSelect("search")
export const SELECT_ARTISTS = importFileSelect("artists")
export const SELECT_SONGS_IN = importFileSelect("songsIn")
export const SELECT_PLAYLIST = importFileSelect("playlist")
export const SELECT_USER_DOCS = importFileSelect("userDocs")
export const SELECT_PLAYLISTS = importFileSelect("playlists")
export const SELECT_NEW_ALBUMS = importFileSelect("newAlbums")
export const SELECT_USER_PLAYS = importFileSelect("userPlays")
export const SELECT_ALBUM_SONGS = importFileSelect("albumSongs")
export const SELECT_GENRE_SONGS = importFileSelect("genreSongs")
export const SELECT_SONG_GENRES = importFileSelect("songGenres")
export const SELECT_ARTIST_PLAYS = importFileSelect("artistPlays")
export const SELECT_ARTIST_SONGS = importFileSelect("artistSongs")
export const SELECT_SONG_ARTISTS = importFileSelect("songArtists")
export const SELECT_TOP_TEN_SONGS = importFileSelect("topTenSongs")
export const SELECT_ALBUM_ARTISTS = importFileSelect("albumArtists")
export const SELECT_ARTIST_ALBUMS = importFileSelect("artistAlbums")
export const SELECT_SONG_REMIXERS = importFileSelect("songRemixers")
export const SELECT_USER_DOC_PLAYS = importFileSelect("userDocPlays")
export const SELECT_USER_DOC_ADDED = importFileSelect("userDocAdded")
export const SELECT_USER_DOC_IN_LIB = importFileSelect("userDocInLib")
export const SELECT_PLAYLIST_SONGS = importFileSelect("playlistSongs")
export const SELECT_SONG_FEATURING = importFileSelect("songFeaturing")
export const SELECT_USER_ALBUM_PLAYS = importFileSelect("userAlbumPlays")

export const EXISTS_COLUMN = importFileExists("column")
export const EXISTS_USER_DOC = importFileExists("userDoc")
export const EXISTS_ALBUM_SONG = importFileExists("albumSong")

export const UPDATE_USER_PREV = importFileUpdate("userPrev")
export const UPDATE_USER_PLAY = importFileUpdate("userPlay")
export const UPDATE_USER_NEXT = importFileUpdate("userNext")
export const UPDATE_USER_DOC_IN_LIB = importFileUpdate("userDocInLib")
export const UPDATE_USER_SONG_NEXT = importFileUpdate("userSongNext")
export const UPDATE_USER_SONG_LATER = importFileUpdate("userSongLater")
export const UPDATE_USER_SONG_QUEUE = importFileUpdate("userSongQueue")

export const DELETE_USER_DOC = importFileDelete("userDoc")

export const CHECK_SONG_IS_CURRENT = importFileCheck("songIsCurrent")

export const TABLE_PLAYS = importFileTable("plays")
export const TABLE_SONGS = importFileTable("songs")
export const TABLE_USERS = importFileTable("users")
export const TABLE_ALBUMS = importFileTable("albums")
export const TABLE_GENRES = importFileTable("genres")
export const TABLE_ARTISTS = importFileTable("artists")
export const TABLE_PLAYLISTS = importFileTable("playlists")
export const TABLE_USERS_NEXTS = importFileTable("usersNexts")
export const TABLE_USERS_PREVS = importFileTable("usersPrevs")
export const TABLE_USERS_SONGS = importFileTable("usersSongs")
export const TABLE_SONGS_GENRES = importFileTable("songsGenres")
export const TABLE_USERS_ALBUMS = importFileTable("usersAlbums")
export const TABLE_USERS_GENRES = importFileTable("usersGenres")
export const TABLE_USERS_QUEUES = importFileTable("usersQueues")
export const TABLE_SONGS_ARTISTS = importFileTable("songsArtistS")
export const TABLE_USERS_ARTISTS = importFileTable("usersArtists")
export const TABLE_ALBUMS_ARTISTS = importFileTable("albumsArtists")
export const TABLE_SONGS_REMIXERS = importFileTable("songsRemixers")
export const TABLE_PLAYLISTS_SONGS = importFileTable("playlistsSongs")
export const TABLE_USERS_PLAYLISTS = importFileTable("usersPlaylists")
export const TABLE_SONGS_FEATURINGS = importFileTable("songsFeaturings")

// const queries = [
// 	TABLE_ARTISTS,
// 	TABLE_GENRES,
// 	TABLE_ALBUMS,
// 	TABLE_ALBUMS_ARTISTS,
// 	TABLE_SONGS,
// 	TABLE_SONGS_GENRES,
// 	TABLE_SONGS_ARTISTS,
// 	TABLE_SONGS_REMIXERS,
// 	TABLE_SONGS_FEATURINGS,
// 	TABLE_USERS,
// 	TABLE_USERS_NEXTS,
// 	TABLE_USERS_PREVS,
// 	TABLE_USERS_SONGS,
// 	TABLE_USERS_ALBUMS,
// 	TABLE_USERS_GENRES,
// 	TABLE_USERS_QUEUES,
// 	TABLE_USERS_ARTISTS,
// 	TABLE_PLAYLISTS,
// 	TABLE_PLAYLISTS_SONGS,
// 	TABLE_USERS_PLAYLISTS,
// 	TABLE_PLAYS,
// ]

// sqlTransaction(queries)
//   .catch(error => { throw error })