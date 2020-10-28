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
import { getUserDocInLib, getUserDocDateAdded } from "../helpers/resolver/userDocs"

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
				parse: ({ length }) => length,
				key: s3.catalogObjectKey(
					parent.songId,
					S3FileType.FULL,
					S3FileExt.MP3,
				),
			})
		),
	)

export const playsTotal =
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

const getUserSongPlays =
	<T>(userId: string, songId: string, parse: SqlParse<T>) =>
		sql.query({
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
				value: sql.join(COLUMN_NAMES.PLAY),
			}],
		})

export const userPlays =
	resolver<Play[], UserArgs>(
		({ parent, args }) => (
			getUserSongPlays(
				args.userId,
				parent.songId,
				sql.parseTable(),
			)
		),
	)

export const userPlaysTotal =
	resolver<number | null, UserArgs>(
		({ parent, args }) => (
			getUserSongPlays(
				args.userId,
				parent.songId,
				sql.rowCountOrNull,
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