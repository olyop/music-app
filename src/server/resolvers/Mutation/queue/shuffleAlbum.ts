import shuffle from "lodash/shuffle"

import {
	sqlJoin,
	sqlQuery,
	parseSqlRow,
	parseSqlTable,
	createResolver,
} from "../../../helpers"

import {
	SELECT_USER,
	INSERT_USER_QUEUE,
	SELECT_ALBUM_SONGS,
	UPDATE_USER_CURRENT,
} from "../../../sql"

import clearUserQueue from "./clearUserQueue"
import { COLUMN_NAMES } from "../../../globals"
import { User, Song, UserArgs } from "../../../types"

const resolver =
	createResolver()

export const shuffleAlbum =
	resolver<User, Args>(
		async ({ args, context }) => {
			let returnValue: User
			const client = await context.pg.connect()
			const query = sqlQuery(client)
			try {
				await query("BEGIN")

				await clearUserQueue(client)(args.userId)

				const songs = await query({
					sql: SELECT_ALBUM_SONGS,
					parse: parseSqlTable<Song>(),
					variables: [{
						key: "albumId",
						value: args.albumId,
					},{
						string: false,
						key: "columnNames",
						value: sqlJoin(COLUMN_NAMES.SONG),
					}],
				})

				const [ current, ...shuffled ] = shuffle(songs)

				await query({
					sql: UPDATE_USER_CURRENT,
					variables: [{
						key: "userId",
						value: args.userId,
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
								value: args.userId,
							},{
								string: false,
								key: "tableName",
								value: "users_laters",
							}],
						})
					),
				))

				returnValue = await query({
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

				await query("COMMIT")
			} catch (error) {
				await query("ROLLBACK")
				throw error
			} finally {
				client.release()
			}

			return returnValue
		},
	)

interface Args extends UserArgs {
	albumId: string,
}