import { UPDATE_USER_SONG_NEXT } from "../../sql"
import { sql, createResolver } from "../../helpers"

const resolver =
	createResolver()

export const userAddSongNext =
	resolver(
		() => (
			sql.query({
				sql: UPDATE_USER_SONG_NEXT,
				parse: sql.parseRow,
			})
		),
	)