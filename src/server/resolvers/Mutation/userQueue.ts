import {
	UPDATE_USER_PLAY,
} from "../../sql"

import { COLUMN_NAMES } from "../../globals"
import { User, UserArgs } from "../../types"
import { sql, createResolver } from "../../helpers"

const resolver =
	createResolver()

interface Args extends UserArgs {
	docId: string,
}

export const userPrev =
	resolver<string>(() => "userPrev")

export const userNext =
	resolver<string>(() => "userNext")

export const userPlay =
	resolver<User, Args>(
		({ args }) => (
			sql.query({
				sql: UPDATE_USER_PLAY,
				parse: sql.parseRow(),
				variables: [{
					key: "songId",
					value: args.docId,
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