import { sql } from "../../../helpers"
import { SELECT_USER_DOCS } from "../../../sql"

type Input = {
	userId: string,
	tableName: string,
	columnName: string,
	columnNames: string[],
	userTableName: string,
}

export const userDocs = <T>({
	userId,
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
			key: "columnNames",
			value: sql.join(columnNames, "songs"),
		}],
	})