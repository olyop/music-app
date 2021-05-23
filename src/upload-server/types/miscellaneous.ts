import { Pool } from "pg"
import { SearchIndex } from "algoliasearch"
import { S3Client } from "@aws-sdk/client-s3"

export type ImgDim = [
	number,
	number,
]

export interface Context {
	pg: Pool,
	s3: S3Client,
	ag: SearchIndex,
	authorization: string | null,
}

export interface SearchParams {
	value: string,
}