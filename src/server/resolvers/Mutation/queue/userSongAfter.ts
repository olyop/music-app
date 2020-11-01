import {
	sqlJoin,
	sqlQuery,
	parseSqlRow,
	parseSqlTable,
	createResolver,
} from "../../../helpers"

import {
	SELECT_USER,
	SELECT_USER_QUEUE,
	INSERT_USER_QUEUE,
} from "../../../sql"

import { COLUMN_NAMES } from "../../../globals"
import { User, UserQueue, UserQueuesArgs } from "../../../types"

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
			return sqlQuery(context.pg)<User>({
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