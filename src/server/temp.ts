import { PAGINATION_NUM } from "@oly_op/music-app-common/globals"

import { Song } from "./types"
import { SELECT_SONGS } from "./sql"
import { COLUMN_NAMES } from "./globals"
import { sqlJoin, parseSqlTable, sqlPoolQuery } from "./helpers"

export default async () => {
	console.log(await sqlPoolQuery<Song[]>({
		sql: SELECT_SONGS,
		parse: parseSqlTable(),
		variables: [{
			value: 0,
			key: "page",
			string: false,
		},{
			string: false,
			value: "title",
			key: "orderByField",
		},{
			value: "asc",
			string: false,
			key: "orderByDirection",
		},{
			string: false,
			key: "paginationNum",
			value: PAGINATION_NUM,
		},{
			string: false,
			key: "columnNames",
			value: sqlJoin(COLUMN_NAMES.SONG, "songs"),
		}],
	}))
}