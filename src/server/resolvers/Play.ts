import {
	sqlQuery,
	parseSqlRow,
	createResolver,
} from "../helpers"

import { Play, User, Song } from "../types"
import { SELECT_USER, SELECT_SONG } from "../sql"

const resolver =
	createResolver<Play>()

export const dateCreated =
	resolver<number>(
		({ parent }) => (
			Promise.resolve(parent.dateCreated * 1000)
		),
	)

export const user =
	resolver<User>(
		({ parent, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_USER,
				parse: parseSqlRow(),
				variables: [{
					key: "userId",
					value: parent.userId,
				}],
			})
		),
	)

export const song =
	resolver<Song>(
		({ parent, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_SONG,
				parse: parseSqlRow(),
				variables: [{
					key: "songId",
					value: parent.songId,
				}],
			})
		),
	)