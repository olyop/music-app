import { sql } from "../../helpers"
import { SELECT_USER_DOC_IN_LIB } from "../../sql"

interface Input {
	docId: string,
	userId: string,
	columnName: string,
	userDocTable: string,
}

export const userDocInLib =
	({ docId, userId, columnName, userDocTable }: Input) =>
		sql.query<boolean>({
			sql: SELECT_USER_DOC_IN_LIB,
			parse: sql.resExists,
			variables: [{
				key: "userId",
				value: userId,
			},{
				key: "docId",
				value: docId,
			},{
				string: false,
				key: "columnName",
				value: columnName,
			},{
				string: false,
				key: "tableName",
				value: userDocTable,
			}],
		})