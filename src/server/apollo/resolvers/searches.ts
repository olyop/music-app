import { SELECT_SEARCH } from "../../sql"
import { Artist, Genre } from "../../types"
import { COLUMN_NAMES } from "../../globals"
import { sql, createResolver } from "../../helpers"

interface DocSearchOptions {
	query: string,
	tableName: string,
	columnName: string,
	columnNames: string[],
}

const docSearch =
	<T>({ query, tableName, columnName, columnNames }: DocSearchOptions) =>
		sql.query({
			sql: SELECT_SEARCH,
			parse: sql.parseTable<T>(),
			variables: [{
				string: false,
				key: "tableName",
				value: tableName,
			},{
				string: false,
				key: "columnName",
				value: columnName,
			},{
				string: false,
				key: "columnNames",
				value: sql.join(columnNames),
			},{
				key: "query",
				parameterized: true,
				value: `%${query.toLowerCase()}%`,
			}],
		})

interface Args {
	query: string,
}

const resolver =
	createResolver()

export const artistSearch =
	resolver<Artist[], Args>(
		({ args }) => (
			docSearch({
				query: args.query,
				columnName: "name",
				tableName: "artists",
				columnNames: COLUMN_NAMES.ARTIST,
			})
		),
	)

export const genreSearch =
	resolver<Genre[], Args>(
		({ args }) => (
			docSearch({
				query: args.query,
				columnName: "name",
				tableName: "genres",
				columnNames: COLUMN_NAMES.GENRE,
			})
		),
	)