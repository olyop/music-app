import { SELECT_SEARCH } from "../../sql"
import { COLUMN_NAMES } from "../../globals"
import { Artist, Album, Genre } from "../../types"
import { sql, createResolver } from "../../helpers"

interface DocSearchOptions {
	query: string,
	exact: boolean,
	tableName: string,
	columnName: string,
	columnNames: string[],
}

const docSearch =
	<T>({ query, exact, tableName, columnName, columnNames }: DocSearchOptions) =>
		sql.query({
			sql: SELECT_SEARCH,
			parse: sql.parseTable<T>(),
			variables: [{
				string: false,
				key: "tableName",
				value: tableName,
			},{
				string: false,
				key: "sqlSearchType",
				value: exact ? "=" : "LIKE",
			},{
				string: false,
				key: "columnNames",
				value: sql.join(columnNames),
			},{
				string: false,
				key: "columnName",
				value: exact ? columnName : `lower(${columnName})`,
			},{
				key: "query",
				parameterized: true,
				value: exact ? query : `%${query.toLowerCase()}%`,
			}],
		})

interface Args {
	query: string,
	exact: boolean,
}

const resolver =
	createResolver()

export const artistSearch =
	resolver<Artist[], Args>(
		({ args }) => (
			docSearch({
				...args,
				columnName: "name",
				tableName: "artists",
				columnNames: COLUMN_NAMES.ARTIST,
			})
		),
	)

export const albumSearch =
	resolver<Album[], Args>(
		({ args }) => (
			docSearch({
				...args,
				tableName: "albums",
				columnName: "title",
				columnNames: COLUMN_NAMES.ALBUM,
			})
		),
	)

export const genreSearch =
	resolver<Genre[], Args>(
		({ args }) => (
			docSearch({
				...args,
				columnName: "name",
				tableName: "genres",
				columnNames: COLUMN_NAMES.GENRE,
			})
		),
	)