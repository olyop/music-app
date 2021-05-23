import {
	query,
	Client,
	getResExists,
} from "@oly_op/pg-helpers"

import { GetUserDocInput } from "../../types"
import { parseSqlUnixField } from "./parseSqlUnixField"
import { SELECT_USER_DOC_ADDED, SELECT_USER_DOC_IN_LIB } from "../../sql"

export const getUserDocInLib =
	(client: Client) => ({
		docId,
		userId,
		columnName,
		userDocTable,
	}: GetUserDocInput) =>
		query(client)({
			sql: SELECT_USER_DOC_IN_LIB,
			parse: getResExists,
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
	(client: Client) => ({
		docId,
		userId,
		columnName,
		userDocTable,
	}: GetUserDocInput) =>
		query(client)({
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