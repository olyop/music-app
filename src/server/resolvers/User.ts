import { join, isNull, isEmpty, toLower } from "lodash"
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
	sqlJoin,
	sqlQuery,
	parseSqlRow,
	parseSqlTable,
	createResolver,
	getUserQueueSongs,
	getSqlRowCountOrNull,
	getSongsOrderByField,
} from "../helpers"

import {
	SELECT_SONG,
	SELECT_SONGS_IN,
	SELECT_USER_PLAYS,
	SELECT_USER_SONGS,
	SELECT_USER_ALBUMS,
	SELECT_USER_GENRES,
	SELECT_USER_ARTISTS,
	SELECT_USER_SONGS_TOTAL,
	SELECT_USER_ARTISTS_TOTAL,
} from "../sql"

import { COLUMN_NAMES } from "../globals"

const resolver =
	createResolver<User>()

export const dateJoined =
	resolver<number>(({ parent }) => Promise.resolve(parent.dateJoined * 1000))

export const current =
	resolver<Song | null>(
		({ parent, context }) => (
			isNull(parent.current) ? (
				Promise.resolve(null)
			) : (
				sqlQuery(context.pg)<Song>({
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
		({ parent, args, context }) => (
			sqlQuery(context.pg)({
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
		({ parent, args, context }) => (
			sqlQuery(context.pg)({
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
		({ parent, context }) => {
			if (parent.prev && !isEmpty(parent.prev)) {
				return sqlQuery(context.pg)({
					sql: SELECT_SONGS_IN,
					parse: parseSqlTable<Song>(),
					variables: [{
						key: "songIds",
						value: join(parent.prev, "', '"),
					},{
						string: false,
						key: "columnNames",
						value: sqlJoin(COLUMN_NAMES.SONG),
					}],
				})
			} else {
				return getUserQueueSongs(context.pg)(
					parent.userId,
					"users_prevs",
				)
			}
		},
	)

export const next =
	resolver<Song[]>(
		({ parent, context }) => {
			if (parent.next && !isEmpty(parent.next)) {
				return sqlQuery(context.pg)({
					log: { sql: true },
					sql: SELECT_SONGS_IN,
					parse: parseSqlTable<Song>(),
					variables: [{
						key: "songIds",
						value: join(parent.next, "', '"),
					},{
						string: false,
						key: "columnNames",
						value: sqlJoin(COLUMN_NAMES.SONG),
					}],
				})
			} else {
				return (
					getUserQueueSongs(context.pg)(
						parent.userId,
						"users_nexts",
					)
				)
			}
		},
	)

export const later =
	resolver<Song[]>(
		({ parent, context }) => {
			if (parent.later && !isEmpty(parent.later)) {
				return sqlQuery(context.pg)({
					sql: SELECT_SONGS_IN,
					parse: parseSqlTable<Song>(),
					variables: [{
						key: "songIds",
						value: join(parent.later, "', '"),
					},{
						string: false,
						key: "columnNames",
						value: sqlJoin(COLUMN_NAMES.SONG),
					}],
				})
			} else {
				return (
					getUserQueueSongs(context.pg)(
						parent.userId,
						"users_laters",
					)
				)
			}
		},
	)

export const plays =
	resolver<Play[]>(
		({ parent, context }) => (
			sqlQuery(context.pg)({
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
		({ parent, args, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_USER_SONGS,
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
					key: "orderByDirection",
					value: args.orderBy.direction,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.SONG, "songs"),
				},{
					string: false,
					key: "orderByField",
					value: getSongsOrderByField(toLower(args.orderBy.field)),
				}],
			})
		),
	)

export const songsTotal =
	resolver<number | null>(
		({ parent, args, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_USER_SONGS_TOTAL,
				parse: getSqlRowCountOrNull,
				variables: [{
					key: "userId",
					value: parent.userId,
				}],
			})
		),
	)

export const artists =
	resolver<Artist[], DocsArgs>(
		({ parent, args, context }) => (
			sqlQuery(context.pg)({
				parse: parseSqlTable(),
				sql: SELECT_USER_ARTISTS,
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
					value: sqlJoin(COLUMN_NAMES.ARTIST, "artists"),
				},{
					string: false,
					key: "orderByTableName",
					value: args.orderBy.field === "DATE_ADDED" ? "users_artists" : "artists",
				}],
			})
		),
	)

export const artistsTotal =
	resolver<number | null>(
		({ parent, args, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_USER_ARTISTS_TOTAL,
				parse: getSqlRowCountOrNull,
				variables: [{
					key: "userId",
					value: parent.userId,
				}],
			})
		),
	)

export const playlists =
	resolver<Playlist[], DocsArgs>(
		({ parent, args, context }) => (
			Promise.resolve([])
		),
	)