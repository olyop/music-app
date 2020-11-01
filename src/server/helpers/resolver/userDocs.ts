import { PAGINATION_NUM } from "@oly_op/music-app-common/globals"

import {
	PGClient,
	GetUserDocInput,
	GetUserDocsInput,
} from "../../types"

import {
	SELECT_USER_DOCS,
	SELECT_USER_DOC_ADDED,
	SELECT_USER_DOC_IN_LIB,
} from "../../sql"

import { sqlJoin } from "../sql/sqlJoin"
import { sqlQuery } from "../sql/sqlQuery"
import { parseSqlTable } from "../sql/parseSqlTable"
import { getSqlResExists } from "../sql/getSqlResExists"
import { parseSqlUnixField } from "../sql/parseSqlUnixField"

export const getUserDocInLib =
	(client: PGClient) => ({
		docId,
		userId,
		columnName,
		userDocTable,
	}: GetUserDocInput) =>
		sqlQuery(client)<boolean>({
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
		sqlQuery(client)<number | null>({
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

export const getUserDocs =
	(client: PGClient) => <T>({
		page,
		userId,
		orderBy,
		tableName,
		columnName,
		columnNames,
		userTableName,
	}: GetUserDocsInput) =>
		sqlQuery(client)<T[]>({
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