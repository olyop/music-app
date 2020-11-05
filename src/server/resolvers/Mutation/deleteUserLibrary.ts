import {
	sqlJoin,
	sqlQuery,
	parseSqlRow,
	createResolver,
} from "../../helpers"

import {
	SELECT_USER,
	DELETE_USER_SONGS,
	DELETE_USER_ARTISTS,
} from "../../sql"

import { User, UserArgs } from "../../types"
import { COLUMN_NAMES } from "../../globals"

const resolver =
	createResolver()

export const deleteUserLibrary =
	resolver<User, UserArgs>(
		async ({ args, context }) => {
			await sqlQuery(context.pg)({
				sql: DELETE_USER_SONGS,
				variables: [{ key: "userId", value: args.userId }],
			})
			await sqlQuery(context.pg)({
				sql: DELETE_USER_ARTISTS,
				variables: [{ key: "userId", value: args.userId }],
			})
			return sqlQuery(context.pg)({
				sql: SELECT_USER,
				parse: parseSqlRow<User>(),
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