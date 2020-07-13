import {
	SELECT_SONG,
	SELECT_ALBUM,
	SELECT_GENRE,
	SELECT_ARTIST,
} from "../../../sql"

import { rmUserDoc } from "./rmUserDoc"
import { addUserDoc } from "./addUserDoc"
import { COLUMN_NAMES } from "../../../globals"
import { createResolver } from "../../../helpers"
import { Song, UserArgs, AddRemoveInput } from "../../../types"

const resolver =
	createResolver()

type AddRemoveFunc =
	(docId: string, userId: string) => AddRemoveInput

const userSongConfig: AddRemoveFunc =
	(docId, userId) => ({
		docId,
		userId,
		query: SELECT_SONG,
		columnName: "song_id",
		userTableName: "users_songs",
		columnNames: COLUMN_NAMES.SONG,
	})

const userAlbumConfig: AddRemoveFunc =
	(docId, userId) => ({
		docId,
		userId,
		query: SELECT_ALBUM,
		columnName: "album_id",
		userTableName: "users_albums",
		columnNames: COLUMN_NAMES.ALBUM,
	})

const userGenreConfig: AddRemoveFunc =
	(docId, userId) => ({
		docId,
		userId,
		query: SELECT_GENRE,
		columnName: "genre_id",
		userTableName: "users_genres",
		columnNames: COLUMN_NAMES.GENRE,
	})

const userArtistConfig: AddRemoveFunc =
	(docId, userId) => ({
		docId,
		userId,
		query: SELECT_ARTIST,
		columnName: "artist_id",
		userTableName: "users_artists",
		columnNames: COLUMN_NAMES.ARTIST,
	})

interface SongArgs extends UserArgs {
	songId: string,
}

export const rmUserSong =
	resolver<Song, SongArgs>(
		({ args }) => rmUserDoc(userSongConfig(args.songId, args.userId)),
	)

export const addUserSong =
	resolver<Song, SongArgs>(
		({ args }) => addUserDoc(userSongConfig(args.songId, args.userId)),
	)

interface AlbumArgs extends UserArgs {
	albumId: string,
}

export const rmUserAlbum =
	resolver<Song, AlbumArgs>(
		({ args }) => rmUserDoc(userAlbumConfig(args.albumId, args.userId)),
	)

export const addUserAlbum =
	resolver<Song, AlbumArgs>(
		({ args }) => addUserDoc(userAlbumConfig(args.albumId, args.userId)),
	)

interface GenreArgs extends UserArgs {
	genreId: string,
}

export const rmUserGenre =
	resolver<Song, GenreArgs>(
		({ args }) => rmUserDoc(userGenreConfig(args.genreId, args.userId)),
	)

export const addUserGenre =
	resolver<Song, GenreArgs>(
		({ args }) => addUserDoc(userGenreConfig(args.genreId, args.userId)),
	)

interface ArtistArgs extends UserArgs {
	artistId: string,
}

export const rmUserArtist =
	resolver<Song, ArtistArgs>(
		({ args }) => rmUserDoc(userArtistConfig(args.artistId, args.userId)),
	)

export const addUserArtist =
	resolver<Song, ArtistArgs>(
		({ args }) => addUserDoc(userArtistConfig(args.artistId, args.userId)),
	)