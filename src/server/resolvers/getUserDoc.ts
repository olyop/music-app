import {
	SELECT_USER_DOC_ADDED,
	SELECT_USER_DOC_IN_LIB,
} from "../sql"

import { sql } from "../helpers"

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
	({ docId, userId, columnName, userDocTable }: Input) =>
		sql.query<number | null>({
			sql: SELECT_USER_DOC_ADDED,
			parse: sql.parseUnixField,
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