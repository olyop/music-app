import pipe from "@oly_op/pipe"
import { shuffle as lodashShuffle } from "lodash"
import { parseTable, query as pgHelpersQuery } from "@oly_op/pg-helpers"

import {
	INSERT_USER_QUEUE,
	UPDATE_USER_CURRENT,
	SELECT_USER_SONGS_ALL,
} from "../../../sql"

import { clearUserQueue } from "./helpers"
import { Song, User } from "../../../types"
import { createResolver, getUserWithQueue } from "../../../helpers"

const shuffle =
	<T>() => (x: T[]) => lodashShuffle<T>(x)

const resolver =
	createResolver()

export const userShuffleLibrary =
	resolver<User>(
		async ({ context }) => {
			const { userId } = context.authorization!
			const client = await context.pg.connect()
			const query = pgHelpersQuery(client)

			let user: User

			try {
				await query("BEGIN")

				await clearUserQueue(client)(userId)

				const [ current, ...shuffled ] =
					await query({
						sql: SELECT_USER_SONGS_ALL,
						parse: pipe(parseTable<Song>(), shuffle<Song>()),
						variables: [{
							key: "userId",
							value: userId,
						}],
					})

				if (current !== undefined) {
					await query({
						sql: UPDATE_USER_CURRENT,
						variables: [{
							key: "userId",
							value: userId,
						},{
							value: "*",
							string: false,
							key: "columnNames",
						},{
							key: "songId",
							value: current.songId,
						}],
					})
					await Promise.all(shuffled.map(
						({ songId }, index) => (
							query({
								sql: INSERT_USER_QUEUE,
								variables: [{
									key: "songId",
									value: songId,
								},{
									key: "index",
									value: index,
									string: false,
								},{
									key: "userId",
									value: userId,
								},{
									string: false,
									key: "tableName",
									value: "users_laters",
								}],
							})
						),
					))
				}

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