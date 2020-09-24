import random from "lodash/random"
import bufferToDataUrl from "@oly_op/music-app-common/bufferToDataUrl"

import {
	Song,
	Play,
	Album,
	Artist,
	UserArgs,
	SqlParse,
	ImgSizeEnum,
	DocsOrderBy,
	OrderByArgs,
} from "../types"

import {
	// SELECT_ARTIST_PLAYS,
	SELECT_ARTIST_SONGS,
	SELECT_ARTIST_ALBUMS,
	SELECT_USER_DOC_PLAYS,
} from "../sql"

import { COLUMN_NAMES } from "../globals"
import { s3, sql, createResolver } from "../helpers"
import { userDocInLib, userDocDateAdded } from "./getUserDoc"

const resolver =
	createResolver<Artist>()

// const getArtistPlays =
// 	<T>(artistId: string, parse: SqlParse<T>) =>
// 		sql.query({
// 			sql: SELECT_ARTIST_PLAYS,
// 			parse,
// 			variables: [{
// 				key: "artistId",
// 				value: artistId,
// 			}],
// 		})

// export const playsTotal =
// 	resolver<number>(
// 		({ parent }) => (
// 			getArtistPlays(
// 				parent.artistId,
// 				sql.rowCount,
// 			)
// 		),
// 	)

export const playsTotal =
	resolver<number>(() => random(1, 10000000))

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
	resolver<number, UserArgs>(
		({ parent, args }) => (
			getUserArtistPlays(
				args.userId,
				parent.artistId,
				sql.rowCount,
			)
		),
	)

export const photo =
	resolver<string, { size: ImgSizeEnum }>(
		({ parent, args }) => (
			s3.getObject({
				parse: bufferToDataUrl,
				key: s3.catalogObjectKey({
					format: "jpg",
					size: args.size,
					id: parent.artistId,
				}),
			})
		),
	)

export const dateAdded =
	resolver<number | null, UserArgs>(
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