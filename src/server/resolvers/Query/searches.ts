import { orderBy } from "lodash"

import {
	sqlJoin,
	sqlQuery,
	sqlSearch,
	parseSqlTable,
	createResolver,
} from "../../helpers"

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
		async ({ args, context }) => (
			orderBy(
				(await Promise.all([
					sqlQuery(context.pg)({
						sql: SELECT_DOC_TEXT_SEARCH,
						parse: parseSqlTable<Song>(),
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
					sqlQuery(context.pg)({
						sql: SELECT_DOC_TEXT_SEARCH,
						parse: parseSqlTable<Genre>(),
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
					sqlQuery(context.pg)({
						sql: SELECT_DOC_TEXT_SEARCH,
						parse: parseSqlTable<Album>(),
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
					sqlQuery(context.pg)({
						sql: SELECT_DOC_TEXT_SEARCH,
						parse: parseSqlTable<Artist>(),
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
		({ args, context }) => (
			sqlSearch(context.pg)({
				...args,
				columnName: "name",
				tableName: "artists",
				columnNames: COLUMN_NAMES.ARTIST,
			})
		),
	)

export const albumSearch =
	resolver<Album[], DocSearchArgs>(
		({ args, context }) => (
			sqlSearch(context.pg)({
				...args,
				tableName: "albums",
				columnName: "title",
				columnNames: COLUMN_NAMES.ALBUM,
			})
		),
	)

export const genreSearch =
	resolver<Genre[], DocSearchArgs>(
		({ args, context }) => (
			sqlSearch(context.pg)({
				...args,
				columnName: "name",
				tableName: "genres",
				columnNames: COLUMN_NAMES.GENRE,
			})
		),
	)

export const songSearch =
	resolver<Song[], DocSearchArgs>(
		({ args, context }) => (
			sqlSearch(context.pg)({
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
			return Promise.resolve([])
		},
	)