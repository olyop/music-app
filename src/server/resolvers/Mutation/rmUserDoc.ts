import { camelCase } from "lodash"

import { sql } from "../../helpers"
import { AddRemoveInput } from "../../types"
import { UPDATE_USER_DOC_IN_LIB } from "../../sql"

export const rmUserDoc = async <T>({
	query,
	docId,
	userId,
	columnName,
	columnNames,
	userTableName,
}: AddRemoveInput) => {
	await sql.query({
		sql: UPDATE_USER_DOC_IN_LIB,
		variables: [{
			key: "docId",
			value: docId,
		},{
			key: "userId",
			value: userId,
		},{
			string: false,
			key: "columnName",
			value: columnName,
		},{
			string: false,
			key: "tableName",
			value: userTableName,
		}],
	})

	const returnQuery =
		sql.query<T>({
			sql: query,
			parse: sql.parseRow(),
			variables: [{
				value: docId,
				key: camelCase(columnName),
			},{
				string: false,
				key: "columnNames",
				value: sql.join(columnNames),
			}],
		})

	const result = await returnQuery

	return result
}