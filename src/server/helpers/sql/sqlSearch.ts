import { sqlJoin } from "./sqlJoin"
import { sqlQuery } from "./sqlQuery"
import { SELECT_DOC_SEARCH } from "../../sql"
import { parseSqlTable } from "./parseSqlTable"
import { PGClient, SqlSearchInput } from "../../types"

export const sqlSearch =
	(client: PGClient) => <T>({
		query,
		exact,
		tableName,
		columnName,
		columnNames,
	}: SqlSearchInput) =>
		sqlQuery(client)({
			sql: SELECT_DOC_SEARCH,
			parse: parseSqlTable<T>(),
			variables: [{
				string: false,
				key: "tableName",
				value: tableName,
			},{
				key: "limit",
				string: false,
				value: exact ? "1" : "10",
			},{
				string: false,
				key: "columnNames",
				value: sqlJoin(columnNames),
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