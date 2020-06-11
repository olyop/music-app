import { head, identity } from "lodash"

import {
	pipe,
	sqlJoin,
	sqlQuery,
	resolver,
	sqlParseTable,
} from "../../../helpers"

import { SELECT_SEARCH } from "../../../sql"
import { COLUMN_NAMES } from "../../../globals"

export const docSearch =
	(tableName: string, docName: string, columnName: string, exact: boolean) =>
		(query: string) =>
			resolver(
				async () => (
					sqlQuery({
						sql: SELECT_SEARCH,
						parse: pipe(sqlParseTable, exact ? head : identity),
						variables: [{
							string: false,
							key: "tableName",
							value: tableName,
						},{
							string: false,
							key: "columnName",
							value: columnName,
						},{
							key: "query",
							parameterized: true,
							value: `%${query.toLowerCase()}%`,
						},{
							string: false,
							key: "columnNames",
							value: sqlJoin(COLUMN_NAMES[docName]),
						}],
					})
				),
			)