import { COLUMN_NAMES } from "../../../globals"
import { User, UserArgs } from "../../../types"
import { UPDATE_USER_PLAY } from "../../../sql"
import { sql, createResolver } from "../../../helpers"

interface Args extends UserArgs {
	songId: string,
}

const resolver =
	createResolver()

export const userPlay =
	resolver<User, Args>(
		({ args }) => (
			sql.query({
				sql: UPDATE_USER_PLAY,
				parse: res => sql.parseRow(res),
				variables: [{
					key: "userId",
					value: args.userId,
				},{
					key: "songId",
					value: args.songId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.USER),
				}],
			})
		),
	)