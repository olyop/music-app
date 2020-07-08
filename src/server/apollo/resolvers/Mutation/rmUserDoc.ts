import { sql } from "../../../helpers"
import { DELETE_USER_DOC } from "../../../sql"

interface Input {
	query: string,
	docId: string,
	userId: string,
	columnName: string,
	columnNames: string[],
	userTableName: string,
}

export const rmUserDoc = async <T>({
	query,
	docId,
	userId,
	columnName,
	columnNames,
	userTableName,
}: Input) => {
	const deleteUserDoc =
		sql.query({
			sql: DELETE_USER_DOC,
			parse: sql.parseRow,
			variables: [{
				key: "docId",
				value: docId,
			},{
				key: "userId",
				value: userId,
			},{
				key: "columnKey",
				value: columnName,
			},{
				key: "tableName",
				value: userTableName,
			}],
		})

	const returnQuery =
		sql.query({
			sql: query,
			parse: sql.parseRow,
			variables: [{
				key: "docId",
				value: docId,
			},{
				key: "columnNames",
				value: sql.join(columnNames),
			}],
		})

	const result = await Promise.all([ returnQuery, deleteUserDoc ])

	// @ts-ignore
	return result[0] as T
}