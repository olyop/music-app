import { COLUMN_NAMES } from "../../globals"
import { User, UserQueuesArgs } from "../../types"
import { sql, createResolver } from "../../helpers"
import { SELECT_USER_QUEUES, SELECT_USER } from "../../sql"

const resolver =
	createResolver()

export const userSongQueue =
	resolver<User, UserQueuesArgs>(
		async ({ args }) => {
			console.log(await sql.query({
				sql: SELECT_USER_QUEUES,
				parse: sql.parseRow(),
				variables: [{
					key: "userId",
					value: args.userId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.USER_QUEUE),
				}],
			}))
			return sql.query({
				sql: SELECT_USER,
				parse: sql.parseRow(),
				variables: [{
					key: "userId",
					value: args.userId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.USER),
				}],
			})
		},
	)