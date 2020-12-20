// import { v4 as uuid } from "uuid"

import {
	sqlJoin,
	sqlQuery,
	parseSqlRow,
	createResolver,
	getSqlResExists,
} from "../../helpers"

import {
	SELECT_SONG,
	EXISTS_PLAYLIST_SONG,
	INSERT_PLAYLIST_SONG,
} from "../../sql"

import { Song } from "../../types"
import { COLUMN_NAMES } from "../../globals"

interface Args {
	userId: string,
	songId: string,
	playlistId: string,
}

const resolver =
	createResolver()

export const addSongToPlaylist =
	resolver<Song, Args>(
		async ({ args, context }) => {
			const inPlaylist = await sqlQuery(context.pg)({
				sql: EXISTS_PLAYLIST_SONG,
				parse: getSqlResExists,
				variables: [{
					key: "songId",
					value: args.songId,
				},{
					key: "playlistId",
					value: args.playlistId,
				}],
			})
			if (!inPlaylist) {
				await sqlQuery(context.pg)({
					sql: INSERT_PLAYLIST_SONG,
					variables: [{
						key: "songId",
						value: args.songId,
					},{
						key: "playlistId",
						value: args.playlistId,
					}],
				})
			}
			return sqlQuery(context.pg)({
				sql: SELECT_SONG,
				parse: parseSqlRow(),
				variables: [{
					key: "songId",
					value: args.songId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.SONG),
				}],
			})
		},
	)