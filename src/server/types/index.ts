import { QueryResult } from "pg"

export * from "./docs"
export * from "./enums"

export type SQLVariable = {
	key: string,
	value: string,
	string?: boolean,
	parameterized?: boolean,
}

export type SQLConfig<TReturn = unknown> = {
	sql: string,
	variables?: SQLVariable[],
	parse?: (res: QueryResult) => TReturn,
}

export type S3Upload = {
	key: string,
	data: Buffer,
}

export type Check = {
	name: string,
	check: Promise<boolean>,
}

export type ImgDim = [
	number,
	number,
]

export type UserArgs = {
	userId: string,
}