import {
	sqlJoin,
	sqlQuery,
	parseSqlTable,
	createResolver,
	getUserWithQueue,
} from "../../../helpers"

import {
	SELECT_USER_QUEUE,
	INSERT_USER_QUEUE,
	UPDATE_USER_QUEUE_SONG,
} from "../../../sql"

import { pg } from "../../../services"
import { COLUMN_NAMES } from "../../../globals"
import { User, UserQueue, UserQueuesArgs } from "../../../types"

const resolver =
	createResolver()

export const userSongLater =
	resolver<User, UserQueuesArgs>(
		async ({ args }) => {
			let user: User
			const client = await pg.connect()
			const query = sqlQuery(client)
			try {
				await query("BEGIN")

				const nexts = await query<UserQueue[]>({
					sql: SELECT_USER_QUEUE,
					parse: parseSqlTable(),
					variables: [{
						key: "userId",
						value: args.userId,
					},{
						string: false,
						key: "tableName",
						value: "users_laters",
					},{
						string: false,
						key: "columnNames",
						value: sqlJoin(COLUMN_NAMES.USER_QUEUE),
					}],
				})

				for (const next of nexts) {
					await query({
						sql: UPDATE_USER_QUEUE_SONG,
						variables: [{
							value: "+",
							string: false,
							key: "addSubtract",
						},{
							key: "userId",
							value: args.userId,
						},{
							key: "index",
							string: false,
							value: next.index,
						},{
							string: false,
							key: "tableName",
							value: "users_laters",
						}],
					})
				}

				await query({
					sql: INSERT_USER_QUEUE,
					variables: [{
						value: 0,
						key: "index",
						string: false,
					},{
						key: "userId",
						value: args.userId,
					},{
						key: "songId",
						value: args.songId,
					},{
						string: false,
						key: "tableName",
						value: "users_laters",
					}],
				})

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