import {
	sqlJoin,
	sqlQuery,
	parseSqlTable,
	createResolver,
	getUserWithQueue,
} from "../../../helpers"

import { COLUMN_NAMES } from "../../../globals"
import { User, UserQueue, UserQueuesArgs } from "../../../types"
import { SELECT_USER_QUEUE, INSERT_USER_QUEUE } from "../../../sql"

const resolver =
	createResolver()

export const userSongAfter =
	resolver<User, UserQueuesArgs>(
		async ({ args, context }) => {
			const nexts = await sqlQuery(context.pg)({
				sql: SELECT_USER_QUEUE,
				parse: parseSqlTable<UserQueue>(),
				variables: [{
					key: "userId",
					value: args.userId,
				},{
					string: false,
					key: "tableName",
					value: "users_nexts",
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.USER_QUEUE),
				}],
			})
			await sqlQuery(context.pg)({
				sql: INSERT_USER_QUEUE,
				variables: [{
					key: "userId",
					value: args.userId,
				},{
					key: "songId",
					value: args.songId,
				},{
					string: false,
					key: "tableName",
					value: "users_nexts",
				},{
					key: "index",
					string: false,
					value: nexts.length,
				}],
			})
			return getUserWithQueue(context.pg)(args.userId)
		},
	)