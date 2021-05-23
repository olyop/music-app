import {
	join,
	parseRow,
	query as pgHelpersQuery,
	exists as pgHelpersExists,
} from "@oly_op/pg-helpers"

import {
	ForbiddenError,
	UserInputError,
} from "apollo-server-express"

import {
	SELECT_USER,
	DELETE_PLAYLIST,
	SELECT_PLAYLIST,
} from "../../sql"

import { User, Playlist } from "../../types"
import { COLUMN_NAMES } from "../../globals"
import { createResolver } from "../../helpers"

const resolver =
	createResolver()

export const deletePlaylist =
	resolver<User, Args>(
		async ({ args, context }) => {
			const { playlistId } = args
			const query = pgHelpersQuery(context.pg)
			const { userId } = context.authorization!
			const exists = pgHelpersExists(context.pg)

			const playlistExists =
				await exists({
					value: playlistId,
					table: "playlists",
					column: "playlist_id",
				})

			if (!playlistExists) {
				throw new UserInputError("Playlist does not exist.")
			}

			const isUsersPlaylist =
				await query({
					sql: SELECT_PLAYLIST,
					parse: res => (userId === parseRow<Playlist>()(res).userId),
					variables: [{
						key: "playlistId",
						value: playlistId,
					},{
						value: "*",
						string: false,
						key: "columnNames",
					}],
				})

			if (!isUsersPlaylist) {
				throw new ForbiddenError("Unauthorized to delete playlist.")
			}

			await query({
				sql: DELETE_PLAYLIST,
				variables: [{
					key: "playlistId",
					value: args.playlistId,
				}],
			})

			return query({
				sql: SELECT_USER,
				parse: parseRow<User>(),
				variables: [{
					key: "userId",
					value: userId,
				},{
					string: false,
					key: "columnNames",
					value: join(COLUMN_NAMES.USER),
				}],
			})
		},
	)

interface Args {
	playlistId: string,
}