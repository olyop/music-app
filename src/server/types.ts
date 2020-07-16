import { QueryResult } from "pg"

import {
	UserBase,
	PlayBase,
	SongBase,
	AlbumBase,
	GenreBase,
	ArtistBase,
	UserDocBase,
	PlaylistBase,
} from "@oly_op/music-app-common"

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
	value: string,
	string?: boolean,
	parameterized?: boolean,
}

export type SQLConfig<TReturn = unknown> = {
	sql: string,
	log?: boolean,
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

export interface User extends UserBase {
	current: string,
}

export interface Play extends PlayBase {
	playId: string,
	userId: string,
	songId: string,
}

export type UserDoc = UserDocBase

export interface Song extends UserDoc, SongBase {
	albumId: string,
}

export interface Playlist extends UserDoc, PlaylistBase {
	userId: string,
}

export interface Album extends UserDoc, AlbumBase {}
export interface Genre extends UserDoc, GenreBase {}
export interface Artist extends UserDoc, ArtistBase {}

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