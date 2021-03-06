import {
	join,
	parseTable,
	query as pgHelpersQuery,
} from "@oly_op/pg-helpers"

import { shuffle } from "lodash"

import {
	INSERT_USER_QUEUE,
	SELECT_ARTIST_SONGS,
	UPDATE_USER_CURRENT,
} from "../../../sql"

import { clearUserQueue } from "./helpers"
import { User, Song } from "../../../types"
import { COLUMN_NAMES } from "../../../globals"
import { createResolver, getUserWithQueue } from "../../../helpers"

const resolver =
	createResolver()

export const shuffleArtist =
	resolver<User, Args>(
		async ({ args, context }) => {
			let user: User
			const { userId } = context.authorization!
			const client = await context.pg.connect()
			const query = pgHelpersQuery(client)
			try {
				await query("BEGIN")

				await clearUserQueue(client)(userId)

				const songs = await query({
					sql: SELECT_ARTIST_SONGS,
					parse: parseTable<Song>(),
					variables: [{
						key: "artistId",
						value: args.artistId,
					},{
						string: false,
						key: "orderByField",
						value: "songs.title",
					},{
						value: "ASC",
						string: false,
						key: "orderByDirection",
					},{
						string: false,
						key: "columnNames",
						value: join(COLUMN_NAMES.SONG, "songs"),
					}],
				})

				const [ current, ...shuffled ] = shuffle(songs)

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

				await Promise.all(shuffled.map(
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

interface Args {
	artistId: string,
}