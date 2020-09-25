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
} from "@oly_op/music-app-common/types"

export interface SqlVariable {
	key: string,
	string?: boolean,
	parameterized?: boolean,
	value: string | number | boolean,
}

export type SqlQueryRes<T = Record<string, unknown>> = QueryResult<T>

export type SqlParse<T> = (res: SqlQueryRes) => T

export interface SqlConfig<Return> {
	sql: string,
	log?: boolean,
	parse?: SqlParse<Return>,
	variables?: SqlVariable[],
}

export interface S3Upload {
	key: string,
	data: Buffer,
}

export enum S3FileType {
	MINI = "MINI",
	HALF = "HALF",
	FULL = "FULL",
}

export interface S3FileArgs {
	size: S3FileType,
}

export enum S3FileExt {
	JPG = "JPG",
	MP3 = "MP3",
}

export type Client = Pool | PoolClient

export type ImgDim = [
	number,
	number,
]

export interface UserArgs {
	userId: string,
}

export interface User extends UserBase {
	current: string | null,
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

export interface UserQueue {
	index: number,
	userId: string,
	songId: string,
}

export interface OrderBy {
	field: string,
	direction: string,
}

export interface OrderByArgs {
	orderBy: OrderBy,
}

export interface UserQueuesArgs extends UserArgs {
	songId: string,
}

export interface DocsOrderBy<T> {
	id: string,
	orderBy?: OrderBy,
	parse: SqlParse<T>,
}

export type Search = Song | Genre | Album | Artist