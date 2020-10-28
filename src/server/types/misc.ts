import { Pool, PoolClient, QueryResult } from "pg"

import { Song, Genre, Album, Artist } from "./docs"

export type Client = Pool | PoolClient

export type SqlQueryRes<T = Record<string, unknown>> = QueryResult<T>

export type SqlParse<T> = (res: SqlQueryRes) => T

export interface UserQueue {
	index: number,
	userId: string,
	songId: string,
}

export interface Queue {
	prevs: UserQueue[],
	nexts: UserQueue[],
	laters: UserQueue[],
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

export type Search = Song | Genre | Album | Artist