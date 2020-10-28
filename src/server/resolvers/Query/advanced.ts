import { Song, Album } from "../../types"
import { SELECT_NEW_ALBUMS, SELECT_TOP_TEN_SONGS } from "../../sql"
import { sqlPoolQuery, parseSqlTable, createResolver } from "../../helpers"

const resolver =
	createResolver()

export const newAlbums =
	resolver<Album[]>(
		() => (
			sqlPoolQuery({
				sql: SELECT_NEW_ALBUMS,
				parse: parseSqlTable(),
			})
		),
	)

export const topTenSongs =
	resolver<Song[]>(
		() => (
			sqlPoolQuery({
				sql: SELECT_TOP_TEN_SONGS,
				parse: parseSqlTable(),
			})
		),
	)