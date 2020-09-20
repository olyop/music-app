import pipe from "@oly_op/pipe"
import { identity } from "lodash"
import { map, reduce } from "lodash/fp"
import bufferToDataUrl from "@oly_op/music-app-common/bufferToDataUrl"

import {
	Song,
	Play,
	Album,
	Genre,
	Artist,
	UserArgs,
	ImgFormat,
	ImgSizeEnum,
} from "../types"

import {
	SELECT_ALBUM_SONGS,
	SELECT_ALBUM_GENRES,
	SELECT_ALBUM_ARTISTS,
	SELECT_USER_ALBUM_PLAYS,
} from "../sql"

import { COLUMN_NAMES } from "../globals"
import { s3, sql, fixDateType, createResolver } from "../helpers"

const resolver =
	createResolver<Album>()

const albumSongs = <T = Song[]>(parse: (songs: Song[]) => T = identity) =>
	resolver<T>(
		({ parent }) => (
			sql.query({
				sql: SELECT_ALBUM_SONGS,
				parse: pipe(sql.parseTable(), parse),
				variables: [{
					key: "albumId",
					value: parent.albumId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.SONG),
				}],
			})
		),
	)

export const songs =
	albumSongs()

export const totalDuration =
	albumSongs<number>(pipe(
		map(({ duration }) => duration),
		reduce((total, duration) => total + duration, 0),
	))

export const released =
	resolver<Date>(({ parent }) => fixDateType(parent.released))

export const cover =
	resolver<string, { size: ImgSizeEnum }>(
		({ parent, args }) => (
			s3.getObject({
				parse: bufferToDataUrl,
				key: s3.catalogObjectKey({
					size: args.size,
					id: parent.albumId,
					format: ImgFormat.JPG,
				}),
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

export const plays =
	resolver<Play[], UserArgs>(
		({ parent, args }) => (
			sql.query({
				sql: SELECT_USER_ALBUM_PLAYS,
				parse: sql.parseTable(),
				variables: [{
					key: "userId",
					value: args.userId,
				},{
					key: "docId",
					value: parent.albumId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.PLAY),
				}],
			})
		),
	)