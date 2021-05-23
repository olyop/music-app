import {
	parseTable,
	query as pgQuery,
	exists as pgExists,
} from "@oly_op/pg-helpers"

import { UserInputError } from "apollo-server-express"

import { User, UserQueue } from "../../../types"
import { createResolver, getUserWithQueue } from "../../../helpers"
import { SELECT_USER_QUEUE, INSERT_USER_QUEUE } from "../../../sql"

const resolver =
	createResolver()

export const userSongAfter =
	resolver<User, Args>(
		async ({ args, context }) => {
			const { songId } = args
			const { userId } = context.authorization!

			const client = await context.pg.connect()
			const query = pgQuery(client)
			const exists = pgExists(client)

			let user: User

			try {
				await query("BEGIN")

				const songExists =
					await exists({
						value: songId,
						table: "songs",
						column: "song_id",
					})

				if (!songExists) {
					throw new UserInputError("Song does not exist.")
				}

				const nexts =
					await query({
						sql: SELECT_USER_QUEUE,
						parse: parseTable<UserQueue>(),
						variables: [{
							key: "userId",
							value: userId,
						},{
							string: false,
							key: "tableName",
							value: "users_nexts",
						},{
							value: "*",
							string: false,
							key: "columnNames",
						}],
					})

				await query({
					sql: INSERT_USER_QUEUE,
					variables: [{
						key: "userId",
						value: userId,
					},{
						key: "songId",
						value: args.songId,
					},{
						string: false,
						key: "tableName",
						value: "users_nexts",
					},{
						key: "index",
						string: false,
						value: nexts.length,
					}],
				})

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

interface Args {
	songId: string,
}