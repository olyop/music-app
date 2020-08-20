import { UPDATE_USER_SONG_QUEUE } from "../../sql"
import { sql, createResolver } from "../../helpers"

const resolver =
	createResolver()

export const userAddSongNext =
	resolver(
		() => (
			sql.query({
				sql: UPDATE_USER_SONG_QUEUE,
				parse: sql.parseRow,
			})
		),
	)