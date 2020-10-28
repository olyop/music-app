// import random from "lodash/random"
import bufferToDataUrl from "@oly_op/music-app-common/bufferToDataUrl"

import {
	Song,
	Play,
	Album,
	Artist,
	UserArgs,
	SqlParse,
	S3FileExt,
	S3FileArgs,
	DocsOrderBy,
	OrderByArgs,
} from "../types"

import {
	SELECT_ARTIST_PLAYS,
	SELECT_ARTIST_SONGS,
	SELECT_ARTIST_ALBUMS,
	SELECT_USER_DOC_PLAYS,
} from "../sql"

import {
	sqlJoin,
	sqlPoolQuery,
	parseSqlTable,
	getSqlRowCount,
	createResolver,
	getUserDocInLib,
	getUserDocDateAdded,
	getSongsOrderByField,
	getSqlRowCountOrNull,
} from "../helpers"

import { COLUMN_NAMES } from "../globals"

const getArtistSongs =
	<T>({ id, parse, orderBy }: DocsOrderBy<T>) =>
		sqlPoolQuery({
			sql: SELECT_ARTIST_SONGS,
			parse,
			variables: [{
				value: id,
				key: "artistId",
			},{
				string: false,
				key: "orderByDirection",
				value: orderBy?.direction || "ASC",
			},{
				string: false,
				key: "columnNames",
				value: sqlJoin(COLUMN_NAMES.SONG, "songs"),
			},{
				string: false,
				key: "orderByField",
				value: getSongsOrderByField(orderBy?.field.toLowerCase() || "title"),
			}],
		})

const getArtistAlbums = <T>({ id, parse, orderBy }: DocsOrderBy<T>) =>
	sqlPoolQuery({
		parse,
		sql: SELECT_ARTIST_ALBUMS,
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
			value: orderBy?.direction || "ASC",
		},{
			string: false,
			key: "columnNames",
			value: sqlJoin(COLUMN_NAMES.ALBUM, "albums"),
		}],
	})

const getUserArtistPlays =
	<T>(userId: string, artistId: string, parse: SqlParse<T>) =>
		sqlPoolQuery({
			sql: SELECT_USER_DOC_PLAYS,
			parse,
			variables: [{
				key: "userId",
				value: userId,
			},{
				key: "artistId",
				value: artistId,
			},{
				string: false,
				key: "columnNames",
				value: sqlJoin(COLUMN_NAMES.PLAY),
			}],
		})

const resolver =
	createResolver<Artist>()

export const playsTotal =
	resolver<number | null>(
		({ parent }) => (
			sqlPoolQuery({
				sql: SELECT_ARTIST_PLAYS,
				parse: getSqlRowCountOrNull,
				variables: [{
					key: "artistId",
					value: parent.artistId,
				}],
			})
		),
	)

export const songs =
	resolver<Song[], OrderByArgs>(
		({ parent, args }) => (
			getArtistSongs({
				id: parent.artistId,
				orderBy: args.orderBy,
				parse: parseSqlTable(),
			})
		),
	)

export const songsTotal =
	resolver<number>(
		({ parent }) => (
			getArtistSongs({
				id: parent.artistId,
				parse: getSqlRowCount,
			})
		),
	)

export const albums =
	resolver<Album[], OrderByArgs>(
		({ parent, args }) => (
			getArtistAlbums({
				id: parent.artistId,
				orderBy: args.orderBy,
				parse: parseSqlTable(),
			})
		),
	)

export const albumsTotal =
	resolver<number>(
		({ parent }) => (
			getArtistAlbums({
				id: parent.artistId,
				parse: getSqlRowCount,
			})
		),
	)

export const userPlays =
	resolver<Play[], UserArgs>(
		({ parent, args }) => (
			getUserArtistPlays(
				args.userId,
				parent.artistId,
				parseSqlTable(),
			)
		),
	)

export const userPlaysTotal =
	resolver<number | null, UserArgs>(
		({ parent, args }) => (
			getUserArtistPlays(
				args.userId,
				parent.artistId,
				getSqlRowCountOrNull,
			)
		),
	)

export const photo =
	resolver<string, S3FileArgs>(
		({ parent, args }) => (
			getS3Object({
				parse: bufferToDataUrl,
				key: getS3CatalogKey(
					parent.artistId,
					args.size,
					S3FileExt.JPG,
				),
			})
		),
	)

export const dateAdded =
	resolver<number | null, UserArgs>(
		({ parent, args }) => (
			getUserDocDateAdded({
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
			getUserDocInLib({
				userId: args.userId,
				docId: parent.artistId,
				columnName: "artist_id",
				userDocTable: "users_artists",
			})
		),
	)