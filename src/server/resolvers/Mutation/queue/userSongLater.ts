import {
	join,
	parseTable,
	query as pgQuery,
	exists as pgExists,
} from "@oly_op/pg-helpers"

import { UserInputError } from "apollo-server-express"

import {
	SELECT_USER_QUEUE,
	INSERT_USER_QUEUE,
	UPDATE_USER_QUEUE_SONG,
} from "../../../sql"

import { pg } from "../../../services"
import { COLUMN_NAMES } from "../../../globals"
import { User, UserQueue } from "../../../types"
import { createResolver, getUserWithQueue } from "../../../helpers"

const resolver =
	createResolver()

export const userSongLater =
	resolver<User, Args>(
		async ({ args, context }) => {
			const { songId } = args
			const { userId } = context.authorization!

			const client = await pg.connect()
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
							value: "users_laters",
						},{
							string: false,
							key: "columnNames",
							value: join(COLUMN_NAMES.USER_QUEUE),
						}],
					})

				for (const next of nexts) {
					await query({
						sql: UPDATE_USER_QUEUE_SONG,
						variables: [{
							key: "userId",
							value: userId,
						},{
							key: "index",
							string: false,
							value: next.index,
						},{
							value: "+",
							string: false,
							key: "addSubtract",
						},{
							key: "songId",
							value: next.songId,
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
						value: userId,
					},{
						key: "songId",
						value: songId,
					},{
						string: false,
						key: "tableName",
						value: "users_laters",
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