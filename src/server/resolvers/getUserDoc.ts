import {
	SELECT_USER_DOC_ADDED,
	SELECT_USER_DOC_IN_LIB,
} from "../sql"

import { sql } from "../helpers"
import { UserDoc } from "../types"

interface Input {
	docId: string,
	userId: string,
	columnName: string,
	userDocTable: string,
}

export const getUserDocInLib =
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

export const getUserDocDateAdded =
	<T extends UserDoc>({ docId, userId, columnName, userDocTable }: Input) =>
		sql.query<number | null>({
			sql: SELECT_USER_DOC_ADDED,
			parse: res => {
				if (res.rowCount === 0) {
					return null
				} else {
					const doc = sql.parseRow<T>()(res)
					return doc.dateAdded * 1000
				}
			},
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