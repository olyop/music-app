import { pg } from "../../../services"
import { SELECT_USER } from "../../../sql"
import clearUserQueue from "./clearUserQueue"
import { COLUMN_NAMES } from "../../../globals"
import { User, UserArgs } from "../../../types"
import { sql, createResolver } from "../../../helpers"

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

				await clearUserQueue(client)(args.userId)

				returnValue = await sqlPoolQuery<User>({
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