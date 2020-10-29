import { v4 as uuid } from "uuid"

import {
	Song,
	Play,
	Album,
	Genre,
	Artist,
	UserArgs,
	S3FileExt,
	S3FileType,
	SqlParse,
	Key,
} from "../types"

import {
	sqlJoin,
	getS3Object,
	parseSqlRow,
	sqlPoolQuery,
	parseSqlTable,
	createResolver,
	getUserDocInLib,
	getS3CatalogKey,
	getUserDocDateAdded,
	getSqlRowCountOrNull,
} from "../helpers"

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

const resolver =
	createResolver<Song>()

export const album =
	resolver<Album>(
		({ parent }) => (
			sqlPoolQuery({
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
		({ parent }) => (
			sqlPoolQuery({
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
		({ parent }) => (
			sqlPoolQuery({
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
		({ parent }) => (
			sqlPoolQuery({
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
		({ parent }) => (
			sqlPoolQuery({
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

export const size =
	resolver<number>(
		({ parent }) => (
			getS3Object({
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
		() => Promise.resolve({
			flat: "Bb",
			sharp: "A#",
			keyId: uuid(),
			camelot: "6B",
		}),
	)

export const bpm =
	resolver<number>(
		() => Promise.resolve(120),
	)

export const playsTotal =
	resolver<number | null>(
		({ parent }) => (
			sqlPoolQuery({
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
	<T>(userId: string, songId: string, parse: SqlParse<T>) =>
		sqlPoolQuery({
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
		({ parent, args }) => (
			getUserSongPlays(
				args.userId,
				parent.songId,
				parseSqlTable(),
			)
		),
	)

export const userPlaysTotal =
	resolver<number | null, UserArgs>(
		({ parent, args }) => (
			getUserSongPlays(
				args.userId,
				parent.songId,
				getSqlRowCountOrNull,
			)
		),
	)

export const dateAdded =
	resolver<number | null, UserArgs>(
		({ parent, args }) => (
			getUserDocDateAdded({
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
			getUserDocInLib({
				userId: args.userId,
				docId: parent.songId,
				columnName: "song_id",
				userDocTable: "users_songs",
			})
		),
	)