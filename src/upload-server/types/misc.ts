import { Pool, PoolClient, QueryResult } from "pg"

export type PGClient = Pool | PoolClient

export type SqlQueryRes<T = Record<string, unknown>> = QueryResult<T>

export type SqlParse<T> = (res: SqlQueryRes) => T

export interface UserQueue {
	index: number,
	userId: string,
	songId: string,
}

export interface UserQueues {
	prev: UserQueue[],
	next: UserQueue[],
	later: UserQueue[],
	current: string | null,
}

export interface OrderBy {
	field: string,
	direction: string,
}

export interface DocsOrderBy<T> {
	id: string,
	orderBy?: OrderBy,
	parse: SqlParse<T>,
}

export type ImgDim = [
	number,
	number,
]