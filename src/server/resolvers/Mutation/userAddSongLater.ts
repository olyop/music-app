import { UPDATE_USER_SONG_LATER } from "../../sql"
import { sql, createResolver } from "../../helpers"

const resolver =
	createResolver()

export const userAddSongLater =
	resolver(
		() => (
			sql.query({
				sql: UPDATE_USER_SONG_LATER,
				parse: sql.parseRow,
			})
		),
	)