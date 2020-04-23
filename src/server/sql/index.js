import path from "path"
import { SQL_FOLER_PATH } from "../globals.js"
import { importSql, initializeTables } from "../helpers/index.js"

const sqlPath = (folder, file) => path.join(SQL_FOLER_PATH, folder, `${file}.sql`)

const importSqlAdmin = file => importSql(sqlPath("admin", file))
const importSqlTable = file => importSql(sqlPath("tables", file))
const importSqlSelect = file => importSql(sqlPath("selects", file))
const importSqlInsert = file => importSql(sqlPath("inserts", file))

export const ADMIN_DESC_TABLE = importSqlAdmin("descTable")
export const ADMIN_DESC_TABLES = importSqlAdmin("descTables")

export const INSERT_SONG = importSqlInsert("song")
export const INSERT_ALBUM = importSqlInsert("album")
export const INSERT_GENRE = importSqlInsert("genre")
export const INSERT_ARTIST = importSqlInsert("artist")
export const INSERT_SONG_FEAT = importSqlInsert("songFeat")
export const INSERT_SONG_GENRE = importSqlInsert("songGenre")
export const INSERT_SONG_ARTIST = importSqlInsert("songArtist")
export const INSERT_SONG_REMIXER = importSqlInsert("songRemixer")
export const INSERT_ALBUM_ARTIST = importSqlInsert("albumArtist")

export const SELECT_NOW = importSqlSelect("now")
export const SELECT_PLAY = importSqlSelect("play")
export const SELECT_SONG = importSqlSelect("song")
export const SELECT_USER = importSqlSelect("user")
export const SELECT_ALBUM = importSqlSelect("album")
export const SELECT_GENRE = importSqlSelect("genre")
export const SELECT_SONGS = importSqlSelect("songs")
export const SELECT_ALBUMS = importSqlSelect("albums")
export const SELECT_ARTIST = importSqlSelect("artist")
export const SELECT_GENRES = importSqlSelect("genres")
export const SELECT_ARTISTS = importSqlSelect("artists")
export const SELECT_PLAYLIST = importSqlSelect("playlist")
export const SELECT_PLAYLISTS = importSqlSelect("playlists")
export const SELECT_ALBUM_PLAYS = importSqlSelect("albumPlays")
export const SELECT_ALBUM_SONGS = importSqlSelect("albumSongs")
export const SELECT_ARTIST_SONGS = importSqlSelect("artistSongs")
export const SELECT_ALBUM_ARTISTS = importSqlSelect("albumArtists")
export const SELECT_IS_SONG_UNIQUE = importSqlSelect("isSongUnique")
export const SELECT_ALBUM_USER_ADDED = importSqlSelect("albumUserAdded")
export const SELECT_ALBUM_USER_PLAYS = importSqlSelect("albumUserPlays")
export const SELECT_ALBUM_USER_IN_LIB = importSqlSelect("albumUserInLib")

export const TABLE_PLAYS = importSqlTable("plays")
export const TABLE_SONGS = importSqlTable("songs")
export const TABLE_USERS = importSqlTable("users")
export const TABLE_ALBUMS = importSqlTable("albums")
export const TABLE_GENRES = importSqlTable("genres")
export const TABLE_ARTISTS = importSqlTable("artists")
export const TABLE_PLAYLISTS = importSqlTable("playlists")
export const TABLE_USERS_NEXTS = importSqlTable("usersNexts")
export const TABLE_USERS_PREVS = importSqlTable("usersPrevs")
export const TABLE_USERS_SONGS = importSqlTable("usersSongs")
export const TABLE_SONGS_GENRES = importSqlTable("songsGenres")
export const TABLE_USERS_ALBUMS = importSqlTable("usersAlbums")
export const TABLE_USERS_GENRES = importSqlTable("usersGenres")
export const TABLE_USERS_QUEUES = importSqlTable("usersQueues")
export const TABLE_SONGS_ARTISTS = importSqlTable("songsArtistS")
export const TABLE_USERS_ARTISTS = importSqlTable("usersArtists")
export const TABLE_ALBUMS_ARTISTS = importSqlTable("albumsArtists")
export const TABLE_SONGS_REMIXERS = importSqlTable("songsRemixers")
export const TABLE_PLAYLISTS_SONGS = importSqlTable("playlistsSongs")
export const TABLE_USERS_PLAYLISTS = importSqlTable("usersPlaylists")
export const TABLE_SONGS_FEATURINGS = importSqlTable("songsFeaturings")

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

initializeTables(queries)
