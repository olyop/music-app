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

import { COLUMN_NAMES } from "../globals"
import { getUserDocInLib, getUserDocDateAdded } from "./getUserDoc"
import { s3, sql, createResolver, songOrderByField } from "../helpers"

const getArtistSongs =
	<T>({ id, parse, orderBy }: DocsOrderBy<T>) =>
		sql.query({
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
				value: sql.join(COLUMN_NAMES.SONG, "songs"),
			},{
				string: false,
				key: "orderByField",
				value: songOrderByField(orderBy?.field.toLowerCase() || "title"),
			}],
		})

const getArtistAlbums = <T>({ id, parse, orderBy }: DocsOrderBy<T>) =>
	sql.query({
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
			value: sql.join(COLUMN_NAMES.ALBUM, "albums"),
		}],
	})

const getUserArtistPlays =
	<T>(userId: string, artistId: string, parse: SqlParse<T>) =>
		sql.query({
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
				value: sql.join(COLUMN_NAMES.PLAY),
			}],
		})

const resolver =
	createResolver<Artist>()

export const playsTotal =
	resolver<number | null>(
		({ parent }) => (
			sql.query({
				sql: SELECT_ARTIST_PLAYS,
				parse: sql.rowCountOrNull,
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
				parse: sql.parseTable(),
			})
		),
	)

export const songsTotal =
	resolver<number>(
		({ parent }) => (
			getArtistSongs({
				id: parent.artistId,
				parse: sql.rowCount,
			})
		),
	)

export const albums =
	resolver<Album[], OrderByArgs>(
		({ parent, args }) => (
			getArtistAlbums({
				id: parent.artistId,
				orderBy: args.orderBy,
				parse: sql.parseTable(),
			})
		),
	)

export const albumsTotal =
	resolver<number>(
		({ parent }) => (
			getArtistAlbums({
				id: parent.artistId,
				parse: sql.rowCount,
			})
		),
	)

export const userPlays =
	resolver<Play[], UserArgs>(
		({ parent, args }) => (
			getUserArtistPlays(
				args.userId,
				parent.artistId,
				sql.parseTable(),
			)
		),
	)

export const userPlaysTotal =
	resolver<number | null, UserArgs>(
		({ parent, args }) => (
			getUserArtistPlays(
				args.userId,
				parent.artistId,
				sql.rowCountOrNull,
			)
		),
	)

export const photo =
	resolver<string, S3FileArgs>(
		({ parent, args }) => (
			s3.getObject({
				parse: bufferToDataUrl,
				key: s3.catalogObjectKey(
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