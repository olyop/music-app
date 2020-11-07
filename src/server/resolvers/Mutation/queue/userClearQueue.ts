import {
	sqlQuery,
	createResolver,
	getUserWithQueue,
} from "../../../helpers"

import clearUserQueue from "./clearUserQueue"
import { User, UserArgs } from "../../../types"

const resolver =
	createResolver()

interface Args extends UserArgs {
	songId: string,
}

export const userClearQueue =
	resolver<User, Args>(
		async ({ args, context }) => {
			let user: User
			const client = await context.pg.connect()
			const query = sqlQuery(client)
			try {
				await query("BEGIN")

				await clearUserQueue(client)(args.userId)

				user = await getUserWithQueue(client)(args.userId)

				await query("COMMIT")
			} catch (error) {
				await query("ROLLBACK")
				throw error
			} finally {
				client.release()
			}

			return user
		},
	)