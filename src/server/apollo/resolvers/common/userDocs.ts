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
		parse: res => sql.parseTable(res),
		variables: [{
			key: "userId",
			value: userId,
		},{
			key: "tableName",
			value: tableName,
		},{
			key: "columnName",
			value: columnName,
		},{
			key: "userTableName",
			value: userTableName,
		},{
			string: false,
			key: "columnNames",
			value: sql.join(columnNames),
		}],
	})