import {
	Song,
	Play,
	Album,
	Genre,
	Artist,
	UserArgs,
	ImgSizeEnum,
} from "../types"

import {
	SELECT_ALBUM,
	SELECT_SONG_PLAYS,
	SELECT_SONG_GENRES,
	SELECT_SONG_ARTISTS,
	SELECT_SONG_REMIXERS,
	SELECT_SONG_FEATURING,
	SELECT_USER_DOC_PLAYS,
} from "../sql"

import { COLUMN_NAMES } from "../globals"
import { sql, createResolver, s3 } from "../helpers"
import { userDocInLib, userDocDateAdded } from "./getUserDoc"

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

export const size =
	resolver<number>(
		({ parent }) => (
			s3.getObject({
				parse: ({ byteLength }) => byteLength,
				key: s3.catalogObjectKey({
					format: "mp3",
					id: parent.songId,
					size: ImgSizeEnum.FULL,
				}),
			})
		),
	)

export const totalPlays =
	resolver<number | null>(
		({ parent }) => (
			sql.query({
				sql: SELECT_SONG_PLAYS,
				parse: sql.rowCountOrNull,
				variables: [{
					key: "songId",
					value: parent.songId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.PLAY),
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
					key: "userId",
					value: args.userId,
				},{
					key: "songId",
					value: parent.songId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.PLAY),
				}],
			})
		),
	)

export const dateAdded =
	resolver<number | null, UserArgs>(
		({ parent, args }) => (
			userDocDateAdded({
				userId: args.userId,
				docId: parent.songId,
				columnName: "song_id",
				userDocTable: "users_songs",
			})
		),
	)

export const inLibrary =
	resolver<boolean, UserArgs>(
		({ parent, args }) => (
			userDocInLib({
				userId: args.userId,
				docId: parent.songId,
				columnName: "song_id",
				userDocTable: "users_songs",
			})
		),
	)