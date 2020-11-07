import { isEmpty } from "lodash"
import { v4 as uuid } from "uuid"

import {
	sqlJoin,
	sqlQuery,
	parseSqlRow,
	getUserQueues,
	createResolver,
	getUserWithQueue,
} from "../../../helpers"

import {
	SELECT_USER,
	INSERT_PLAY,
	INSERT_USER_QUEUE,
	UPDATE_USER_CURRENT,
	UPDATE_USER_QUEUE_SONG,
	SELECT_USER_QUEUE_SONG,
	DELETE_USER_QUEUE_SONG,
} from "../../../sql"

import { COLUMN_NAMES } from "../../../globals"
import { User, UserArgs, UserQueue } from "../../../types"

const resolver =
	createResolver()

export const userNext =
	resolver<User, UserArgs>(
		async ({ args, context }) => {
			let user: User
			const client = await context.pg.connect()
			const query = sqlQuery(client)
			try {
				await client.query("BEGIN")

				const { prev, current, next, later } =
					await getUserQueues(client)(args.userId)

				if (!isEmpty(next) || !isEmpty(later)) {
					const newCurrent = await query({
						sql: SELECT_USER_QUEUE_SONG,
						parse: parseSqlRow<UserQueue>(),
						variables: [{
							value: 0,
							key: "index",
							string: false,
						},{
							key: "userId",
							value: args.userId,
						},{
							string: false,
							key: "tableName",
							value: isEmpty(next) ?
								"users_laters" : "users_nexts",
						},{
							string: false,
							key: "columnNames",
							value: sqlJoin(COLUMN_NAMES.USER_QUEUE),
						}],
					})
					await query({
						sql: DELETE_USER_QUEUE_SONG,
						variables: [{
							value: 0,
							key: "index",
							string: false,
						},{
							key: "userId",
							value: args.userId,
						},{
							string: false,
							key: "tableName",
							value: isEmpty(next) ?
								"users_laters" : "users_nexts",
						}],
					})
					for (const queue of isEmpty(next) ? later : next) {
						if (queue.index !== 0) {
							await query({
								sql: UPDATE_USER_QUEUE_SONG,
								variables: [{
									value: "-",
									string: false,
									key: "addSubtract",
								},{
									key: "userId",
									value: args.userId,
								},{
									key: "songId",
									value: queue.songId,
								},{
									key: "index",
									string: false,
									value: queue.index,
								},{
									string: false,
									key: "tableName",
									value: isEmpty(next) ?
										"users_laters" : "users_nexts",
								}],
							})
						}
					}
					await query({
						sql: INSERT_USER_QUEUE,
						variables: [{
							key: "userId",
							value: args.userId,
						},{
							key: "songId",
							value: current!,
						},{
							string: false,
							key: "tableName",
							value: "users_prevs",
						},{
							key: "index",
							string: false,
							value: prev.length,
						}],
					})
					await query({
						sql: INSERT_PLAY,
						variables: [{
							key: "playId",
							value: uuid(),
						},{
							key: "userId",
							value: args.userId,
						},{
							key: "songId",
							value: newCurrent.songId,
						}],
					})
					await query({
						sql: UPDATE_USER_CURRENT,
						variables: [{
							key: "userId",
							value: args.userId,
						},{
							key: "songId",
							value: newCurrent.songId,
						},{
							string: false,
							key: "columnNames",
							value: sqlJoin(COLUMN_NAMES.USER),
						}],
					})
					user = await getUserWithQueue(client)(args.userId)
				} else {
					user = await query({
						sql: SELECT_USER,
						parse: parseSqlRow<User>(),
						variables: [{
							key: "userId",
							value: args.userId,
						},{
							string: false,
							key: "columnNames",
							value: sqlJoin(COLUMN_NAMES.USER),
						}],
					})
				}

				await client.query("COMMIT")
			} catch (error) {
				await client.query("ROLLBACK")
				throw error
			} finally {
				client.release()
			}

			return user
		},
	)