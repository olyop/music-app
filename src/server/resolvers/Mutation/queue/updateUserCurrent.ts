import { v4 as uuid } from "uuid"

import {
	INSERT_PLAY,
	UPDATE_USER_CURRENT,
} from "../../../sql"

import { COLUMN_NAMES } from "../../../globals"
import { User, UserArgs } from "../../../types"
import { sql, createResolver } from "../../../helpers"

const resolver =
	createResolver()

interface Args extends UserArgs {
	songId: string,
}

export const updateUserCurrent =
	resolver<User, Args>(
		async ({ args }) => (
			(await Promise.all([
				sqlPoolQuery<User>({
					sql: UPDATE_USER_CURRENT,
					parse: parseSqlRow(),
					variables: [{
						key: "songId",
						value: args.songId,
					},{
						key: "userId",
						value: args.userId,
					},{
						string: false,
						key: "columnNames",
						value: sqlJoin(COLUMN_NAMES.USER),
					}],
				}),
				sqlPoolQuery({
					sql: INSERT_PLAY,
					variables: [{
						key: "playId",
						value: uuid(),
					},{
						key: "userId",
						value: args.userId,
					},{
						key: "songId",
						value: args.songId,
					}],
				}),
			]))[0]
		),
	)