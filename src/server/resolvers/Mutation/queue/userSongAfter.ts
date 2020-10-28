import {
	SELECT_USER,
	SELECT_USER_QUEUE,
	INSERT_USER_QUEUE,
} from "../../../sql"

import { COLUMN_NAMES } from "../../../globals"
import { sql, createResolver } from "../../../helpers"
import { User, UserQueue, UserQueuesArgs } from "../../../types"

const resolver =
	createResolver()

export const userSongAfter =
	resolver<User, UserQueuesArgs>(
		async ({ args }) => {
			const nexts = await sqlPoolQuery<UserQueue[]>({
				sql: SELECT_USER_QUEUE,
				parse: parseSqlTable(),
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
			await sqlPoolQuery({
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
			return sqlPoolQuery<User>({
				sql: SELECT_USER,
				parse: parseSqlRow(),
				variables: [{
					key: "userId",
					value: args.userId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.USER),
				}],
			})
		},
	)