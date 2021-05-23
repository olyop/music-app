import {
	join,
	parseRow,
	getResExists,
	query as pgHelpersQuery,
	exists as pgHelpersExists,
} from "@oly_op/pg-helpers"

import {
	ForbiddenError,
	UserInputError,
} from "apollo-server-express"

import {
	SELECT_SONG,
	SELECT_PLAYLIST,
	EXISTS_PLAYLIST_SONG,
	INSERT_PLAYLIST_SONG,
} from "../../sql"

import { Playlist, Song } from "../../types"
import { COLUMN_NAMES } from "../../globals"
import { createResolver } from "../../helpers"

const resolver =
	createResolver()

export const addSongToPlaylist =
	resolver<Song, Args>(
		async ({ args, context }) => {
			const { songId, playlistId } = args
			const query = pgHelpersQuery(context.pg)
			const { userId } = context.authorization!
			const exists = pgHelpersExists(context.pg)

			const songExists =
				await exists({
					value: songId,
					table: "songs",
					column: "song_id",
				})

			if (!songExists) {
				throw new UserInputError("Song does not exist.")
			}

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
					parse: res => (parseRow<Playlist>()(res).userId === userId),
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
				throw new ForbiddenError("Unauthorized to add to playlist.")
			}

			const inPlaylist =
				await query({
					sql: EXISTS_PLAYLIST_SONG,
					parse: getResExists,
					variables: [{
						key: "songId",
						value: songId,
					},{
						key: "playlistId",
						value: playlistId,
					}],
				})

			if (inPlaylist) {
				throw new UserInputError("Song is already in playlist.")
			}

			await query({
				sql: INSERT_PLAYLIST_SONG,
				variables: [{
					key: "songId",
					value: songId,
				},{
					key: "playlistId",
					value: playlistId,
				}],
			})

			return query({
				sql: SELECT_SONG,
				parse: parseRow<Song>(),
				variables: [{
					key: "songId",
					value: songId,
				},{
					string: false,
					key: "columnNames",
					value: join(COLUMN_NAMES.SONG),
				}],
			})
		},
	)

interface Args {
	songId: string,
	playlistId: string,
}