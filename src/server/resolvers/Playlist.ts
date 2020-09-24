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
import { userDocInLib, userDocDateAdded } from "./getUserDoc"

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

export const plays =
	resolver<Play[], UserArgs>(
		({ parent, args }) => (
			sql.query({
				sql: SELECT_USER_DOC_PLAYS,
				parse: sql.parseTable(),
				variables: [{
					key: "userId",
					value: args.userId,
				},{
					key: "playlistId",
					value: parent.playlistId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.PLAY),
				}],
			})
		),
	)

export const dateAdded =
	resolver<number | null, UserArgs>(
		({ parent, args }) => (
			userDocDateAdded({
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
			userDocInLib({
				userId: args.userId,
				docId: parent.playlistId,
				columnName: "playlist_id",
				userDocTable: "users_playlists",
			})
		),
	)