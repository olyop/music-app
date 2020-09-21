import { Pool, PoolClient, QueryResult } from "pg"

import {
	UserBase,
	PlayBase,
	SongBase,
	AlbumBase,
	GenreBase,
	ArtistBase,
	UserDocBase,
	PlaylistBase,
} from "@oly_op/music-app-types"

export enum ImgSizeEnum {
	MINI = "MINI",
	HALF = "HALF",
	FULL = "FULL",
}

export enum ImgFormat {
	JPG = "JPG",
	MP3 = "MP3",
}

export type SQLVariable = {
	key: string,
	string?: boolean,
	value: string | number,
	parameterized?: boolean,
}

export type SQLQueryRes<T = Record<string, unknown>> = QueryResult<T>

export type SQLParse<T> = (res: SQLQueryRes) => T

export type SQLConfig<Return> = {
	sql: string,
	log?: boolean,
	parse?: SQLParse<Return>,
	variables?: SQLVariable[],
}

export type S3Upload = {
	key: string,
	data: Buffer,
}

export type Client = Pool | PoolClient

export type ImgDim = [
	number,
	number,
]

export type UserArgs = {
	userId: string,
}

export interface User extends UserBase {
	current: string,
}

export type UserDoc = UserDocBase

export interface Play extends PlayBase {
	playId: string,
	userId: string,
	songId: string,
}

export interface Song extends UserDocBase, SongBase {
	albumId: string,
}

export interface Playlist extends UserDocBase, PlaylistBase {
	userId: string,
}

export interface Album extends UserDocBase, AlbumBase {
	released: Date,
}

export interface Genre extends UserDocBase, GenreBase {}

export interface Artist extends UserDocBase, ArtistBase {}

export interface Queue {
	prev: Song[],
	next: Song[],
	current: Song,
	queue: Song[],
}

export interface AddRemoveInput {
	query: string,
	docId: string,
	userId: string,
	columnName: string,
	columnNames: string[],
	userTableName: string,
}

export interface OrderBy {
	field: string,
	direction: string,
}

export interface OrderByArgs {
	orderBy: OrderBy,
}

export interface PageArgs {
	page: number,
}

export interface DocsArgs extends PageArgs, OrderByArgs {}

export interface DocsOrderBy<T> {
	id: string,
	orderBy?: OrderBy,
	parse: SQLParse<T>,
}

export type Search = Song | Genre | Album | Artist