import { v4 as uuid } from "uuid"
import { join, query, parseRow } from "@oly_op/pg-helpers"

import { Playlist } from "../../types"
import { COLUMN_NAMES } from "../../globals"
import { createResolver } from "../../helpers"
import { INSERT_PLAYLIST, INSERT_USER_DOC } from "../../sql"

const resolver =
	createResolver()

export const addPlaylist =
	resolver<Playlist, Args>(
		async ({ args, context }) => {
			const playlist =
				await query(context.pg)({
					sql: INSERT_PLAYLIST,
					parse: parseRow<Playlist>(),
					variables: [{
						value: uuid(),
						key: "playlistId",
					},{
						key: "title",
						parameterized: true,
						value: args.playlist.title,
					},{
						string: false,
						key: "columnNames",
						value: join(COLUMN_NAMES.PLAYLIST),
					},{
						key: "userId",
						value: context.authorization!.userId,
					}],
				})
			await query(context.pg)({
				log: { sql: true },
				sql: INSERT_USER_DOC,
				variables: [{
					string: false,
					key: "columnName",
					value: "playlist_id",
				},{
					value: true,
					key: "inLibrary",
				},{
					string: false,
					key: "tableName",
					value: "users_playlists",
				},{
					key: "docId",
					value: playlist.playlistId,
				},{
					key: "userId",
					value: context.authorization!.userId,
				}],
			})
			return playlist
		},
	)

interface PlaylistInput {
	title: string,
}

interface Args {
	playlist: PlaylistInput,
}