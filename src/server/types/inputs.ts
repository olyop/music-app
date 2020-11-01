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

export interface SqlIsUniqueInput {
	value: string,
	table: string,
	column: string,
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

export interface GetUserQueueInput {
	userId: string,
	tableName: string,
}

export interface AddRemoveInput {
	docId: string,
	userId: string,
	columnName: string,
	returnQuery: string,
	columnNames: string[],
	userTableName: string,
}

export interface GetS3ObjectInput<T> {
	key: string,
	parse: (res: Buffer) => T,
}

export interface S3UploadObjectInput {
	key: string,
	data: Buffer,
}