import { Play, User, Song } from "../types"
import { sql, createResolver } from "../helpers"
import { SELECT_USER, SELECT_SONG } from "../sql"

const resolver =
	createResolver<Play>()

export const dateCreated =
	resolver<number>(({ parent }) => parent.dateCreated * 1000)

export const user =
	resolver<User>(
		({ parent }) => (
			sqlPoolQuery({
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
		({ parent }) => (
			sqlPoolQuery({
				sql: SELECT_SONG,
				parse: parseSqlRow(),
				variables: [{
					key: "songId",
					value: parent.songId,
				}],
			})
		),
	)