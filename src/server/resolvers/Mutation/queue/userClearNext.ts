import { query as pgHelpersQuery } from "@oly_op/pg-helpers"

import { User } from "../../../types"
import { clearUserNext } from "./helpers"
import { createResolver, getUserWithQueue } from "../../../helpers"

const resolver =
	createResolver()

export const userClearNext =
	resolver<User>(
		async ({ context }) => {
			const { userId } = context.authorization!
			const client = await context.pg.connect()
			const query = pgHelpersQuery(client)

			let user: User

			try {
				await query("BEGIN")
				await clearUserNext(client)(userId)
				user = await getUserWithQueue(client)(userId)
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