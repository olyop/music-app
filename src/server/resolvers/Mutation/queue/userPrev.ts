import {
	join,
	parseRow,
	query as pgHelpersQuery,
} from "@oly_op/pg-helpers"

import { isEmpty } from "lodash"
import { v4 as uuid } from "uuid"

import {
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
import { User, UserQueue } from "../../../types"

const resolver =
	createResolver()

export const userPrev =
	resolver<User>(
		async ({ context }) => {
			let user: User
			const { userId } = context.authorization!
			const client = await context.pg.connect()
			const query = pgHelpersQuery(client)
			try {
				await query("BEGIN")

				const { prev, current, next, later } =
					await getUserQueues(client)(userId)

				if (!isEmpty(prev)) {
					const newCurrent = await query({
						sql: SELECT_USER_QUEUE_SONG,
						parse: parseRow<UserQueue>(),
						variables: [{
							key: "userId",
							value: userId,
						},{
							string: false,
							key: "tableName",
							value: "users_prevs",
						},{
							key: "index",
							string: false,
							value: prev.length - 1,
						},{
							string: false,
							key: "columnNames",
							value: join(COLUMN_NAMES.USER_QUEUE),
						}],
					})
					await query({
						sql: DELETE_USER_QUEUE_SONG,
						variables: [{
							key: "userId",
							value: userId,
						},{
							string: false,
							key: "tableName",
							value: "users_prevs",
						},{
							key: "index",
							string: false,
							value: prev.length - 1,
						}],
					})
					if (!isEmpty(next) || !isEmpty(later)) {
						for (const queue of isEmpty(next) ? later : next) {
							await query({
								sql: UPDATE_USER_QUEUE_SONG,
								variables: [{
									value: "+",
									string: false,
									key: "addSubtract",
								},{
									key: "userId",
									value: userId,
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
							value: userId,
						},{
							value: 0,
							key: "index",
							string: false,
						},{
							key: "songId",
							value: current!,
						},{
							string: false,
							key: "tableName",
							value: isEmpty(next) ?
								"users_laters" : "users_nexts",
						}],
					})
					await query({
						sql: INSERT_PLAY,
						variables: [{
							key: "playId",
							value: uuid(),
						},{
							key: "userId",
							value: userId,
						},{
							key: "songId",
							value: newCurrent.songId,
						}],
					})
					await query({
						sql: UPDATE_USER_CURRENT,
						variables: [{
							key: "userId",
							value: userId,
						},{
							key: "songId",
							value: newCurrent.songId,
						},{
							string: false,
							key: "columnNames",
							value: join(COLUMN_NAMES.USER),
						}],
					})
					user = await getUserWithQueue(client)(userId)
				} else {
					user = await query({
						sql: SELECT_USER,
						parse: parseRow<User>(),
						variables: [{
							key: "userId",
							value: userId,
						},{
							string: false,
							key: "columnNames",
							value: join(COLUMN_NAMES.USER),
						}],
					})
				}

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