import { OrderBy, SqlParse } from "./misc"

export interface SqlVariable {
	key: string,
	string?: boolean,
	parameterized?: boolean,
	value: string | number | boolean | null,
}

export interface SqlQueryInput<Return> {
	sql: string,
	logSql?: boolean,
	logVar?: boolean,
	logRes?: boolean,
	parse?: SqlParse<Return>,
	variables?: SqlVariable[],
}

export interface S3UploadObjectInput {
	key: string,
	data: Buffer,
}

export interface SqlSearchInput {
	query: string,
	exact: boolean,
	tableName: string,
	columnName: string,
	columnNames: string[],
}

export interface SqlExistsInput {
	table: string,
	column: string,
	value: string | string[],
}

export interface GetUserDocInput {
	docId: string,
	userId: string,
	columnName: string,
	userDocTable: string,
}

export interface GetUserDocsInput {
	page: number,
	userId: string,
	orderBy: OrderBy,
	tableName: string,
	columnName: string,
	columnNames: string[],
	userTableName: string,
}