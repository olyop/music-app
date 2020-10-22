import { isNull } from "lodash"
import { PAGINATION_NUM } from "@oly_op/music-app-common/globals"

import {
	Song,
	Play,
	User,
	Genre,
	Album,
	Artist,
	OrderBy,
	Playlist,
	DocsArgs,
} from "../types"

import {
	SELECT_SONG,
	SELECT_USER_DOCS,
	SELECT_USER_PLAYS,
	SELECT_USER_ALBUMS,
	SELECT_USER_QUEUE_SONGS,
	SELECT_USER_GENRES,
} from "../sql"

import { COLUMN_NAMES } from "../globals"
import { sql, createResolver } from "../helpers"

interface UserDocsInput {
	id: string,
	page: number,
	orderBy: OrderBy,
	tableName: string,
	columnName: string,
	columnNames: string[],
	userTableName: string,
}

const getUserDocs = <T>({
	id,
	page,
	orderBy,
	tableName,
	columnName,
	columnNames,
	userTableName,
}: UserDocsInput) =>
	sql.query<T[]>({
		sql: SELECT_USER_DOCS,
		parse: sql.parseTable(),
		variables: [{
			value: id,
			key: "userId",
		},{
			key: "page",
			value: page,
			string: false,
		},{
			string: false,
			key: "tableName",
			value: tableName,
		},{
			string: false,
			key: "columnName",
			value: columnName,
		},{
			string: false,
			key: "userTableName",
			value: userTableName,
		},{
			string: false,
			key: "orderByField",
			value: orderBy.field,
		},{
			string: false,
			key: "paginationNum",
			value: PAGINATION_NUM,
		},{
			string: false,
			key: "orderByDirection",
			value: orderBy.direction,
		},{
			string: false,
			key: "columnNames",
			value: sql.join(columnNames, tableName),
		},{
			string: false,
			key: "orderByTableName",
			value: orderBy.field === "DATE_ADDED" ? userTableName : tableName,
		}],
	})

interface UserQueueInput {
	userId: string,
	tableName: string,
}

const getUserQueue = <T>({
	userId,
	tableName,
}: UserQueueInput) =>
	sql.query({
		sql: SELECT_USER_QUEUE_SONGS,
		parse: sql.parseTable<T>(),
		variables: [{
			key: "userId",
			value: userId,
		},{
			string: false,
			key: "tableName",
			value: tableName,
		},{
			string: false,
			key: "columnNames",
			value: sql.join(COLUMN_NAMES.SONG, "songs"),
		}],
	})

const resolver =
	createResolver<User>()

export const dateJoined =
	resolver<number>(({ parent }) => parent.dateJoined * 1000)

export const current =
	resolver<Song | null>(
		({ parent }) => (
			isNull(parent.current) ? null : (
				sql.query<Song>({
					sql: SELECT_SONG,
					parse: sql.parseRow(),
					variables: [{
						key: "songId",
						value: parent.current,
					},{
						string: false,
						key: "columnNames",
						value: sql.join(COLUMN_NAMES.SONG),
					}],
				})
			)
		),
	)

export const albums =
	resolver<Album[], DocsArgs>(
		({ parent, args }) => (
			sql.query({
				sql: SELECT_USER_ALBUMS,
				parse: sql.parseTable(),
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
					value: sql.join(COLUMN_NAMES.ALBUM),
				}],
			})
		),
	)

export const genres =
	resolver<Genre[], DocsArgs>(
		({ parent, args }) => (
			sql.query({
				sql: SELECT_USER_GENRES,
				parse: sql.parseTable(),
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
					value: sql.join(COLUMN_NAMES.GENRE),
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
				tableName: "users_nexts",
			})
		),
	)

export const plays =
	resolver<Play[]>(
		({ parent }) => (
			sql.query({
				sql: SELECT_USER_PLAYS,
				parse: sql.parseTable(),
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
				id: parent.userId,
				tableName: "songs",
				orderBy: args.orderBy,
				columnName: "song_id",
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
				id: parent.userId,
				tableName: "artists",
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
				id: parent.userId,
				orderBy: args.orderBy,
				tableName: "playlists",
				columnName: "playlist_id",
				columnNames: COLUMN_NAMES.SONG,
				userTableName: "users_playlists",
			})
		),
	)