// import { v4 as uuid } from "uuid"

import {
	sqlJoin,
	sqlQuery,
	parseSqlRow,
	createResolver,
} from "../../helpers"

// import {
// 	INSERT_PLAYLIST,
// 	INSERT_USER_DOC,
// } from "../../sql"

import { Song } from "../../types"
import { SELECT_SONG } from "../../sql"
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
		({ args, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_SONG,
				parse: parseSqlRow(),
				variables: [{
					key: "songId",
					value: args.songId,
				},{
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.SONG),
				}],
			})
		),
	)