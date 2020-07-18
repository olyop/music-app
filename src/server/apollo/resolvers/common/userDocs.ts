import { sql } from "../../../helpers"
import { OrderBy } from "../../../types"
import { SELECT_USER_DOCS } from "../../../sql"

interface Input {
	userId: string,
	orderBy: OrderBy,
	tableName: string,
	columnName: string,
	columnNames: string[],
	userTableName: string,
}

export const userDocs = <T>({
	userId,
	orderBy,
	tableName,
	columnName,
	columnNames,
	userTableName,
}: Input) =>
	sql.query<T[]>({
		sql: SELECT_USER_DOCS,
		parse: sql.parseTable(),
		variables: [{
			key: "userId",
			value: userId,
		},{
			string: false,
			key: "tableName",
			value: tableName,
		},{
			string: false,
			key: "columnName",
			value: columnName,
		},{
			string: false,
			key: "userTableName",
			value: userTableName,
		},{
			string: false,
			key: "orderByField",
			value: orderBy.field,
		},{
			string: false,
			key: "orderByDirection",
			value: orderBy.direction,
		},{
			string: false,
			key: "orderByTableName",
			value: orderBy.field === "DATE_ADDED" ? userTableName : tableName,
		},{
			string: false,
			key: "columnNames",
			value: sql.join(columnNames, tableName),
		}],
	})