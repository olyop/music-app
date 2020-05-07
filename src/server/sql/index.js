import path from "path"
import sqlImport from "../helpers/sql/sqlImport.js"
import sqlTransaction from "../helpers/sql/sqlTransaction.js"

import { SQL_FOLER_PATH } from "../globals/paths.js"

const sqlPath = (folder, file) =>
  path.join(SQL_FOLER_PATH, folder, `${file}.sql`)

const sqlImportTable = file => sqlImport(sqlPath("tables", file))
const sqlImportCheck = file => sqlImport(sqlPath("checks", file))
const sqlImportExists = file => sqlImport(sqlPath("exists", file))
const sqlImportSelect = file => sqlImport(sqlPath("selects", file))
const sqlImportInsert = file => sqlImport(sqlPath("inserts", file))
const sqlImportUpdate = file => sqlImport(sqlPath("updateS", file))
const sqlImportDelete = file => sqlImport(sqlPath("deletes", file))

export const INSERT_USER = sqlImportInsert("user")
export const INSERT_SONG = sqlImportInsert("song")
export const INSERT_ALBUM = sqlImportInsert("album")
export const INSERT_GENRE = sqlImportInsert("genre")
export const INSERT_ARTIST = sqlImportInsert("artist")
export const INSERT_USER_DOC = sqlImportInsert("userDoc")
export const INSERT_SONG_FEAT = sqlImportInsert("songFeat")
export const INSERT_SONG_GENRE = sqlImportInsert("songGenre")
export const INSERT_SONG_ARTIST = sqlImportInsert("songArtist")
export const INSERT_SONG_REMIXER = sqlImportInsert("songRemixer")
export const INSERT_ALBUM_ARTIST = sqlImportInsert("albumArtist")

export const SELECT_PLAY = sqlImportSelect("play")
export const SELECT_SONG = sqlImportSelect("song")
export const SELECT_USER = sqlImportSelect("user")
export const SELECT_ALBUM = sqlImportSelect("album")
export const SELECT_GENRE = sqlImportSelect("genre")
export const SELECT_SONGS = sqlImportSelect("songs")
export const SELECT_ALBUMS = sqlImportSelect("albums")
export const SELECT_ARTIST = sqlImportSelect("artist")
export const SELECT_GENRES = sqlImportSelect("genres")
export const SELECT_ARTISTS = sqlImportSelect("artists")
export const SELECT_SONGS_IN = sqlImportSelect("songsIn")
export const SELECT_PLAYLIST = sqlImportSelect("playlist")
export const SELECT_USER_DOCS = sqlImportSelect("userDocs")
export const SELECT_PLAYLISTS = sqlImportSelect("playlists")
export const SELECT_NEW_ALBUMS = sqlImportSelect("newAlbums")
export const SELECT_USER_PLAYS = sqlImportSelect("userPlays")
export const SELECT_ALBUM_SONGS = sqlImportSelect("albumSongs")
export const SELECT_GENRE_SONGS = sqlImportSelect("genreSongs")
export const SELECT_SONG_GENRES = sqlImportSelect("songGenres")
export const SELECT_ARTIST_SONGS = sqlImportSelect("artistSongs")
export const SELECT_SONG_ARTISTS = sqlImportSelect("songArtists")
export const SELECT_TOP_TEN_SONGS = sqlImportSelect("topTenSongs")
export const SELECT_ALBUM_ARTISTS = sqlImportSelect("albumArtists")
export const SELECT_ARTIST_ALBUMS = sqlImportSelect("artistAlbums")
export const SELECT_SONG_REMIXERS = sqlImportSelect("songRemixers")
export const SELECT_USER_DOC_PLAYS = sqlImportSelect("userDocPlays")
export const SELECT_USER_DOC_ADDED = sqlImportSelect("userDocAdded")
export const SELECT_USER_DOC_IN_LIB = sqlImportSelect("userDocInLib")
export const SELECT_PLAYLIST_SONGS = sqlImportSelect("playlistSongs")
export const SELECT_SONG_FEATURING = sqlImportSelect("songFeaturing")
export const SELECT_USER_ALBUM_PLAYS = sqlImportSelect("userAlbumPlays")

export const EXISTS_COLUMN = sqlImportExists("column")
export const EXISTS_USER_DOC = sqlImportExists("userDoc")
export const EXISTS_ALBUM_SONG = sqlImportExists("albumSong")

export const UPDATE_USER_PREV = sqlImportUpdate("userPrev")
export const UPDATE_USER_PLAY = sqlImportUpdate("userPlay")
export const UPDATE_USER_NEXT = sqlImportUpdate("userNext")
export const UPDATE_USER_DOC_IN_LIB = sqlImportUpdate("userDocInLib")
export const UPDATE_USER_SONG_NEXT = sqlImportUpdate("userSongNext")
export const UPDATE_USER_SONG_LATER = sqlImportUpdate("userSongLater")
export const UPDATE_USER_SONG_QUEUE = sqlImportUpdate("userSongQueue")

export const DELETE_USER_DOC = sqlImportDelete("userDoc")

export const CHECK_SONG_IS_CURRENT = sqlImportCheck("songIsCurrent")

export const TABLE_PLAYS = sqlImportTable("plays")
export const TABLE_SONGS = sqlImportTable("songs")
export const TABLE_USERS = sqlImportTable("users")
export const TABLE_ALBUMS = sqlImportTable("albums")
export const TABLE_GENRES = sqlImportTable("genres")
export const TABLE_ARTISTS = sqlImportTable("artists")
export const TABLE_PLAYLISTS = sqlImportTable("playlists")
export const TABLE_USERS_NEXTS = sqlImportTable("usersNexts")
export const TABLE_USERS_PREVS = sqlImportTable("usersPrevs")
export const TABLE_USERS_SONGS = sqlImportTable("usersSongs")
export const TABLE_SONGS_GENRES = sqlImportTable("songsGenres")
export const TABLE_USERS_ALBUMS = sqlImportTable("usersAlbums")
export const TABLE_USERS_GENRES = sqlImportTable("usersGenres")
export const TABLE_USERS_QUEUES = sqlImportTable("usersQueues")
export const TABLE_SONGS_ARTISTS = sqlImportTable("songsArtistS")
export const TABLE_USERS_ARTISTS = sqlImportTable("usersArtists")
export const TABLE_ALBUMS_ARTISTS = sqlImportTable("albumsArtists")
export const TABLE_SONGS_REMIXERS = sqlImportTable("songsRemixers")
export const TABLE_PLAYLISTS_SONGS = sqlImportTable("playlistsSongs")
export const TABLE_USERS_PLAYLISTS = sqlImportTable("usersPlaylists")
export const TABLE_SONGS_FEATURINGS = sqlImportTable("songsFeaturings")

const queries = [
  TABLE_ARTISTS,
  TABLE_GENRES,
  TABLE_ALBUMS,
  TABLE_ALBUMS_ARTISTS,
  TABLE_SONGS,
  TABLE_SONGS_GENRES,
  TABLE_SONGS_ARTISTS,
  TABLE_SONGS_REMIXERS,
  TABLE_SONGS_FEATURINGS,
  TABLE_USERS,
  TABLE_USERS_NEXTS,
  TABLE_USERS_PREVS,
  TABLE_USERS_SONGS,
  TABLE_USERS_ALBUMS,
  TABLE_USERS_GENRES,
  TABLE_USERS_QUEUES,
  TABLE_USERS_ARTISTS,
  TABLE_PLAYLISTS,
  TABLE_PLAYLISTS_SONGS,
  TABLE_USERS_PLAYLISTS,
  TABLE_PLAYS,
]

// sqlTransaction(queries)
//   .catch(error => { throw error })
