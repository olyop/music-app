import { query, parseRow } from "@oly_op/pg-helpers"

import { createResolver } from "../helpers"
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
			query(context.pg)({
				sql: SELECT_USER,
				parse: parseRow(),
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
			query(context.pg)({
				sql: SELECT_SONG,
				parse: parseRow(),
				variables: [{
					key: "songId",
					value: parent.songId,
				}],
			})
		),
	)