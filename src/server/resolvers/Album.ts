import { sum } from "lodash"
import pipe from "@oly_op/pipe"
import { map } from "lodash/fp"
import bufferToDataUrl from "@oly_op/music-app-common/bufferToDataUrl"

import {
	Song,
	Play,
	Album,
	Genre,
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

import { COLUMN_NAMES } from "../globals"
import { s3, sql, fixDateType, createResolver } from "../helpers"

const getAlbumSongs =
	<T>(albumId: string, parse: SqlParse<T>) =>
		sql.query({
			sql: SELECT_ALBUM_SONGS,
			parse,
			variables: [{
				key: "albumId",
				value: albumId,
			},{
				string: false,
				key: "columnNames",
				value: sql.join(COLUMN_NAMES.SONG),
			}],
		})

const getUserAlbumPlays =
	<T>(userId: string, albumId: string, parse: SqlParse<T>) =>
		sql.query({
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
				value: sql.join(COLUMN_NAMES.PLAY),
			}],
		})

const resolver =
	createResolver<Album>()

export const songs =
	resolver<Song[]>(
		({ parent }) => (
			getAlbumSongs(
				parent.albumId,
				sql.parseTable(),
			)
		),
	)

export const songsTotal =
	resolver<number>(
		({ parent }) => (
			getAlbumSongs(
				parent.albumId,
				sql.rowCount,
			)
		),
	)

export const duration =
	resolver<number>(
		({ parent }) => (
			getAlbumSongs<number>(
				parent.albumId,
				pipe(
					sql.parseTable<Song>(),
					map(song => song.duration),
					sum,
				),
			)
		),
	)

export const released =
	resolver<Date>(({ parent }) => fixDateType(parent.released))

export const cover =
	resolver<string, S3FileArgs>(
		({ parent, args }) => (
			s3.getObject({
				parse: bufferToDataUrl,
				key: s3.catalogObjectKey(
					parent.albumId,
					args.size,
					S3FileExt.JPG,
				),
			})
		),
	)

export const artists =
	resolver<Artist[]>(
		({ parent }) => (
			sql.query({
				sql: SELECT_ALBUM_ARTISTS,
				parse: sql.parseTable(),
				variables: [{
					key: "albumId",
					value: parent.albumId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.ARTIST, "artists"),
				}],
			})
		),
	)

export const genres =
	resolver<Genre[]>(
		({ parent }) => (
			sql.query({
				sql: SELECT_ALBUM_GENRES,
				parse: sql.parseTable(),
				variables: [{
					key: "albumId",
					value: parent.albumId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.GENRE, "genres"),
				}],
			})
		),
	)

export const playsTotal =
	resolver<number | null>(
		({ parent }) => (
			sql.query({
				sql: SELECT_ALBUM_PLAYS,
				parse: sql.rowCountOrNull,
				variables: [{
					key: "albumId",
					value: parent.albumId,
				}],
			})
		),
	)

export const userPlays =
	resolver<Play[], UserArgs>(
		({ parent, args }) => (
			getUserAlbumPlays(
				args.userId,
				parent.albumId,
				sql.parseTable(),
			)
		),
	)

export const userPlaysTotal =
	resolver<number, UserArgs>(
		({ parent, args }) => (
			getUserAlbumPlays(
				args.userId,
				parent.albumId,
				sql.rowCount,
			)
		),
	)