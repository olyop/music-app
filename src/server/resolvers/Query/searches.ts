import { orderBy } from "lodash"

import {
	SELECT_SONG_SEARCH,
	SELECT_GENRE_SEARCH,
	SELECT_ALBUM_SEARCH,
	SELECT_ARTIST_SEARCH,
} from "../../sql"

import { pg } from "../../services"
import { COLUMN_NAMES } from "../../globals"
import { sql, createResolver } from "../../helpers"
import { Search, Song, Album, Genre, Artist } from "../../types"

const resolver =
	createResolver()

interface SearchArgs {
	query: string,
}

interface DocSearchArgs extends SearchArgs {
	exact: boolean,
}

export const search =
	resolver<Search[], SearchArgs>(
		async ({ args }) => (
			orderBy(
				(await Promise.all([
					sql.query<Song[]>({
						sql: SELECT_SONG_SEARCH,
						parse: sql.parseTable(),
						variables: [{
							key: "query",
							value: args.query,
							parameterized: true,
						},{
							string: false,
							key: "columnNames",
							value: sql.join(COLUMN_NAMES.SONG),
						}],
					}),
					sql.query<Genre[]>({
						sql: SELECT_GENRE_SEARCH,
						parse: sql.parseTable(),
						variables: [{
							key: "query",
							value: args.query,
							parameterized: true,
						},{
							string: false,
							key: "columnNames",
							value: sql.join(COLUMN_NAMES.GENRE),
						}],
					}),
					sql.query<Album[]>({
						sql: SELECT_ALBUM_SEARCH,
						parse: sql.parseTable(),
						variables: [{
							key: "query",
							value: args.query,
							parameterized: true,
						},{
							string: false,
							key: "columnNames",
							value: sql.join(COLUMN_NAMES.ALBUM),
						}],
					}),
					sql.query<Artist[]>({
						sql: SELECT_ARTIST_SEARCH,
						parse: sql.parseTable(),
						variables: [{
							key: "query",
							value: args.query,
							parameterized: true,
						},{
							string: false,
							key: "columnNames",
							value: sql.join(COLUMN_NAMES.ARTIST),
						}],
					}),
				])).flat(),
				["rank", "title", "name"],
				["desc", "asc", "asc"],
			)
		),
	)

export const artistSearch =
	resolver<Artist[], DocSearchArgs>(
		({ args }) => (
			sql.search(pg)({
				...args,
				columnName: "name",
				tableName: "artists",
				columnNames: COLUMN_NAMES.ARTIST,
			})
		),
	)

export const albumSearch =
	resolver<Album[], DocSearchArgs>(
		({ args }) => (
			sql.search(pg)({
				...args,
				tableName: "albums",
				columnName: "title",
				columnNames: COLUMN_NAMES.ALBUM,
			})
		),
	)

export const genreSearch =
	resolver<Genre[], DocSearchArgs>(
		({ args }) => (
			sql.search(pg)({
				...args,
				columnName: "name",
				tableName: "genres",
				columnNames: COLUMN_NAMES.GENRE,
			})
		),
	)

export const songSearch =
	resolver<Song[], DocSearchArgs>(
		({ args }) => (
			sql.search(pg)({
				...args,
				tableName: "songs",
				columnName: "title",
				columnNames: COLUMN_NAMES.SONG,
			})
		),
	)