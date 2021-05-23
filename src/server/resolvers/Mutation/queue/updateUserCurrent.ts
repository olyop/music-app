import {
	join,
	parseRow,
	query as pgQuery,
	exists as pgExists,
} from "@oly_op/pg-helpers"

import { v4 as uuid } from "uuid"
import { UserInputError } from "apollo-server-express"

import {
	INSERT_PLAY,
	UPDATE_USER_CURRENT,
} from "../../../sql"

import { User } from "../../../types"
import { clearUserQueue } from "./helpers"
import { COLUMN_NAMES } from "../../../globals"
import { createResolver } from "../../../helpers"

const resolver =
	createResolver()

export const updateUserCurrent =
	resolver<User, Args>(
		async ({ args, context }) => {
			const { songId } = args
			const query = pgQuery(context.pg)
			const exists = pgExists(context.pg)
			const { userId } = context.authorization!

			const songExists =
				await exists({
					value: songId,
					table: "songs",
					column: "song_id",
				})

			if (!songExists) {
				throw new UserInputError("Song does not exist.")
			}

			await clearUserQueue(context.pg)(userId)

			await query({
				sql: INSERT_PLAY,
				variables: [{
					key: "playId",
					value: uuid(),
				},{
					key: "songId",
					value: songId,
				},{
					key: "userId",
					value: context.authorization!.userId,
				}],
			})

			return query({
				sql: UPDATE_USER_CURRENT,
				parse: parseRow<User>(),
				variables: [{
					key: "songId",
					value: songId,
				},{
					string: false,
					key: "columnNames",
					value: join(COLUMN_NAMES.USER),
				},{
					key: "userId",
					value: context.authorization!.userId,
				}],
			})
		},
	)

interface Args {
	songId: string,
}