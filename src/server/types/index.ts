import { Pool, PoolClient, QueryResult } from "pg"

export interface SqlVariable {
	key: string,
	string?: boolean,
	parameterized?: boolean,
	value: string | number | boolean | null,
}

export type SqlQueryRes<T = Record<string, unknown>> = QueryResult<T>

export type SqlParse<T> = (res: SqlQueryRes) => T

export interface SqlQueryConfig<Return> {
	sql: string,
	logSql?: boolean,
	logVar?: boolean,
	logRes?: boolean,
	parse?: SqlParse<Return>,
	variables?: SqlVariable[],
}

export interface S3Upload {
	key: string,
	data: Buffer,
}

export type Client = Pool | PoolClient

export type ImgDim = [
	number,
	number,
]