import { UPDATE_USER_PREV } from "../../../sql"
import { User } from "../../../types"
import { sql, createResolver } from "../../../helpers"

const resolver = createResolver()

export const userPrev =
	resolver<User>(
		() => (
			sql.query({
				sql: UPDATE_USER_PREV,
				parse: res => sql.parseRow(res),
			})
		),
	)