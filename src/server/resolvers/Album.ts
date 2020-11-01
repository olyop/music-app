import { sum } from "lodash"
import pipe from "@oly_op/pipe"
import { map } from "lodash/fp"
import bufferToDataUrl from "@oly_op/music-app-common/bufferToDataUrl"

import {
	Song,
	Play,
	Album,
	Genre,
	Client,
	Artist,
	SqlParse,
	UserArgs,
	S3FileExt,
	S3FileArgs,
} from "../types"

import {
	SELECT_ALBUM_PLAYS,
	SELECT_ALBUM_SONGS,
	SELECT_ALBUM_GENRES,
	SELECT_ALBUM_ARTISTS,
	SELECT_USER_ALBUM_PLAYS,
} from "../sql"

import {
	sqlJoin,
	sqlQuery,
	getS3Object,
	fixDateType,
	parseSqlTable,
	getSqlRowCount,
	createResolver,
	getS3CatalogKey,
	getSqlRowCountOrNull,
} from "../helpers"

import { COLUMN_NAMES } from "../globals"

const getAlbumSongs =
	(client: Client) => <T>(albumId: string, parse: SqlParse<T>) =>
		sqlQuery(client)({
			sql: SELECT_ALBUM_SONGS,
			parse,
			variables: [{
				key: "albumId",
				value: albumId,
			},{
				string: false,
				key: "columnNames",
				value: sqlJoin(COLUMN_NAMES.SONG),
			}],
		})

const getUserAlbumPlays =
	(client: Client) => <T>(userId: string, albumId: string, parse: SqlParse<T>) =>
		sqlQuery(client)({
			sql: SELECT_USER_ALBUM_PLAYS,
			parse,
			variables: [{
				key: "userId",
				value: userId,
			},{
				key: "docId",
				value: albumId,
			},{
				string: false,
				key: "columnNames",
				value: sqlJoin(COLUMN_NAMES.PLAY),
			}],
		})

const resolver =
	createResolver<Album>()

export const songs =
	resolver<Song[]>(
		({ parent, context }) => (
			getAlbumSongs(context.pg)(
				parent.albumId,
				parseSqlTable(),
			)
		),
	)

export const songsTotal =
	resolver<number>(
		({ parent, context }) => (
			getAlbumSongs(context.pg)(
				parent.albumId,
				getSqlRowCount,
			)
		),
	)

export const duration =
	resolver<number>(
		({ parent, context }) => (
			getAlbumSongs(context.pg)<number>(
				parent.albumId,
				pipe(
					parseSqlTable<Song>(),
					map(song => song.duration),
					sum,
				),
			)
		),
	)

export const released =
	resolver<Date>(({ parent }) => Promise.resolve(
		fixDateType(parent.released),
	))

export const cover =
	resolver<string, S3FileArgs>(
		({ parent, args, context }) => (
			getS3Object(context.s3)({
				parse: bufferToDataUrl,
				key: getS3CatalogKey(
					parent.albumId,
					args.size,
					S3FileExt.JPG,
				),
			})
		),
	)

export const artists =
	resolver<Artist[]>(
		({ parent, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_ALBUM_ARTISTS,
				parse: parseSqlTable(),
				variables: [{
					key: "albumId",
					value: parent.albumId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.ARTIST, "artists"),
				}],
			})
		),
	)

export const genres =
	resolver<Genre[]>(
		({ parent, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_ALBUM_GENRES,
				parse: parseSqlTable(),
				variables: [{
					key: "albumId",
					value: parent.albumId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.GENRE, "genres"),
				}],
			})
		),
	)

export const playsTotal =
	resolver<number | null>(
		({ parent, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_ALBUM_PLAYS,
				parse: getSqlRowCountOrNull,
				variables: [{
					key: "albumId",
					value: parent.albumId,
				}],
			})
		),
	)

export const userPlays =
	resolver<Play[], UserArgs>(
		({ parent, args, context }) => (
			getUserAlbumPlays(context.pg)(
				args.userId,
				parent.albumId,
				parseSqlTable(),
			)
		),
	)

export const userPlaysTotal =
	resolver<number, UserArgs>(
		({ parent, args, context }) => (
			getUserAlbumPlays(context.pg)(
				args.userId,
				parent.albumId,
				getSqlRowCount,
			)
		),
	)