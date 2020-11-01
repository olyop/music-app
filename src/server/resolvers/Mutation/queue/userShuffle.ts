import shuffle from "lodash/shuffle"
import { PAGINATION_NUM } from "@oly_op/music-app-common/globals"

import {
	sqlJoin,
	sqlQuery,
	parseSqlRow,
	parseSqlTable,
	createResolver,
} from "../../../helpers"

import {
	SELECT_USER,
	SELECT_USER_SONGS,
	INSERT_USER_QUEUE,
	UPDATE_USER_CURRENT,
} from "../../../sql"

import { pg } from "../../../services"
import clearUserQueue from "./clearUserQueue"
import { COLUMN_NAMES } from "../../../globals"
import { Song, User, UserArgs } from "../../../types"

const resolver =
	createResolver()

export const userShuffleLibrary =
	resolver<User, UserArgs>(
		async ({ args }) => {
			let returnValue: User
			const client = await pg.connect()
			const query = sqlQuery(client)

			try {
				await query("BEGIN")

				await clearUserQueue(client)(args.userId)

				const songs = await query({
					sql: SELECT_USER_SONGS,
					parse: parseSqlTable<Song>(),
					variables: [{
						value: 0,
						key: "page",
						string: false,
					},{
						key: "userId",
						value: args.userId,
					},{
						string: false,
						key: "paginationNum",
						value: PAGINATION_NUM,
					},{
						string: false,
						value: "title",
						key: "orderByField",
					},{
						value: "ASC",
						string: false,
						key: "orderByDirection",
					},{
						string: false,
						value: "songs",
						key: "orderByTableName",
					},{
						string: false,
						key: "columnNames",
						value: sqlJoin(COLUMN_NAMES.SONG, "songs"),
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

				returnValue = await query<User>({
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