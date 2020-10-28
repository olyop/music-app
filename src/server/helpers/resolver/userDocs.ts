import { PAGINATION_NUM } from "@oly_op/music-app-common/globals"

import {
	SELECT_USER_DOCS,
	SELECT_USER_DOC_ADDED,
	SELECT_USER_DOC_IN_LIB,
	SELECT_USER_QUEUE_SONGS,
} from "../../sql"

import { sqlJoin } from "../sql/sqlJoin"
import { COLUMN_NAMES } from "../../globals"
import { sqlPoolQuery } from "../sql/sqlPoolQuery"
import { parseSqlTable } from "../sql/parseSqlTable"
import { getSqlResExists } from "../sql/getSqlResExists"
import { parseSqlUnixField } from "../sql/parseSqlUnixField"
import { GetUserDocInput, GetUserDocsInput } from "../../types"

export const getUserDocInLib = ({
	docId,
	userId,
	columnName,
	userDocTable,
}: GetUserDocInput) =>
	sqlPoolQuery<boolean>({
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

export const getUserDocDateAdded = ({
	docId,
	userId,
	columnName,
	userDocTable,
}: GetUserDocInput) =>
	sqlPoolQuery<number | null>({
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

export const getUserDocs = <T>({
	page,
	userId,
	orderBy,
	tableName,
	columnName,
	columnNames,
	userTableName,
}: GetUserDocsInput) =>
	sqlPoolQuery<T[]>({
		sql: SELECT_USER_DOCS,
		parse: parseSqlTable(),
		variables: [{
			key: "userId",
			value: userId,
		},{
			key: "page",
			value: page,
			string: false,
		},{
			string: false,
			key: "tableName",
			value: tableName,
		},{
			string: false,
			key: "columnName",
			value: columnName,
		},{
			string: false,
			key: "userTableName",
			value: userTableName,
		},{
			string: false,
			key: "orderByField",
			value: orderBy.field,
		},{
			string: false,
			key: "paginationNum",
			value: PAGINATION_NUM,
		},{
			string: false,
			key: "orderByDirection",
			value: orderBy.direction,
		},{
			string: false,
			key: "columnNames",
			value: sqlJoin(columnNames, tableName),
		},{
			string: false,
			key: "orderByTableName",
			value: orderBy.field === "DATE_ADDED" ? userTableName : tableName,
		}],
	})

interface UserQueueInput {
	userId: string,
	tableName: string,
}

export const getUserQueue = <T>({
	userId,
	tableName,
}: UserQueueInput) =>
	sqlPoolQuery({
		sql: SELECT_USER_QUEUE_SONGS,
		parse: parseSqlTable<T>(),
		variables: [{
			key: "userId",
			value: userId,
		},{
			string: false,
			key: "tableName",
			value: tableName,
		},{
			string: false,
			key: "columnNames",
			value: sqlJoin(COLUMN_NAMES.SONG, "songs"),
		}],
	})