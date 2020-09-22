import random from "lodash/random"
import bufferToDataUrl from "@oly_op/music-app-common/bufferToDataUrl"

import {
	Song,
	Play,
	Album,
	Artist,
	UserArgs,
	ImgFormat,
	ImgSizeEnum,
	DocsOrderBy,
	OrderByArgs,
} from "../types"

import {
	SELECT_ARTIST_PLAYS,
	SELECT_ARTIST_SONGS,
	SELECT_ARTIST_ALBUMS,
	SELECT_USER_DOC_PLAYS,
} from "../sql"

import { COLUMN_NAMES } from "../globals"
import { s3, sql, createResolver } from "../helpers"
import { userDocInLib, userDocDateAdded } from "./common"

const resolver =
	createResolver<Artist>()

export const photo =
	resolver<string, { size: ImgSizeEnum }>(
		({ parent, args }) => (
			s3.getObject({
				parse: bufferToDataUrl,
				key: s3.catalogObjectKey({
					size: args.size,
					id: parent.artistId,
					format: ImgFormat.JPG,
				}),
			})
		),
	)

export const numOfPlays =
	resolver<number>(
		({ parent }) => (
			sql.query({
				parse: sql.rowCount,
				sql: SELECT_ARTIST_PLAYS,
				variables: [{
					key: "artistId",
					value: parent.artistId,
				}],
			})
		),
	)

export const allPlays =
	resolver<number>(() => random(1, 10000000))

const artistSongs = <T>({ id, parse, orderBy }: DocsOrderBy<T>) =>
	sql.query({
		sql: SELECT_ARTIST_SONGS,
		parse,
		variables: [{
			value: id,
			key: "artistId",
		},{
			string: false,
			key: "orderByField",
			value: orderBy?.field || "title",
		},{
			string: false,
			key: "orderByDirection",
			value: orderBy?.direction || "asc",
		},{
			string: false,
			key: "columnNames",
			value: sql.join(COLUMN_NAMES.SONG, "songs"),
		}],
	})

export const songs =
	resolver<Song[], OrderByArgs>(
		({ parent, args }) => (
			artistSongs({
				id: parent.artistId,
				orderBy: args.orderBy,
				parse: sql.parseTable(),
			})
		),
	)

export const numOfSongs =
	resolver<number>(
		({ parent }) => (
			artistSongs({
				id: parent.artistId,
				parse: sql.rowCount,
			})
		),
	)

const artistAlbums = <T>({ id, parse, orderBy }: DocsOrderBy<T>) =>
	sql.query({
		parse,
		sql: SELECT_ARTIST_ALBUMS,
		variables: [{
			value: id,
			key: "artistId",
		},{
			string: false,
			key: "orderByField",
			value: orderBy?.field || "released",
		},{
			string: false,
			key: "orderByDirection",
			value: orderBy?.direction || "desc",
		},{
			string: false,
			key: "columnNames",
			value: sql.join(COLUMN_NAMES.ALBUM, "albums"),
		}],
	})

export const albums =
	resolver<Album[], OrderByArgs>(
		({ parent, args }) => (
			artistAlbums({
				id: parent.artistId,
				orderBy: args.orderBy,
				parse: sql.parseTable(),
			})
		),
	)

export const numOfAlbums =
	resolver<number>(
		({ parent }) => (
			artistAlbums({
				id: parent.artistId,
				parse: sql.rowCount,
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
					key: "artistId",
					value: parent.artistId,
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
				docId: parent.artistId,
				columnName: "artist_id",
				userDocTable: "users_artists",
			})
		),
	)

export const inLibrary =
	resolver<boolean, UserArgs>(
		({ parent, args }) => (
			userDocInLib({
				userId: args.userId,
				docId: parent.artistId,
				columnName: "artist_id",
				userDocTable: "users_artists",
			})
		),
	)