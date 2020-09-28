import {
	SELECT_USER,
	DELETE_USER_PREV,
	DELETE_USER_NEXT,
	DELETE_USER_LATER,
} from "../../sql"

import { COLUMN_NAMES } from "../../globals"
import { sql, createResolver } from "../../helpers"
import { User, UserArgs, SqlVariable } from "../../types"

const resolver =
	createResolver()

interface Args extends UserArgs {
	songId: string,
}

export const clearUserQueue =
	resolver<User, Args>(
		async ({ args }) => {
			const variables: SqlVariable[] = [{
				key: "userId",
				value: args.userId,
			}]
			await sql.query({
				sql: DELETE_USER_PREV,
				variables,
			})
			await sql.query({
				sql: DELETE_USER_NEXT,
				variables,
			})
			await sql.query({
				sql: DELETE_USER_LATER,
				variables,
			})
			return sql.query<User>({
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