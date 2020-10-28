import { orderBy } from "lodash"

import {
	sqlJoin,
	sqlSearch,
	sqlPoolQuery,
	parseSqlTable,
	createResolver,
} from "../../helpers"

import { pg } from "../../services"
import { COLUMN_NAMES } from "../../globals"
import { SELECT_DOC_TEXT_SEARCH } from "../../sql"
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
					sqlPoolQuery<Song[]>({
						sql: SELECT_DOC_TEXT_SEARCH,
						parse: parseSqlTable(),
						variables: [{
							string: false,
							value: "songs",
							key: "tableName",
						},{
							value: "title",
							string: false,
							key: "columnName",
						},{
							key: "query",
							value: args.query,
							parameterized: true,
						},{
							string: false,
							key: "columnNames",
							value: sqlJoin(COLUMN_NAMES.SONG),
						}],
					}),
					sqlPoolQuery<Genre[]>({
						sql: SELECT_DOC_TEXT_SEARCH,
						parse: parseSqlTable(),
						variables: [{
							string: false,
							value: "genres",
							key: "tableName",
						},{
							value: "name",
							string: false,
							key: "columnName",
						},{
							key: "query",
							value: args.query,
							parameterized: true,
						},{
							string: false,
							key: "columnNames",
							value: sqlJoin(COLUMN_NAMES.GENRE),
						}],
					}),
					sqlPoolQuery<Album[]>({
						sql: SELECT_DOC_TEXT_SEARCH,
						parse: parseSqlTable(),
						variables: [{
							string: false,
							value: "albums",
							key: "tableName",
						},{
							value: "title",
							string: false,
							key: "columnName",
						},{
							key: "query",
							value: args.query,
							parameterized: true,
						},{
							string: false,
							key: "columnNames",
							value: sqlJoin(COLUMN_NAMES.ALBUM),
						}],
					}),
					sqlPoolQuery<Artist[]>({
						sql: SELECT_DOC_TEXT_SEARCH,
						parse: parseSqlTable(),
						variables: [{
							string: false,
							key: "tableName",
							value: "artists",
						},{
							value: "name",
							string: false,
							key: "columnName",
						},{
							key: "query",
							value: args.query,
							parameterized: true,
						},{
							string: false,
							key: "columnNames",
							value: sqlJoin(COLUMN_NAMES.ARTIST),
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
			sqlSearch(pg)({
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
			sqlSearch(pg)({
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
			sqlSearch(pg)({
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
			sqlSearch(pg)({
				...args,
				tableName: "songs",
				columnName: "title",
				columnNames: COLUMN_NAMES.SONG,
			})
		),
	)

export const testSearch =
	resolver<Search[], SearchArgs>(
		({ args }) => {
			console.log(args.query)
			return []
		},
	)