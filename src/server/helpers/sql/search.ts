import { join } from "./join"
import { Client } from "../../types"
import { baseQuery } from "./baseQuery"
import { parseTable } from "./parseTable"
import { SELECT_SEARCH } from "../../sql"

interface SearchInput {
	query: string,
	exact: boolean,
	tableName: string,
	columnName: string,
	columnNames: string[],
}

export const search =
	(client: Client) =>
		<T>({ query, exact, tableName, columnName, columnNames }: SearchInput) =>
			baseQuery(client)({
				sql: SELECT_SEARCH,
				parse: parseTable<T>(),
				variables: [{
					string: false,
					key: "tableName",
					value: tableName,
				},{
					string: false,
					key: "columnNames",
					value: join(columnNames),
				},{
					key: "limit",
					string: false,
					value: exact ? "1" : "10",
				},{
					string: false,
					key: "sqlSearchType",
					value: exact ? "=" : "LIKE",
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