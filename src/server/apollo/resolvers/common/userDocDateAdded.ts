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
			parse: res => sql.parseRow<T>(res).dateCreated,
			variables: [{
				key: "userId",
				value: userId,
			},{
				key: "docId",
				value: docId,
			},{
				key: "columnName",
				value: columnName,
			},{
				key: "tableName",
				value: userDocTable,
			}],
		})