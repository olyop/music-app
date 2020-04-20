import fs from "fs"
import path from "path"
import { SQL_FOLDER_PATH } from "../globals.js"
import { importSql as test } from "../helpers/index.js"

test(SQL_FOLDER_PATH + "/test.sql")({
  column: "name",
  table: "artists",
  value: "Tame Impala",
})

const importSql = type => name =>
  fs.readFileSync(path.join(SQL_FOLDER_PATH, type, `${name}.sql`))
    .toString()

const importAdmin = importSql("admin")
const importTable = importSql("tables")
const importWheres = importSql("wheres")
const importInsert = importSql("inserts")
const importSelects = importSql("selects")

export const WHERE_ALBUM = importWheres("album")
export const WHERE_GENRE = importWheres("genre")
export const WHERE_ARTIST = importWheres("artist")

export const DESCRIBE_TABLE = importAdmin("describeTable")
export const DESCRIBE_TABLES = importAdmin("describeTables")

export const SELECT_NOW = importSelects("now")
export const SELECT_USER = importSelects("user")
export const SELECT_PLAY = importSelects("play")
export const SELECT_SONG = importSelects("song")
export const SELECT_ALBUM = importSelects("album")
export const SELECT_GENRE = importSelects("genre")
export const SELECT_SONGS = importSelects("songs")
export const SELECT_ARTIST = importSelects("artist")
export const SELECT_ALBUMS = importSelects("albums")
export const SELECT_GENRES = importSelects("genres")
export const SELECT_ARTISTS = importSelects("artists")
export const SELECT_PLAYLIST = importSelects("playlist")
export const SELECT_PLAYLISTS = importSelects("playlists")
export const SELECT_ALBUM_SONGS = importSelects("albumSongs")
export const SELECT_ALBUM_ARTISTS = importSelects("albumArtists")
export const SELECT_ALBUM_USER_PLAYS = importSelects("albumUserPlays")
export const SELECT_ALBUM_USER_ADDED = importSelects("albumUserAdded")
export const SELECT_ALBUM_USER_IN_LIBRARY = importSelects("albumUserInLibrary")

export const INSERT_SONG = importInsert("song")
export const INSERT_ALBUM = importInsert("album")
export const INSERT_GENRE = importInsert("genre")
export const INSERT_ARTIST = importInsert("artist")
export const INSERT_SONG_GENRE = importInsert("songGenre")
export const INSERT_SONG_ARTIST = importInsert("songArtist")
export const INSERT_ALBUM_ARTIST = importInsert("albumArtist")
export const INSERT_SONG_REMIXER = importInsert("songRemixer")
export const INSERT_SONG_FEATURING = importInsert("songFeaturing")

export const TABLE_PLAYS = importTable("plays")
export const TABLE_SONGS = importTable("songs")
export const TABLE_USERS = importTable("users")
export const TABLE_GENRES = importTable("genres")
export const TABLE_ALBUMS = importTable("albums")
export const TABLE_ARTISTS = importTable("artists")
export const TABLE_PLAYLISTS = importTable("playlists")
export const TABLE_USERS_SONGS = importTable("usersSongs")
export const TABLE_USERS_NEXTS = importTable("usersNexts")
export const TABLE_USERS_PREVS = importTable("usersPrevs")
export const TABLE_USERS_QUEUES = importTable("usersQueues")
export const TABLE_USERS_ALBUMS = importTable("usersAlbums")
export const TABLE_USERS_GENRES = importTable("usersGenres")
export const TABLE_SONGS_GENRES = importTable("songsGenres")
export const TABLE_SONGS_ARTISTS = importTable("songsArtists")
export const TABLE_USERS_ARTISTS = importTable("usersArtists")
export const TABLE_ALBUMS_ARTISTS = importTable("albumsArtists")
export const TABLE_SONGS_REMIXERS = importTable("songsRemixers")
export const TABLE_PLAYLISTS_SONGS = importTable("playlistsSongs")
export const TABLE_SONGS_FEATURING = importTable("songsFeaturing")
export const TABLE_USERS_PLAYLISTS = importTable("usersPlaylists")
