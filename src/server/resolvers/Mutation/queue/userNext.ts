/* eslint-disable no-await-in-loop, no-restricted-syntax */
import { isEmpty } from "lodash"

import {
	SELECT_USER,
	INSERT_USER_QUEUE,
	UPDATE_USER_CURRENT,
	UPDATE_USER_QUEUE_SONG,
	SELECT_USER_QUEUE_SONG,
	DELETE_USER_QUEUE_SONG,
} from "../../../sql"

import { pg } from "../../../services"
import getUserQueue from "./getUserQueue"
import { COLUMN_NAMES } from "../../../globals"
import { createResolver, sql } from "../../../helpers"
import { User, UserArgs, UserQueue } from "../../../types"

const resolver =
	createResolver()

export const userNext =
	resolver<User, UserArgs>(
		async ({ args }) => {
			const client = await pg.connect()
			const query = sql.baseQuery(client)
			try {
				await client.query("BEGIN")

				const { prevs, nexts, laters, current } =
					await getUserQueue(client)(args.userId)

				if (!isEmpty(nexts) || !isEmpty(laters)) {
					const newCurrent = await query<UserQueue>({
						sql: SELECT_USER_QUEUE_SONG,
						parse: sql.parseRow(),
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
							value: isEmpty(nexts) ?
								"users_laters" : "users_nexts",
						},{
							string: false,
							key: "columnNames",
							value: sql.join(COLUMN_NAMES.USER_QUEUE),
						}],
					})
					await query({
						sql: DELETE_USER_QUEUE_SONG,
						variables: [{
							key: "userId",
							value: args.userId,
						},{
							key: "index",
							string: false,
							value: newCurrent.index,
						},{
							string: false,
							key: "tableName",
							value: isEmpty(nexts) ?
								"users_laters" : "users_nexts",
						}],
					})
					for (const queue of isEmpty(nexts) ? laters : nexts) {
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
								key: "index",
								string: false,
								value: queue.index,
							},{
								string: false,
								key: "tableName",
								value: isEmpty(nexts) ?
									"users_laters" : "users_nexts",
							}],
						})
					}
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
							value: sql.join(COLUMN_NAMES.USER),
						}],
					})
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
							value: prevs.length + 1,
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