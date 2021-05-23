import {
	query,
	parseRow,
	parseTable,
	join as sqlJoin,
	getRowCountOrNull,
} from "@oly_op/pg-helpers"

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
	createResolver,
	getUserQueueSongs,
	getSongsOrderByField,
	checkUserAuthorization,
} from "../helpers"

import {
	SELECT_SONG,
	SELECT_SONGS_IN,
	SELECT_USER_PLAYS,
	SELECT_USER_SONGS,
	SELECT_USER_ALBUMS,
	SELECT_USER_GENRES,
	SELECT_USER_ARTISTS,
	SELECT_USER_PLAYLISTS,
	SELECT_USER_SONGS_TOTAL,
	SELECT_USER_ARTISTS_TOTAL,
	SELECT_USER_PLAYLISTS_FILTERED,
} from "../sql"

import { COLUMN_NAMES } from "../globals"

const resolver =
	createResolver<User>()

export const name =
	resolver<string>(
		({ parent }) => Promise.resolve(parent.name),
	)

export const dateJoined =
	resolver<number>(
		({ parent }) => Promise.resolve(parent.dateJoined * 1000),
	)

export const current =
	resolver<Song | null>(
		checkUserAuthorization(
			({ parent, context }) => (
				isNull(parent.current) ? (
					Promise.resolve(null)
				) : (
					query(context.pg)<Song>({
						sql: SELECT_SONG,
						parse: parseRow(),
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
		),
	)

export const albums =
	resolver<Album[], DocsArgs>(
		checkUserAuthorization(
			({ parent, args, context }) => (
				query(context.pg)({
					sql: SELECT_USER_ALBUMS,
					parse: parseTable(),
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
						key: "columnNames",
						value: sqlJoin(COLUMN_NAMES.ALBUM),
					},{
						string: false,
						key: "orderByField",
						value: args.orderBy?.field || "title",
					},{
						string: false,
						key: "orderByDirection",
						value: args.orderBy?.direction || "ASC",
					}],
				})
			),
		),
	)

export const genres =
	resolver<Genre[], DocsArgs>(
		checkUserAuthorization(
			({ parent, args, context }) => (
				query(context.pg)({
					sql: SELECT_USER_GENRES,
					parse: parseTable(),
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
						key: "columnNames",
						value: sqlJoin(COLUMN_NAMES.GENRE),
					},{
						string: false,
						key: "orderByField",
						value: args.orderBy?.field || "name",
					},{
						string: false,
						key: "orderByDirection",
						value: args.orderBy?.direction || "ASC",
					}],
				})
			),
		),
	)

export const prev =
	resolver<Song[]>(
		checkUserAuthorization(
			({ parent, context }) => {
				if (parent.prev && !isEmpty(parent.prev)) {
					return query(context.pg)({
						sql: SELECT_SONGS_IN,
						parse: parseTable<Song>(),
						variables: [{
							string: false,
							key: "columnNames",
							value: sqlJoin(COLUMN_NAMES.SONG),
						},{
							string: false,
							key: "songIds",
							value: `'${join(parent.prev, "', '")}'`,
						},{
							string: false,
							key: "orderBy",
							value: `song_id='${join(parent.prev, "' DESC, song_id='")}' DESC`,
						}],
					})
				} else {
					return getUserQueueSongs(context.pg)(
						parent.userId,
						"users_prevs",
					)
				}
			},
		),
	)

export const next =
	resolver<Song[]>(
		checkUserAuthorization(
			({ parent, context }) => {
				if (parent.next && !isEmpty(parent.next)) {
					return query(context.pg)({
						sql: SELECT_SONGS_IN,
						parse: parseTable<Song>(),
						variables: [{
							string: false,
							key: "songIds",
							value: `'${join(parent.next, "', '")}'`,
						},{
							string: false,
							key: "columnNames",
							value: sqlJoin(COLUMN_NAMES.SONG),
						},{
							string: false,
							key: "orderBy",
							value: `song_id='${join(parent.next, "' DESC, song_id='")}' DESC`,
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
		),
	)

export const later =
	resolver<Song[]>(
		checkUserAuthorization(
			({ parent, context }) => {
				if (parent.later && !isEmpty(parent.later)) {
					return query(context.pg)({
						sql: SELECT_SONGS_IN,
						parse: parseTable<Song>(),
						variables: [{
							string: false,
							key: "columnNames",
							value: sqlJoin(COLUMN_NAMES.SONG),
						},{
							string: false,
							key: "songIds",
							value: `'${join(parent.later, "', '")}'`,
						},{
							string: false,
							key: "orderBy",
							value: `song_id='${join(parent.later, "' DESC, song_id='")}' DESC`,
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
		),
	)

export const plays =
	resolver<Play[]>(
		checkUserAuthorization(
			({ parent, context }) => (
				query(context.pg)({
					sql: SELECT_USER_PLAYS,
					parse: parseTable(),
					variables: [{
						key: "userId",
						value: parent.userId,
					}],
				})
			),
		),
	)

export const songs =
	resolver<Song[], DocsArgs>(
		checkUserAuthorization(
			({ parent, args, context }) => (
				query(context.pg)({
					sql: SELECT_USER_SONGS,
					parse: parseTable(),
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
						value: args.orderBy?.direction || "ASC",
					},{
						string: false,
						key: "columnNames",
						value: sqlJoin(COLUMN_NAMES.SONG, "songs"),
					},{
						string: false,
						key: "orderByField",
						value: getSongsOrderByField(toLower(args.orderBy?.field || "title")),
					}],
				})
			),
		),
	)

export const songsTotal =
	resolver<number | null>(
		checkUserAuthorization(
			({ parent, context }) => (
				query(context.pg)({
					sql: SELECT_USER_SONGS_TOTAL,
					parse: getRowCountOrNull,
					variables: [{
						key: "userId",
						value: parent.userId,
					}],
				})
			),
		),
	)

export const artists =
	resolver<Artist[], DocsArgs>(
		checkUserAuthorization(
			({ parent, args, context }) => (
				query(context.pg)({
					parse: parseTable(),
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
						value: args.orderBy?.field || "title",
					},{
						string: false,
						key: "orderByDirection",
						value: args.orderBy?.direction || "ASC",
					},{
						string: false,
						key: "columnNames",
						value: sqlJoin(COLUMN_NAMES.ARTIST, "artists"),
					},{
						string: false,
						key: "orderByTableName",
						value: args.orderBy?.field === "DATE_ADDED" ? "users_artists" : "artists",
					}],
				})
			),
		),
	)

export const artistsTotal =
	resolver<number | null>(
		checkUserAuthorization(
			({ parent, context }) => (
				query(context.pg)({
					sql: SELECT_USER_ARTISTS_TOTAL,
					parse: getRowCountOrNull,
					variables: [{
						key: "userId",
						value: parent.userId,
					}],
				})
			),
		),
	)

interface PlaylistsArgs extends DocsArgs {
	filterBySong: string,
}

export const playlists =
	resolver<Playlist[], PlaylistsArgs>(
		checkUserAuthorization(
			({ parent, args, context }) => (
				query(context.pg)(args.filterBySong ? {
					sql: SELECT_USER_PLAYLISTS_FILTERED,
					parse: parseTable(),
					variables: [{
						key: "userId",
						value: parent.userId,
					},{
						key: "songId",
						value: args.filterBySong,
					},{
						string: false,
						key: "columnNames",
						value: sqlJoin(COLUMN_NAMES.PLAYLIST, "playlists"),
					}],
				} : {
					sql: SELECT_USER_PLAYLISTS,
					parse: parseTable(),
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
						value: args.orderBy?.field || "title",
					},{
						string: false,
						key: "orderByDirection",
						value: args.orderBy?.direction || "ASC",
					},{
						string: false,
						key: "orderByTableName",
						value: args.orderBy?.field === "DATE_ADDED" ?
							"users_playlists" : "playlists",
					},{
						string: false,
						key: "columnNames",
						value: sqlJoin(COLUMN_NAMES.PLAYLIST, "playlists"),
					}],
				})
			),
		),
	)