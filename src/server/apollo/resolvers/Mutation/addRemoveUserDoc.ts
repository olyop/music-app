import {
	SELECT_SONG,
	SELECT_ALBUM,
	SELECT_GENRE,
	SELECT_ARTIST,
} from "../../../sql"

import rmUserDoc from "./rmUserDoc"
import addUserDoc from "./addUserDoc"

const userSongConfig = {
	argKey: "songId",
	columnName: "song_id",
	docTableName: "songs",
	returnSql: SELECT_SONG,
	userTableName: "users_songs",
}

const userAlbumConfig = {
	argKey: "albumId",
	columnName: "album_id",
	docTableName: "albums",
	returnSql: SELECT_ALBUM,
	userTableName: "users_albums",
}

const userGenreConfig = {
	argKey: "genreId",
	columnName: "genre_id",
	docTableName: "genres",
	returnSql: SELECT_GENRE,
	userTableName: "users_genres",
}

const userArtistConfig = {
	argKey: "artistId",
	columnName: "artist_id",
	docTableName: "artists",
	returnSql: SELECT_ARTIST,
	userTableName: "users_artist",
}

export const rmUserSong = rmUserDoc(userSongConfig)
export const addUserSong = addUserDoc(userSongConfig)

export const rmUserAlbum = rmUserDoc(userAlbumConfig)
export const addUserAlbum = addUserDoc(userAlbumConfig)

export const rmUserGenre = rmUserDoc(userGenreConfig)
export const addUserGenre = addUserDoc(userGenreConfig)

export const rmUserArtist = rmUserDoc(userArtistConfig)
export const addUserArtist = addUserDoc(userArtistConfig)