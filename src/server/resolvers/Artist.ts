import {
	join,
	query,
	Client,
	parseTable,
	getRowCount,
	getRowCountOrNull,
} from "@oly_op/pg-helpers"

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
	getS3Object,
	createResolver,
	getUserDocInLib,
	getS3CatalogKey,
	getUserDocDateAdded,
	getSongsOrderByField,
} from "../helpers"

import {
	SELECT_ARTIST_PLAYS,
	SELECT_ARTIST_SONGS,
	SELECT_ARTIST_ALBUMS,
	SELECT_USER_DOC_PLAYS,
	SELECT_ARTIST_TOP_TEN_SONGS,
} from "../sql"

import { COLUMN_NAMES } from "../globals"

const getArtistSongs =
	(client: Client) =>
		<T>({ id, parse, orderBy }: DocsOrderBy<T>) =>
			query(client)({
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
					value: join(COLUMN_NAMES.SONG, "songs"),
				},{
					string: false,
					key: "orderByField",
					value: getSongsOrderByField(orderBy?.field.toLowerCase() || "title"),
				}],
			})

const getArtistAlbums =
	(client: Client) =>
		<T>({ id, parse, orderBy }: DocsOrderBy<T>) =>
			query(client)({
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
					value: join(COLUMN_NAMES.ALBUM, "albums"),
				}],
			})

const getUserArtistPlays =
	(client: Client) =>
		<T>(userId: string, artistId: string, parse: SqlParse<T>) =>
			query(client)({
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
					value: join(COLUMN_NAMES.PLAY),
				}],
			})

const resolver =
	createResolver<Artist>()

export const playsTotal =
	resolver<number | null>(
		({ parent, context }) => (
			query(context.pg)({
				sql: SELECT_ARTIST_PLAYS,
				parse: getRowCountOrNull,
				variables: [{
					key: "artistId",
					value: parent.artistId,
				}],
			})
		),
	)

export const songs =
	resolver<Song[], OrderByArgs>(
		({ parent, args, context }) => (
			getArtistSongs(context.pg)({
				id: parent.artistId,
				orderBy: args.orderBy,
				parse: parseTable(),
			})
		),
	)

export const songsTotal =
	resolver<number>(
		({ parent, context }) => (
			getArtistSongs(context.pg)({
				id: parent.artistId,
				parse: getRowCount,
			})
		),
	)

export const albums =
	resolver<Album[], OrderByArgs>(
		({ parent, args, context }) => (
			getArtistAlbums(context.pg)({
				id: parent.artistId,
				orderBy: args.orderBy,
				parse: parseTable(),
			})
		),
	)

export const albumsTotal =
	resolver<number>(
		({ parent, context }) => (
			getArtistAlbums(context.pg)({
				id: parent.artistId,
				parse: getRowCount,
			})
		),
	)

export const userPlays =
	resolver<Play[], UserArgs>(
		({ parent, args, context }) => (
			getUserArtistPlays(context.pg)(
				args.userId,
				parent.artistId,
				parseTable(),
			)
		),
	)

export const userPlaysTotal =
	resolver<number | null, UserArgs>(
		({ parent, args, context }) => (
			getUserArtistPlays(context.pg)(
				args.userId,
				parent.artistId,
				getRowCountOrNull,
			)
		),
	)

export const photo =
	resolver<string, S3FileArgs>(
		({ parent, args, context }) => (
			getS3Object(context.s3)({
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
		({ parent, args, context }) => (
			getUserDocDateAdded(context.pg)({
				userId: args.userId,
				docId: parent.artistId,
				columnName: "artist_id",
				userDocTable: "users_artists",
			})
		),
	)

export const inLibrary =
	resolver<boolean, UserArgs>(
		({ parent, args, context }) => (
			getUserDocInLib(context.pg)({
				userId: args.userId,
				docId: parent.artistId,
				columnName: "artist_id",
				userDocTable: "users_artists",
			})
		),
	)

export const topTenSongs =
	resolver<Song[]>(
		({ parent, context }) => (
			query(context.pg)({
				sql: SELECT_ARTIST_TOP_TEN_SONGS,
				parse: parseTable(),
				variables: [{
					key: "artistId",
					value: parent.artistId,
				},{
					string: false,
					key: "columnNames",
					value: join(COLUMN_NAMES.SONG, "songs"),
				}],
			})
		),
	)