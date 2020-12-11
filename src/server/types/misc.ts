import { SearchIndex } from "algoliasearch"
import { S3Client } from "@aws-sdk/client-s3"
import { Pool, PoolClient, QueryResult } from "pg"

import { Song, Genre, Album, Artist } from "./docs"

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

export interface SearchResult {
	text: string,
	objectID: string,
	type: "Song" | "Genre" | "Album" | "Artist",
}

export type Search = Song | Genre | Album | Artist

export interface Context {
	pg: Pool,
	s3: S3Client,
	ag: SearchIndex,
}