import { v4 as uuid } from "uuid"

import {
	sqlJoin,
	sqlQuery,
	parseSqlRow,
	createResolver,
} from "../../helpers"

import {
	INSERT_PLAYLIST,
	INSERT_USER_DOC,
} from "../../sql"

import { Playlist } from "../../types"
import { COLUMN_NAMES } from "../../globals"

interface Args {
	userId: string,
	playlist: {
		title: string,
	},
}

const resolver =
	createResolver()

export const addPlaylist =
	resolver<Playlist, Args>(
		async ({ args, context }) => {
			const playlist = await sqlQuery(context.pg)({
				sql: INSERT_PLAYLIST,
				parse: parseSqlRow<Playlist>(),
				variables: [{
					value: uuid(),
					key: "playlistId",
				},{
					key: "userId",
					value: args.userId,
				},{
					key: "title",
					value: args.playlist.title,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.PLAYLIST),
				}],
			})
			await sqlQuery(context.pg)({
				sql: INSERT_USER_DOC,
				variables: [{
					key: "userId",
					value: args.userId,
				},{
					string: false,
					key: "columnName",
					value: "playlist_id",
				},{
					string: false,
					key: "tableName",
					value: "users_playlists",
				},{
					key: "docId",
					value: playlist.playlistId,
				}],
			})
			return playlist
		},
	)