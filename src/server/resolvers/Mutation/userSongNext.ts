import {
	SELECT_USER,
	SELECT_USER_QUEUE,
	INSERT_USER_QUEUE,
	UPDATE_USER_QUEUE_SONG,
} from "../../sql"

import { pg } from "../../services"
import { COLUMN_NAMES } from "../../globals"
import { sql, createResolver } from "../../helpers"
import { User, UserQueue, UserQueuesArgs } from "../../types"

const resolver =
	createResolver()

export const userSongNext =
	resolver<User, UserQueuesArgs>(
		async ({ args }) => {
			const client = await pg.connect()
			const query = sql.baseQuery(client)
			try {
				await query("BEGIN")

				const nexts = await query<UserQueue[]>({
					sql: SELECT_USER_QUEUE,
					parse: sql.parseTable(),
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
						value: sql.join(COLUMN_NAMES.USER_QUEUE),
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
							value: "users_nexts",
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
						value: "users_nexts",
					}],
				})

				await query("COMMIT")
			} catch (error) {
				await query("ROLLBACK")
				throw error
			} finally {
				client.release()
			}

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