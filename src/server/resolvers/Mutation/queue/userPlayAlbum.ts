import {
	join,
	parseTable,
	query as pgQuery,
	exists as pgExists,
} from "@oly_op/pg-helpers"

import { UserInputError } from "apollo-server-express"

import {
	INSERT_USER_QUEUE,
	SELECT_ALBUM_SONGS,
	UPDATE_USER_CURRENT,
} from "../../../sql"

import { clearUserQueue } from "./helpers"
import { User, Song } from "../../../types"
import { COLUMN_NAMES } from "../../../globals"
import { createResolver, getUserWithQueue } from "../../../helpers"

const resolver =
	createResolver()

export const userPlayAlbum =
	resolver<User, { albumId: string }>(
		async ({ args, context }) => {
			const { albumId } = args
			const { userId } = context.authorization!
			const client = await context.pg.connect()
			const query = pgQuery(client)
			const exists = pgExists(client)

			let user: User

			try {
				await query("BEGIN")

				const albumExists =
					await exists({
						value: albumId,
						table: "albums",
						column: "album_id",
					})

				if (!albumExists) {
					throw new UserInputError("Album does not exist.")
				}

				await clearUserQueue(client)(userId)

				const [ current, ...songs ] =
					await query({
						sql: SELECT_ALBUM_SONGS,
						parse: parseTable<Song>(),
						variables: [{
							key: "albumId",
							value: args.albumId,
						},{
							string: false,
							key: "columnNames",
							value: join(COLUMN_NAMES.SONG),
						}],
					})

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

				await Promise.all(songs.map(
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