import { isNull } from "lodash"

import {
	Song,
	Play,
	User,
	Artist,
	OrderBy,
	Playlist,
	OrderByArgs,
} from "../types"

import {
	SELECT_SONG,
	SELECT_USER_DOCS,
	SELECT_USER_PLAYS,
	SELECT_USER_QUEUE,
} from "../sql"

import { COLUMN_NAMES } from "../globals"
import { sql, createResolver } from "../helpers"

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

export const prev =
	resolver<Song[]>(
		({ parent }) => (
			sql.query({
				sql: SELECT_USER_QUEUE,
				parse: sql.parseTable(),
				variables: [{
					key: "userId",
					value: parent.userId,
				},{
					string: false,
					key: "tableName",
					value: "users_prevs",
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.SONG, "songs"),
				}],
			})
		),
	)

export const next =
	resolver<Song[]>(
		({ parent }) => (
			sql.query({
				sql: SELECT_USER_QUEUE,
				parse: sql.parseTable(),
				variables: [{
					key: "userId",
					value: parent.userId,
				},{
					string: false,
					key: "tableName",
					value: "users_nexts",
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.SONG, "songs"),
				}],
			})
		),
	)

export const queue =
	resolver<Song[]>(
		({ parent }) => (
			sql.query({
				sql: SELECT_USER_QUEUE,
				parse: sql.parseTable(),
				variables: [{
					key: "userId",
					value: parent.userId,
				},{
					string: false,
					key: "tableName",
					value: "users_queues",
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.SONG, "songs"),
				}],
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

interface UserDocsInput {
	id: string,
	orderBy: OrderBy,
	tableName: string,
	columnName: string,
	columnNames: string[],
	userTableName: string,
}

const userDocs = <T>({
	id,
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

export const songs =
	resolver<Song[], OrderByArgs>(
		({ parent, args }) => (
			userDocs({
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
	resolver<Artist[], OrderByArgs>(
		({ parent, args }) => (
			userDocs({
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
	resolver<Playlist[], OrderByArgs>(
		({ parent, args }) => (
			userDocs({
				id: parent.userId,
				orderBy: args.orderBy,
				tableName: "playlists",
				columnName: "playlist_id",
				columnNames: COLUMN_NAMES.SONG,
				userTableName: "users_playlists",
			})
		),
	)