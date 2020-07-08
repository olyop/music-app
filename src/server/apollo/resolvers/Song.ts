import { isNull } from "lodash"
import { QueryResult } from "pg"

import {
	Song,
	Play,
	Album,
	Genre,
	Artist,
	UserArgs,
} from "../../types"

import {
	SELECT_ALBUM,
	SELECT_SONG_GENRES,
	SELECT_SONG_ARTISTS,
	SELECT_SONG_REMIXERS,
	SELECT_SONG_FEATURING,
	SELECT_USER_DOC_PLAYS,
	CHECK_SONG_IS_CURRENT,
} from "../../sql"

import { COLUMN_NAMES } from "../../globals"
import { sql, createResolver } from "../../helpers"
import { userDocInLib, userDocDateAdded } from "./common"

const resolver =
	createResolver<Song>()

export const album =
	resolver<Album>(
		({ parent }) => (
			sql.query({
				sql: SELECT_ALBUM,
				parse: sql.parseRow(),
				variables: [{
					key: "albumId",
					value: parent.albumId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.ALBUM),
				}],
			})
		),
	)

export const genres =
	resolver<Genre[]>(
		({ parent }) => (
			sql.query({
				sql: SELECT_SONG_GENRES,
				parse: sql.parseTable(),
				variables: [{
					key: "songId",
					value: parent.songId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.GENRE, "genres"),
				}],
			})
		),
	)

export const artists =
	resolver<Artist[]>(
		({ parent }) => (
			sql.query({
				sql: SELECT_SONG_ARTISTS,
				parse: sql.parseTable(),
				variables: [{
					key: "songId",
					value: parent.songId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.ARTIST, "artists"),
				}],
			})
		),
	)

export const remixers =
	resolver<Artist[]>(
		({ parent }) => (
			sql.query({
				sql: SELECT_SONG_REMIXERS,
				parse: sql.parseTable(),
				variables: [{
					key: "songId",
					value: parent.songId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.ARTIST, "artists"),
				}],
			})
		),
	)

export const featuring =
	resolver<Artist[]>(
		({ parent }) => (
			sql.query({
				sql: SELECT_SONG_FEATURING,
				parse: sql.parseTable(),
				variables: [{
					key: "songId",
					value: parent.songId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.ARTIST, "artists"),
				}],
			})
		),
	)

export const plays =
	resolver<Play[], UserArgs>(
		({ parent, args }) => (
			sql.query({
				sql: SELECT_USER_DOC_PLAYS,
				parse: sql.parseTable(),
				variables: [{
					key: "songId",
					value: parent.songId,
				},{
					key: "userId",
					value: args.userId,
				}],
			})
		),
	)

export const isCurrent =
	resolver<boolean, UserArgs>(
		({ parent, args }) => (
			sql.query({
				sql: CHECK_SONG_IS_CURRENT,
				parse: ({ rows }: QueryResult<{ is_current: boolean }>) =>
					!isNull(rows[0].is_current),
				variables: [{
					key: "userId",
					value: args.userId,
				},{
					key: "songId",
					value: parent.songId,
				}],
			})
		),
	)

export const dateAdded =
	resolver<number, UserArgs>(
		({ parent, args }) => (
			userDocDateAdded({
				userId: args.userId,
				columnName: "song_id",
				docId: parent.albumId,
				userDocTable: "users_songs",
			})
		),
	)

export const inLibrary =
	resolver<boolean, UserArgs>(
		({ parent, args }) => (
			userDocInLib({
				userId: args.userId,
				docId: parent.albumId,
				columnName: "song_id",
				userDocTable: "users_songs",
			})
		),
	)