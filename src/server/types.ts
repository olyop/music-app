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
	songId: string,
}

export type Play = {
	userId: string,
	playId: string,
}

export type Album = {
	title: string,
	albumId: string,
}

export type Genre = {
	name: string,
	genreId: string,
}

export type User = {
	name: string,
	userId: string,
}

export type Artist = {
	name: string,
	artistId: string,
}

export type Queue = {
	prev: Song[],
	next: Song[],
	queue: Song[],
	current: Song[],
}

export type Playlist = {
	title: string,
	playlistId: string,
}

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