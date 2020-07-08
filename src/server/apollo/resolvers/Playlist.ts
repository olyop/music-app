import {
	User,
	Song,
	Play,
	Playlist,
	UserArgs,
} from "../../types"

import {
	SELECT_USER,
	SELECT_PLAYLIST_SONGS,
	SELECT_USER_DOC_PLAYS,
} from "../../sql"

import { COLUMN_NAMES } from "../../globals"
import { sql, createResolver } from "../../helpers"
import { userDocInLib, userDocDateAdded } from "./common"

const resolver =
	createResolver<Playlist>()

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
			sql.query({
				sql: SELECT_PLAYLIST_SONGS,
				parse: sql.parseTable(),
				variables: [{
					key: "playlistId",
					value: parent.playlistId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.SONG),
				}],
			})
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
	resolver<number, UserArgs>(
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