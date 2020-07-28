import pipe from "@oly_op/pipe"
import { identity } from "lodash"
import { map, reduce } from "lodash/fp"
import { bufferToDataUrl } from "@oly_op/music-app-common"

import {
	Song,
	Play,
	Album,
	Artist,
	UserArgs,
	ImgFormat,
	ImgSizeEnum,
} from "../../types"

import {
	SELECT_ALBUM_SONGS,
	SELECT_ALBUM_ARTISTS,
	SELECT_USER_ALBUM_PLAYS,
} from "../../sql"

import { COLUMN_NAMES } from "../../globals"
import { s3, sql, createResolver } from "../../helpers"
import { userDocInLib, userDocDateAdded } from "./common"

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

export const dateAdded =
	resolver<number, UserArgs>(
		({ parent, args }) => (
			userDocDateAdded({
				userId: args.userId,
				docId: parent.albumId,
				columnName: "album_id",
				userDocTable: "users_albums",
			})
		),
	)

export const inLibrary =
	resolver<boolean, UserArgs>(
		({ parent, args }) => (
			userDocInLib({
				userId: args.userId,
				docId: parent.albumId,
				columnName: "album_id",
				userDocTable: "users_albums",
			})
		),
	)