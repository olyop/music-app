import { Song, Album } from "../../types"
import { sql, createResolver } from "../../helpers"
import { SELECT_NEW_ALBUMS, SELECT_TOP_TEN_SONGS } from "../../sql"

const resolver =
	createResolver()

export const newAlbums =
	resolver<Album[]>(
		() => (
			sql.query({
				sql: SELECT_NEW_ALBUMS,
				parse: sql.parseTable(),
			})
		),
	)

export const topTenSongs =
	resolver<Song[]>(
		() => (
			sql.query({
				sql: SELECT_TOP_TEN_SONGS,
				parse: sql.parseTable(),
			})
		),
	)