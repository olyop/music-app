import {
	sqlJoin,
	sqlQuery,
	parseSqlRow,
	createResolver,
} from "../../../helpers"

import { pg } from "../../../services"
import { SELECT_USER } from "../../../sql"
import clearUserQueue from "./clearUserQueue"
import { COLUMN_NAMES } from "../../../globals"
import { User, UserArgs } from "../../../types"

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
			const query = sqlQuery(client)
			try {
				await query("BEGIN")

				await clearUserQueue(client)(args.userId)

				returnValue = await query<User>({
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