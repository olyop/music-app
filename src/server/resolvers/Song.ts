import {
	Key,
	Song,
	Play,
	Album,
	Genre,
	Artist,
	SqlParse,
	UserArgs,
	S3FileExt,
	S3FileType,
	PGClient,
} from "../types"

import {
	sqlJoin,
	sqlQuery,
	getS3Object,
	parseSqlRow,
	parseSqlTable,
	createResolver,
	getUserDocInLib,
	getS3CatalogKey,
	getUserDocDateAdded,
	getSqlRowCountOrNull,
} from "../helpers"

import {
	SELECT_KEY,
	SELECT_ALBUM,
	SELECT_SONG_PLAYS,
	SELECT_SONG_GENRES,
	SELECT_SONG_ARTISTS,
	SELECT_SONG_REMIXERS,
	SELECT_SONG_FEATURING,
	SELECT_USER_DOC_PLAYS,
} from "../sql"

import { COLUMN_NAMES } from "../globals"

const resolver =
	createResolver<Song>()

export const size =
	resolver<number>(
		({ parent, context }) => (
			getS3Object(context.s3)({
				parse: ({ length }) => length,
				key: getS3CatalogKey(
					parent.songId,
					S3FileType.FULL,
					S3FileExt.MP3,
				),
			})
		),
	)

export const key =
	resolver<Key>(
		({ parent, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_KEY,
				parse: parseSqlRow(),
				variables: [{
					key: "keyId",
					value: parent.keyId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.KEY),
				}],
			})
		),
	)

export const album =
	resolver<Album>(
		({ parent, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_ALBUM,
				parse: parseSqlRow(),
				variables: [{
					key: "albumId",
					value: parent.albumId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.ALBUM),
				}],
			})
		),
	)

export const genres =
	resolver<Genre[]>(
		({ parent, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_SONG_GENRES,
				parse: parseSqlTable(),
				variables: [{
					key: "songId",
					value: parent.songId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.GENRE, "genres"),
				}],
			})
		),
	)

export const artists =
	resolver<Artist[]>(
		({ parent, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_SONG_ARTISTS,
				parse: parseSqlTable(),
				variables: [{
					key: "songId",
					value: parent.songId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.ARTIST, "artists"),
				}],
			})
		),
	)

export const remixers =
	resolver<Artist[]>(
		({ parent, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_SONG_REMIXERS,
				parse: parseSqlTable(),
				variables: [{
					key: "songId",
					value: parent.songId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.ARTIST, "artists"),
				}],
			})
		),
	)

export const featuring =
	resolver<Artist[]>(
		({ parent, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_SONG_FEATURING,
				parse: parseSqlTable(),
				variables: [{
					key: "songId",
					value: parent.songId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.ARTIST, "artists"),
				}],
			})
		),
	)

export const playsTotal =
	resolver<number | null>(
		({ parent, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_SONG_PLAYS,
				parse: getSqlRowCountOrNull,
				variables: [{
					key: "songId",
					value: parent.songId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.PLAY),
				}],
			})
		),
	)

const getUserSongPlays =
	(client: PGClient) =>
		<T>(userId: string, songId: string, parse: SqlParse<T>) =>
			sqlQuery(client)({
				sql: SELECT_USER_DOC_PLAYS,
				parse,
				variables: [{
					key: "userId",
					value: userId,
				},{
					key: "songId",
					value: songId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.PLAY),
				}],
			})

export const userPlays =
	resolver<Play[], UserArgs>(
		({ parent, args, context }) => (
			getUserSongPlays(context.pg)(
				args.userId,
				parent.songId,
				parseSqlTable(),
			)
		),
	)

export const userPlaysTotal =
	resolver<number | null, UserArgs>(
		({ parent, args, context }) => (
			getUserSongPlays(context.pg)(
				args.userId,
				parent.songId,
				getSqlRowCountOrNull,
			)
		),
	)

export const dateAdded =
	resolver<number | null, UserArgs>(
		({ parent, args, context }) => (
			getUserDocDateAdded(context.pg)({
				userId: args.userId,
				docId: parent.songId,
				columnName: "song_id",
				userDocTable: "users_songs",
			})
		),
	)

export const inLibrary =
	resolver<boolean, UserArgs>(
		({ parent, args, context }) => (
			getUserDocInLib(context.pg)({
				userId: args.userId,
				docId: parent.songId,
				columnName: "song_id",
				userDocTable: "users_songs",
			})
		),
	)