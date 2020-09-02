import { camelCase } from "lodash"

import {
	EXISTS_USER_DOC,
	INSERT_USER_DOC,
	UPDATE_USER_DOC_IN_LIB,
} from "../../sql"

import { sql } from "../../helpers"
import { SQLVariable, AddRemoveInput } from "../../types"

export const addUserDoc = async <T>({
	query,
	docId,
	userId,
	columnName,
	columnNames,
	userTableName,
}: AddRemoveInput) => {
	const variables: SQLVariable[] = [{
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
			parse: sql.parseRow(),
			variables,
		})

	const insertUserDoc =
		sql.query({
			sql: INSERT_USER_DOC,
			variables: [
				...variables,
				{
					string: false,
					key: "dateAdded",
					value: Math.floor(Date.now() / 1000),
				},
			],
		})

	const actionQuery =
		doesUserDocExist ? updateUserDocInLib : insertUserDoc

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

	const [ result ] = await Promise.all([ returnQuery, actionQuery ])

	return result
}