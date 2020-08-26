import pipe from "@oly_op/pipe"

import {
	SELECT_NEW_ALBUMS,
	SELECT_TOP_TEN_SONGS,
	ADMIN_SHOW_TIME_ZONE,
} from "../../sql"

import { Song, Album } from "../../types"
import { sql, createResolver } from "../../helpers"

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

interface TimeZoneRow {
	timeZone: string,
}

export const serverTimeZone =
	resolver<string>(
		() => (
			sql.query({
				sql: ADMIN_SHOW_TIME_ZONE,
				parse: res => pipe(
					sql.parseRow<TimeZoneRow>(),
					({ timeZone }) => timeZone,
				)(res),
			})
		),
	)