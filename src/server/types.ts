import { QueryResult } from "pg"

export enum ImgSizeEnum {
	MINI,
	HALF,
	FULL,
}

export enum ImgFormat {
	JPG,
	MP3,
}

export type Song = {
	title: string,
}

export type Queue = {
	prev: Song[],
	next: Song[],
	queue: Song[],
	current: Song[],
}

export type SQLVariable = {
	key: string,
	value: string,
	string?: boolean,
	parameterized?: boolean,
}

export type SQLConfig<TReturn> = {
	sql: string,
	variables?: SQLVariable[],
	parse: (res: QueryResult) => TReturn,
}

export type ImgDim = [number, number]