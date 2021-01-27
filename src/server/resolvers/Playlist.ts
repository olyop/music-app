import {
	join,
	query,
	Client,
	parseRow,
	parseTable,
	getRowCountOrNull,
} from "@oly_op/pg-helpers"

import { sum } from "lodash"
import pipe from "@oly_op/pipe"
import { map } from "lodash/fp"

import {
	User,
	Song,
	Play,
	Playlist,
	UserArgs,
	SqlParse,
} from "../types"

import {
	createResolver,
	getUserDocInLib,
	getUserDocDateAdded,
} from "../helpers"

import {
	SELECT_USER,
	SELECT_PLAYLIST_SONGS,
	SELECT_USER_DOC_PLAYS,
} from "../sql"

import { COLUMN_NAMES } from "../globals"

const getPlaylistSongs =
	(client: Client) =>
		<T>(playlistId: string, parse: SqlParse<T>) =>
			query(client)({
				sql: SELECT_PLAYLIST_SONGS,
				parse,
				variables: [{
					key: "playlistId",
					value: playlistId,
				},{
					string: false,
					key: "columnNames",
					value: join(COLUMN_NAMES.SONG, "songs"),
				}],
			})

const getUserPlaylistPlays =
	(client: Client) =>
		<T>(userId: string, playlistId: string, parse: SqlParse<T>) =>
			query(client)({
				sql: SELECT_USER_DOC_PLAYS,
				parse,
				variables: [{
					key: "userId",
					value: userId,
				},{
					key: "playlistId",
					value: playlistId,
				},{
					string: false,
					key: "columnNames",
					value: join(COLUMN_NAMES.PLAY),
				}],
			})

const resolver =
	createResolver<Playlist>()

export const dateCreated =
	resolver<number>(
		({ parent }) => (
			Promise.resolve(parent.dateCreated * 1000)
		),
	)

export const user =
	resolver<User>(
		({ parent, context }) => (
			query(context.pg)({
				sql: SELECT_USER,
				parse: parseRow(),
				variables: [{
					key: "userId",
					value: parent.userId,
				},{
					string: false,
					key: "columnNames",
					value: join(COLUMN_NAMES.USER),
				}],
			})
		),
	)

export const songs =
	resolver<Song[]>(
		({ parent, context }) => (
			getPlaylistSongs(context.pg)(
				parent.playlistId,
				parseTable(),
			)
		),
	)

export const songsTotal =
	resolver<number | null>(
		({ parent, context }) => (
			getPlaylistSongs(context.pg)(
				parent.playlistId,
				getRowCountOrNull,
			)
		),
	)

export const duration =
	resolver<number | null>(
		({ parent, context }) => (
			getPlaylistSongs(context.pg)(
				parent.playlistId,
				pipe(
					parseTable<Song>(),
					map(song => song.duration),
					sum,
				),
			)
		),
	)

export const userPlays =
	resolver<Play[], UserArgs>(
		({ parent, args, context }) => (
			getUserPlaylistPlays(context.pg)(
				args.userId,
				parent.userId,
				parseTable(),
			)
		),
	)

export const userPlaysTotal =
	resolver<number | null, UserArgs>(
		({ parent, args, context }) => (
			getUserPlaylistPlays(context.pg)(
				args.userId,
				parent.userId,
				getRowCountOrNull,
			)
		),
	)

export const dateAdded =
	resolver<number | null, UserArgs>(
		({ parent, args, context }) => (
			getUserDocDateAdded(context.pg)({
				userId: args.userId,
				docId: parent.playlistId,
				columnName: "playlist_id",
				userDocTable: "users_playlists",
			})
		),
	)

export const inLibrary =
	resolver<boolean, UserArgs>(
		({ parent, args, context }) => (
			getUserDocInLib(context.pg)({
				userId: args.userId,
				docId: parent.playlistId,
				columnName: "playlist_id",
				userDocTable: "users_playlists",
			})
		),
	)