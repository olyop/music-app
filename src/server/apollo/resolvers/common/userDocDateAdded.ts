import { sql } from "../../../helpers"
import { UserDoc } from "../../../types"
import { SELECT_USER_DOC_ADDED } from "../../../sql"

interface Input {
	docId: string,
	userId: string,
	columnName: string,
	userDocTable: string,
}

export const userDocDateAdded =
	<T extends UserDoc>({ docId, userId, columnName, userDocTable }: Input) =>
		sql.query<number>({
			sql: SELECT_USER_DOC_ADDED,
			parse: res => sql.parseRow<T>()(res).dateAdded,
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