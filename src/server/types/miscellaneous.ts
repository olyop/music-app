import { Pool } from "pg"
import { Parse } from "@oly_op/pg-helpers"
import { SearchIndex } from "algoliasearch"
import { S3Client } from "@aws-sdk/client-s3"
import type { GraphQLResolveInfo } from "graphql"

import { User, Song, Genre, Album, Artist } from "./docs"

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
	parse: Parse<T>,
	orderBy?: OrderBy,
}

export type ImgDim = [
	number,
	number,
]

export type Search = Song | Genre | Album | Artist

export interface Services {
	pg: Pool,
	s3: S3Client,
	ag: SearchIndex,
}

export interface Context extends Services {
	authorization?: User | null,
}

export interface ResolverParameter<P, A> {
	args: A,
	parent: P,
	context: Context,
	info: GraphQLResolveInfo,
}