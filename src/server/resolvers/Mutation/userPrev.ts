import { User } from "../../types"
import { UPDATE_USER_PREV } from "../../sql"
import { sql, createResolver } from "../../helpers"

const resolver = createResolver()

export const userPrev =
	resolver<User>(
		() => (
			sql.query({
				sql: UPDATE_USER_PREV,
				parse: sql.parseRow(),
			})
		),
	)