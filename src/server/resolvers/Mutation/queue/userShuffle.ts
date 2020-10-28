import shuffle from "lodash/shuffle"

import {
	SELECT_USER,
	INSERT_USER_QUEUE,
	UPDATE_USER_CURRENT,
} from "../../../sql"

import { pg } from "../../../services"
import clearUserQueue from "./clearUserQueue"
import { COLUMN_NAMES } from "../../../globals"
import { Song, User, UserArgs } from "../../../types"
import { sql, getUserDocs, createResolver } from "../../../helpers"

const resolver =
	createResolver()

export const userShuffleLibrary =
	resolver<User, UserArgs>(
		async ({ args }) => {
			let returnValue: User
			const client = await pg.connect()
			const query = sql.baseQuery(client)

			try {
				await query("BEGIN")

				await clearUserQueue(client)(args.userId)

				const songs = await getUserDocs<Song>({
					page: 0,
					tableName: "songs",
					userId: args.userId,
					columnName: "song_id",
					userTableName: "users_songs",
					columnNames: COLUMN_NAMES.SONG,
					orderBy: { field: "title", direction: "asc" },
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

				returnValue = await sqlPoolQuery<User>({
					sql: SELECT_USER,
					parse: parseSqlRow(),
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