import { isNull } from "lodash"
import { PAGINATION_NUM } from "@oly_op/music-app-common/globals"

import {
	Song,
	Play,
	User,
	Genre,
	Album,
	Artist,
	Playlist,
	DocsArgs,
} from "../types"

import {
	SELECT_SONG,
	SELECT_USER_PLAYS,
	SELECT_USER_ALBUMS,
	SELECT_USER_GENRES,
} from "../sql"

import {
	sqlJoin,
	getUserDocs,
	parseSqlRow,
	sqlPoolQuery,
	getUserQueue,
	parseSqlTable,
	createResolver,
} from "../helpers"

import { COLUMN_NAMES } from "../globals"

const resolver =
	createResolver<User>()

export const dateJoined =
	resolver<number>(({ parent }) => parent.dateJoined * 1000)

export const current =
	resolver<Song | null>(
		({ parent }) => (
			isNull(parent.current) ? null : (
				sqlPoolQuery<Song>({
					sql: SELECT_SONG,
					parse: parseSqlRow(),
					variables: [{
						key: "songId",
						value: parent.current,
					},{
						string: false,
						key: "columnNames",
						value: sqlJoin(COLUMN_NAMES.SONG),
					}],
				})
			)
		),
	)

export const albums =
	resolver<Album[], DocsArgs>(
		({ parent, args }) => (
			sqlPoolQuery({
				sql: SELECT_USER_ALBUMS,
				parse: parseSqlTable(),
				variables: [{
					key: "page",
					string: false,
					value: args.page,
				},{
					key: "userId",
					value: parent.userId,
				},{
					string: false,
					key: "paginationNum",
					value: PAGINATION_NUM,
				},{
					string: false,
					key: "orderByField",
					value: args.orderBy.field,
				},{
					string: false,
					key: "orderByDirection",
					value: args.orderBy.direction,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.ALBUM),
				}],
			})
		),
	)

export const genres =
	resolver<Genre[], DocsArgs>(
		({ parent, args }) => (
			sqlPoolQuery({
				sql: SELECT_USER_GENRES,
				parse: parseSqlTable(),
				variables: [{
					key: "page",
					string: false,
					value: args.page,
				},{
					key: "userId",
					value: parent.userId,
				},{
					string: false,
					key: "paginationNum",
					value: PAGINATION_NUM,
				},{
					string: false,
					key: "orderByField",
					value: args.orderBy.field,
				},{
					string: false,
					key: "orderByDirection",
					value: args.orderBy.direction,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.GENRE),
				}],
			})
		),
	)

export const prev =
	resolver<Song[]>(
		({ parent }) => (
			getUserQueue({
				userId: parent.userId,
				tableName: "users_prevs",
			})
		),
	)

export const next =
	resolver<Song[]>(
		({ parent }) => (
			getUserQueue({
				userId: parent.userId,
				tableName: "users_nexts",
			})
		),
	)

export const later =
	resolver<Song[]>(
		({ parent }) => (
			getUserQueue({
				userId: parent.userId,
				tableName: "users_laters",
			})
		),
	)

export const plays =
	resolver<Play[]>(
		({ parent }) => (
			sqlPoolQuery({
				sql: SELECT_USER_PLAYS,
				parse: parseSqlTable(),
				variables: [{
					key: "userId",
					value: parent.userId,
				}],
			})
		),
	)

export const songs =
	resolver<Song[], DocsArgs>(
		({ parent, args }) => (
			getUserDocs({
				page: args.page,
				tableName: "songs",
				columnName: "song_id",
				orderBy: args.orderBy,
				userId: parent.userId,
				userTableName: "users_songs",
				columnNames: COLUMN_NAMES.SONG,
			})
		),
	)

export const artists =
	resolver<Artist[], DocsArgs>(
		({ parent, args }) => (
			getUserDocs({
				page: args.page,
				tableName: "artists",
				userId: parent.userId,
				orderBy: args.orderBy,
				columnName: "artist_id",
				userTableName: "users_artists",
				columnNames: COLUMN_NAMES.ARTIST,
			})
		),
	)

export const playlists =
	resolver<Playlist[], DocsArgs>(
		({ parent, args }) => (
			getUserDocs({
				page: args.page,
				userId: parent.userId,
				orderBy: args.orderBy,
				tableName: "playlists",
				columnName: "playlist_id",
				columnNames: COLUMN_NAMES.SONG,
				userTableName: "users_playlists",
			})
		),
	)