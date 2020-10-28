import { PAGINATION_NUM } from "@oly_op/music-app-common/globals"

import {
	SELECT_USER_DOCS,
	SELECT_USER_DOC_ADDED,
	SELECT_USER_DOC_IN_LIB,
	SELECT_USER_QUEUE_SONGS,
} from "../../sql"

import { query } from "../sql/query"
import { OrderBy } from "../../types"
import { COLUMN_NAMES } from "../../globals"

interface GetUserDocInput {
	docId: string,
	userId: string,
	columnName: string,
	userDocTable: string,
}

export const getUserDocInLib = ({
	docId,
	userId,
	columnName,
	userDocTable,
}: GetUserDocInput) =>
	query<boolean>({
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

export const getUserDocDateAdded = ({
	docId,
	userId,
	columnName,
	userDocTable,
}: GetUserDocInput) =>
	query<number | null>({
		sql: SELECT_USER_DOC_ADDED,
		parse: sql.parseUnixField,
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

interface GetUserDocsInput {
	page: number,
	userId: string,
	orderBy: OrderBy,
	tableName: string,
	columnName: string,
	columnNames: string[],
	userTableName: string,
}

export const getUserDocs = <T>({
	page,
	userId,
	orderBy,
	tableName,
	columnName,
	columnNames,
	userTableName,
}: GetUserDocsInput) =>
	query<T[]>({
		sql: SELECT_USER_DOCS,
		parse: sql.parseTable(),
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
			value: sql.join(columnNames, tableName),
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
	query({
		sql: SELECT_USER_QUEUE_SONGS,
		parse: sql.parseTable<T>(),
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
			value: sql.join(COLUMN_NAMES.SONG, "songs"),
		}],
	})