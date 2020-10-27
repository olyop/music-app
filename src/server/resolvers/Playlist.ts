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
	SELECT_USER,
	SELECT_PLAYLIST_SONGS,
	SELECT_USER_DOC_PLAYS,
} from "../sql"

import { COLUMN_NAMES } from "../globals"
import { sql, createResolver } from "../helpers"
import { getUserDocInLib, getUserDocDateAdded } from "./userDocs"

const getPlaylistSongs =
	<T>(playlistId: string, parse: SqlParse<T>) =>
		sql.query({
			sql: SELECT_PLAYLIST_SONGS,
			parse,
			variables: [{
				key: "playlistId",
				value: playlistId,
			},{
				string: false,
				key: "columnNames",
				value: sql.join(COLUMN_NAMES.SONG),
			}],
		})

const getUserPlaylistPlays =
	<T>(userId: string, playlistId: string, parse: SqlParse<T>) =>
		sql.query({
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
				value: sql.join(COLUMN_NAMES.PLAY),
			}],
		})

const resolver =
	createResolver<Playlist>()

export const dateCreated =
	resolver<number>(({ parent }) => parent.dateCreated * 1000)

export const user =
	resolver<User>(
		({ parent }) => (
			sql.query({
				sql: SELECT_USER,
				parse: sql.parseRow(),
				variables: [{
					key: "userId",
					value: parent.userId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.USER),
				}],
			})
		),
	)

export const songs =
	resolver<Song[]>(
		({ parent }) => (
			getPlaylistSongs(
				parent.playlistId,
				sql.parseTable(),
			)
		),
	)

export const songsTotal =
	resolver<number | null>(
		({ parent }) => (
			getPlaylistSongs(
				parent.playlistId,
				sql.rowCountOrNull,
			)
		),
	)

export const duration =
	resolver<number | null>(
		({ parent }) => (
			getPlaylistSongs(
				parent.playlistId,
				pipe(
					sql.parseTable<Song>(),
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
				sql.parseTable(),
			)
		),
	)

export const userPlaysTotal =
	resolver<number | null, UserArgs>(
		({ parent, args }) => (
			getUserPlaylistPlays(
				args.userId,
				parent.userId,
				sql.rowCountOrNull,
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