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
	sqlJoin,
	parseSqlRow,
	sqlPoolQuery,
	parseSqlTable,
	createResolver,
	getSqlRowCountOrNull,
} from "../helpers"

import {
	SELECT_USER,
	SELECT_PLAYLIST_SONGS,
	SELECT_USER_DOC_PLAYS,
} from "../sql"

import { COLUMN_NAMES } from "../globals"
import { getUserDocInLib, getUserDocDateAdded } from "../helpers/resolver/userDocs"

const getPlaylistSongs =
	<T>(playlistId: string, parse: SqlParse<T>) =>
		sqlPoolQuery({
			sql: SELECT_PLAYLIST_SONGS,
			parse,
			variables: [{
				key: "playlistId",
				value: playlistId,
			},{
				string: false,
				key: "columnNames",
				value: sqlJoin(COLUMN_NAMES.SONG),
			}],
		})

const getUserPlaylistPlays =
	<T>(userId: string, playlistId: string, parse: SqlParse<T>) =>
		sqlPoolQuery({
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
				value: sqlJoin(COLUMN_NAMES.PLAY),
			}],
		})

const resolver =
	createResolver<Playlist>()

export const dateCreated =
	resolver<number>(({ parent }) => Promise.resolve(
		parent.dateCreated * 1000,
	))

export const user =
	resolver<User>(
		({ parent }) => (
			sqlPoolQuery({
				sql: SELECT_USER,
				parse: parseSqlRow(),
				variables: [{
					key: "userId",
					value: parent.userId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.USER),
				}],
			})
		),
	)

export const songs =
	resolver<Song[]>(
		({ parent }) => (
			getPlaylistSongs(
				parent.playlistId,
				parseSqlTable(),
			)
		),
	)

export const songsTotal =
	resolver<number | null>(
		({ parent }) => (
			getPlaylistSongs(
				parent.playlistId,
				getSqlRowCountOrNull,
			)
		),
	)

export const duration =
	resolver<number | null>(
		({ parent }) => (
			getPlaylistSongs(
				parent.playlistId,
				pipe(
					parseSqlTable<Song>(),
					map(song => song.duration),
					sum,
				),
			)
		),
	)

export const userPlays =
	resolver<Play[], UserArgs>(
		({ parent, args }) => (
			getUserPlaylistPlays(
				args.userId,
				parent.userId,
				parseSqlTable(),
			)
		),
	)

export const userPlaysTotal =
	resolver<number | null, UserArgs>(
		({ parent, args }) => (
			getUserPlaylistPlays(
				args.userId,
				parent.userId,
				getSqlRowCountOrNull,
			)
		),
	)

export const dateAdded =
	resolver<number | null, UserArgs>(
		({ parent, args }) => (
			getUserDocDateAdded({
				userId: args.userId,
				docId: parent.playlistId,
				columnName: "playlist_id",
				userDocTable: "users_playlists",
			})
		),
	)

export const inLibrary =
	resolver<boolean, UserArgs>(
		({ parent, args }) => (
			getUserDocInLib({
				userId: args.userId,
				docId: parent.playlistId,
				columnName: "playlist_id",
				userDocTable: "users_playlists",
			})
		),
	)