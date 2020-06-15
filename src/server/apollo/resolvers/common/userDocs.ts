import { sql } from "../../../helpers"
import { COLUMN_NAMES } from "../../../globals"
import { SELECT_USER_DOCS } from "../../../sql"

export const userDocs = ({ key, tableName, columnName, userTableName }) =>
	sql.query({
		sql: SELECT_USER_DOCS,
		parse: sql.parseTable,
		variables: [{
			key: "tableName",
			value: tableName,
		},{
			key: "columnName",
			value: columnName,
		},{
			key: "userTableName",
			value: userTableName,
		},{
			key: "userId",
			value: parent.userId,
		},{
			string: false,
			key: "columnNames",
			value: sqlJoin(COLUMN_NAMES[key]),
		}],
	})