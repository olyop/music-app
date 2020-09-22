import {
	SELECT_USER,
	SELECT_USER_NEXTS,
	INSERT_USER_QUEUE,
	UPDATE_USER_QUEUE,
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
			try {
				await client.query("BEGIN")

				const nexts = await sql.baseQuery(client)<UserQueue[]>({
					sql: SELECT_USER_NEXTS,
					parse: sql.parseTable(),
					variables: [{
						key: "userId",
						value: args.userId,
					},{
						string: false,
						key: "columnNames",
						value: sql.join(COLUMN_NAMES.USER_QUEUE),
					}],
				})

				await Promise.all(nexts.map(next => (
					sql.baseQuery(client)({
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
							value: "users_nexts",
						}],
					})
				)))

				console.log(await sql.baseQuery(client)<UserQueue[]>({
					sql: SELECT_USER_NEXTS,
					parse: sql.parseTable(),
					variables: [{
						key: "userId",
						value: args.userId,
					},{
						string: false,
						key: "columnNames",
						value: sql.join(COLUMN_NAMES.USER_QUEUE),
					}],
				}))

				await sql.baseQuery(client)({
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