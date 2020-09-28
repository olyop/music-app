import { COLUMN_NAMES } from "../../globals"
import { User, UserArgs } from "../../types"
import { UPDATE_USER_CURRENT } from "../../sql"
import { sql, createResolver } from "../../helpers"

const resolver =
	createResolver()

interface Args extends UserArgs {
	songId: string,
}

export const updateUserCurrent =
	resolver<User, Args>(
		({ args }) => (
			sql.query({
				sql: UPDATE_USER_CURRENT,
				parse: sql.parseRow(),
				variables: [{
					key: "songId",
					value: args.songId,
				},{
					key: "userId",
					value: args.userId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.USER),
				}],
			})
		),
	)