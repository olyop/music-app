import { sql } from "../../../helpers"
import { UserDoc } from "../../../types"
import { SELECT_USER_DOC_ADDED } from "../../../sql"

type TInput = {
	docId: string,
	userId: string,
	columnName: string,
	userDocTable: string,
}

export const userDocDateAdded =
	({ docId, userId, columnName, userDocTable }: TInput) =>
		sql.query<number>({
			sql: SELECT_USER_DOC_ADDED,
			parse: res => sql.parseRow<UserDoc>(res).dateCreated,
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