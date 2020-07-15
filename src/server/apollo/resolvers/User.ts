import { isNull } from "lodash"

import {
	Song,
	Play,
	User,
	Album,
	Genre,
	Artist,
	Playlist,
} from "../../types"

import {
	SELECT_SONG,
	SELECT_SONGS_IN,
	SELECT_USER_PLAYS,
} from "../../sql"

import { userDocs } from "./common"
import { COLUMN_NAMES } from "../../globals"
import { sql, createResolver } from "../../helpers"

const resolver =
	createResolver<User>()

export const current =
	resolver<Song | null>(
		({ parent }) => (
			isNull(parent.current) ? null : (
				sql.query({
					sql: SELECT_SONG,
					parse: sql.parseRow(),
					variables: [{
						key: "songId",
						value: parent.current,
					},{
						string: false,
						key: "columnNames",
						value: sql.join(COLUMN_NAMES.SONG),
					}],
				})
			)
		),
	)

export const prev =
	resolver<Song[]>(
		({ parent }) => (
			sql.query({
				sql: SELECT_SONGS_IN,
				parse: sql.parseTable(),
				variables: [{
					key: "userId",
					value: parent.userId,
				},{
					string: false,
					key: "tableName",
					value: "users_prevs",
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.SONG),
				}],
			})
		),
	)

export const next =
	resolver<Song[]>(
		({ parent }) => (
			sql.query({
				sql: SELECT_SONGS_IN,
				parse: sql.parseTable(),
				variables: [{
					key: "userId",
					value: parent.userId,
				},{
					string: false,
					key: "tableName",
					value: "users_nexts",
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.SONG),
				}],
			})
		),
	)

export const queue =
	resolver<Song[]>(
		({ parent }) => (
			sql.query({
				sql: SELECT_SONGS_IN,
				parse: sql.parseTable(),
				variables: [{
					key: "userId",
					value: parent.userId,
				},{
					string: false,
					key: "tableName",
					value: "users_queues",
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.SONG),
				}],
			})
		),
	)

export const plays =
	resolver<Play[]>(
		({ parent }) => (
			sql.query({
				sql: SELECT_USER_PLAYS,
				parse: sql.parseTable(),
				variables: [{
					key: "userId",
					value: parent.userId,
				}],
			})
		),
	)

export const songs =
	resolver<Song[]>(
		({ parent }) => (
			userDocs({
				tableName: "songs",
				columnName: "song_id",
				userId: parent.userId,
				userTableName: "users_songs",
				columnNames: COLUMN_NAMES.SONG,
			})
		),
	)

export const genres =
	resolver<Genre[]>(
		({ parent }) => (
			userDocs({
				tableName: "genres",
				columnName: "genre_id",
				userId: parent.userId,
				userTableName: "users_genres",
				columnNames: COLUMN_NAMES.GENRE,
			})
		),
	)

export const albums =
	resolver<Album[]>(
		({ parent }) => (
			userDocs({
				tableName: "albums",
				columnName: "album_id",
				userId: parent.userId,
				userTableName: "users_albums",
				columnNames: COLUMN_NAMES.ALBUM,
			})
		),
	)

export const artists =
	resolver<Artist[]>(
		({ parent }) => (
			userDocs({
				tableName: "artists",
				userId: parent.userId,
				columnName: "artist_id",
				userTableName: "users_artists",
				columnNames: COLUMN_NAMES.ARTIST,
			})
		),
	)

export const playlists =
	resolver<Playlist[]>(
		({ parent }) => (
			userDocs({
				userId: parent.userId,
				tableName: "playlists",
				columnName: "playlist_id",
				columnNames: COLUMN_NAMES.SONG,
				userTableName: "users_playlists",
			})
		),
	)