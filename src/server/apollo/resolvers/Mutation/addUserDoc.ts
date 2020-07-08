import {
	EXISTS_USER_DOC,
	INSERT_USER_DOC,
	UPDATE_USER_DOC_IN_LIB,
} from "../../../sql"

import { sql } from "../../../helpers"
import { SQLVariable } from "../../../types"

interface Input {
	query: string,
	docId: string,
	userId: string,
	columnName: string,
	columnNames: string[],
	userTableName: string,
}

export const addUserDoc = async <T>({
	query,
	docId,
	userId,
	columnName,
	columnNames,
	userTableName,
}: Input) => {
	const variables: SQLVariable[] = [{
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
	}]

	const doesUserDocExist =
		await sql.query({
			sql: EXISTS_USER_DOC,
			parse: sql.resExists,
			variables,
		})

	const updateUserDocInLib =
		sql.query({
			sql: UPDATE_USER_DOC_IN_LIB,
			parse: sql.parseRow,
			variables,
		})

	const insertUserDoc =
		sql.query({
			sql: INSERT_USER_DOC,
			parse: sql.parseRow,
			variables,
		})

	const actionQuery =
		doesUserDocExist ? updateUserDocInLib : insertUserDoc

	const returnQuery =
		sql.query({
			sql: query,
			parse: sql.parseRow,
			variables: [{
				key: "docId",
				value: docId,
			}, {
				key: "columnNames",
				value: sql.join(columnNames),
			}],
		})

	const result = await Promise.all([ returnQuery, actionQuery ])

	// @ts-ignore
	return result[0] as T
}