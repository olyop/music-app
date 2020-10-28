import { Pool, PoolClient } from "pg"

export type Client = Pool | PoolClient

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