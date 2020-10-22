import {
	SELECT_USER,
	DELETE_USER_PREV,
	DELETE_USER_NEXT,
	DELETE_USER_LATER,
	UPDATE_USER_CURRENT,
} from "../../sql"

import { pg } from "../../services"
import { COLUMN_NAMES } from "../../globals"
import { sql, createResolver } from "../../helpers"
import { User, UserArgs, SqlVariable } from "../../types"

const resolver =
	createResolver()

interface Args extends UserArgs {
	songId: string,
}

export const userClearQueue =
	resolver<User, Args>(
		async ({ args }) => {
			let returnValue: User
			const client = await pg.connect()
			const query = sql.baseQuery(client)
			try {
				await query("BEGIN")

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
				await sql.query({
					log: true,
					sql: UPDATE_USER_CURRENT,
					variables: [{
						value: null,
						key: "songId",
						string: false,
					},{
						key: "userId",
						value: args.userId,
					},{
						value: "*",
						string: false,
						key: "columnNames",
					}],
				})

				returnValue = await sql.query<User>({
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

				await query("COMMIT")
			} catch (error) {
				await query("ROLLBACK")
				throw error
			} finally {
				client.release()
			}

			return returnValue
		},
	)