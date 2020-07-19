import {
	Song,
	Album,
	Artist,
	UserArgs,
	AddRemoveInput,
} from "../../../types"

import {
	SELECT_SONG,
	SELECT_ALBUM,
	SELECT_ARTIST,
} from "../../../sql"

import { rmUserDoc } from "./rmUserDoc"
import { addUserDoc } from "./addUserDoc"
import { COLUMN_NAMES } from "../../../globals"
import { createResolver } from "../../../helpers"

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
	resolver<Album, AlbumArgs>(
		({ args }) => rmUserDoc(userAlbumConfig(args.albumId, args.userId)),
	)

export const addUserAlbum =
	resolver<Album, AlbumArgs>(
		({ args }) => addUserDoc(userAlbumConfig(args.albumId, args.userId)),
	)

interface ArtistArgs extends UserArgs {
	artistId: string,
}

export const rmUserArtist =
	resolver<Artist, ArtistArgs>(
		({ args }) => rmUserDoc(userArtistConfig(args.artistId, args.userId)),
	)

export const addUserArtist =
	resolver<Artist, ArtistArgs>(
		({ args }) => addUserDoc(userArtistConfig(args.artistId, args.userId)),
	)