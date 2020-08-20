import { UPDATE_USER_NEXT } from "../../sql"
import { sql, createResolver } from "../../helpers"

const resolver = createResolver()

export const userNext =
	resolver(
		() => (
			sql.query({
				sql: UPDATE_USER_NEXT,
				parse: sql.parseRow,
			})
		),
	)