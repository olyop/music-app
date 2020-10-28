import { PAGINATION_NUM } from "@oly_op/music-app-common/globals"

import { query } from "../sql/query"
import { OrderBy } from "../../types"
import { SELECT_USER_DOCS } from "../../sql"

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