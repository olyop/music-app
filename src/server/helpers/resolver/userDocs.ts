import { sqlQuery } from "../sql/sqlQuery"
import { PGClient, GetUserDocInput } from "../../types"
import { getSqlResExists } from "../sql/getSqlResExists"
import { parseSqlUnixField } from "../sql/parseSqlUnixField"
import { SELECT_USER_DOC_ADDED, SELECT_USER_DOC_IN_LIB } from "../../sql"

export const getUserDocInLib =
	(client: PGClient) => ({
		docId,
		userId,
		columnName,
		userDocTable,
	}: GetUserDocInput) =>
		sqlQuery(client)({
			sql: SELECT_USER_DOC_IN_LIB,
			parse: getSqlResExists,
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
	(client: PGClient) => ({
		docId,
		userId,
		columnName,
		userDocTable,
	}: GetUserDocInput) =>
		sqlQuery(client)({
			sql: SELECT_USER_DOC_ADDED,
			parse: parseSqlUnixField,
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
				value: userDocTable,
			}],
		})