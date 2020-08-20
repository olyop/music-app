import { COLUMN_NAMES } from "../../globals"
import { User, UserArgs } from "../../types"
import { UPDATE_USER_PLAY } from "../../sql"
import { sql, createResolver } from "../../helpers"

const resolver =
	createResolver()

export const userPlay =
	resolver<User, Args>(
		({ args }) => (
			sql.query({
				sql: UPDATE_USER_PLAY,
				parse: sql.parseRow(),
				variables: [{
					key: "userId",
					value: args.userId,
				},{
					key: "songId",
					value: args.docId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.USER),
				}],
			})
		),
	)

interface Args extends UserArgs {
	docId: string,
}