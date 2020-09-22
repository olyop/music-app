/* eslint-disable no-await-in-loop, no-restricted-syntax */
import {
	SELECT_USER,
	SELECT_USER_QUEUE,
	INSERT_USER_QUEUE,
	UPDATE_USER_QUEUE,
} from "../../sql"

import { pg } from "../../services"
import { COLUMN_NAMES } from "../../globals"
import { sql, createResolver } from "../../helpers"
import { User, UserQueue, UserQueuesArgs } from "../../types"

const resolver =
	createResolver()

export const userSongLater =
	resolver<User, UserQueuesArgs>(
		async ({ args }) => {
			const client = await pg.connect()
			const query = sql.baseQuery(client)
			try {
				await client.query("BEGIN")

				const nexts = await query<UserQueue[]>({
					sql: SELECT_USER_QUEUE,
					parse: sql.parseTable(),
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
						value: sql.join(COLUMN_NAMES.USER_QUEUE),
					}],
				})

				for (const next of nexts) {
					await query({
						sql: UPDATE_USER_QUEUE,
						variables: [{
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

				await client.query("COMMIT")
			} catch (error) {
				await client.query("ROLLBACK")
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