import { PAGINATION_NUM } from "@oly_op/music-app-common/globals"

import {
	User,
	Song,
	Play,
	Album,
	Genre,
	Artist,
	Playlist,
	OrderByArgs,
} from "../../types"

import {
	SELECT_USER,
	SELECT_SONG,
	SELECT_PLAY,
	SELECT_ALBUM,
	SELECT_GENRE,
	SELECT_SONGS,
	SELECT_GENRES,
	SELECT_ALBUMS,
	SELECT_ARTIST,
	SELECT_ARTISTS,
	SELECT_PLAYLIST,
	SELECT_PLAYLISTS,
} from "../../sql"

import { COLUMN_NAMES } from "../../globals"
import { sql, songOrderByField, createResolver } from "../../helpers"

const resolver =
	createResolver()

export const genres =
	resolver<Genre[]>(
		() => (
			sql.query({
				sql: SELECT_GENRES,
				parse: sql.parseTable(),
				variables: [{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.GENRE),
				}],
			})
		),
	)

export interface DocsArgs extends OrderByArgs {
	page: number,
}

export const songs =
	resolver<Song[], DocsArgs>(
		({ args }) => (
			sql.query({
				sql: SELECT_SONGS,
				parse: sql.parseTable(),
				variables: [{
					string: false,
					key: "paginationNum",
					value: PAGINATION_NUM,
				},{
					string: false,
					key: "orderByDirection",
					value: args.orderBy.direction,
				},{
					key: "offset",
					string: false,
					value: args.page * PAGINATION_NUM,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.SONG, "songs"),
				},{
					string: false,
					key: "orderByField",
					value: songOrderByField(args.orderBy.field.toLowerCase()),
				}],
			})
		),
	)

export const albums =
	resolver<Album[], DocsArgs>(
		({ args }) => (
			sql.query({
				sql: SELECT_ALBUMS,
				parse: sql.parseTable(),
				variables: [{
					string: false,
					key: "paginationNum",
					value: PAGINATION_NUM,
				},{
					key: "offset",
					string: false,
					value: args.page * PAGINATION_NUM,
				},{
					string: false,
					key: "orderByField",
					value: args.orderBy.field,
				},{
					string: false,
					key: "orderByDirection",
					value: args.orderBy.direction,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.ALBUM),
				}],
			})
		),
	)

export const artists =
	resolver<Artist[], DocsArgs>(
		({ args }) => (
			sql.query({
				sql: SELECT_ARTISTS,
				parse: sql.parseTable(),
				variables: [{
					string: false,
					key: "paginationNum",
					value: PAGINATION_NUM,
				},{
					key: "offset",
					string: false,
					value: args.page * PAGINATION_NUM,
				},{
					string: false,
					key: "orderByField",
					value: args.orderBy.field,
				},{
					string: false,
					key: "orderByDirection",
					value: args.orderBy.direction,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.ARTIST),
				}],
			})
		),
	)

export const playlists =
	resolver<Playlist[]>(
		() => (
			sql.query({
				sql: SELECT_PLAYLISTS,
				parse: sql.parseTable(),
				variables: [{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.PLAYLIST),
				}],
			})
		),
	)

export const user =
	resolver<User, { userId: string }>(
		({ args }) => (
			sql.query({
				sql: SELECT_USER,
				parse: sql.parseRow(),
				variables: [{
					key: "userId",
					value: args.userId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.USER),
				}],
			})
		),
	)

export const play =
	resolver<Play, { playId: string }>(
		({ args }) => (
			sql.query({
				sql: SELECT_PLAY,
				parse: sql.parseRow(),
				variables: [{
					key: "playId",
					value: args.playId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.PLAY),
				}],
			})
		),
	)

export const album =
	resolver<Album, { albumId: string }>(
		({ args }) => (
			sql.query({
				sql: SELECT_ALBUM,
				parse: sql.parseRow(),
				variables: [{
					key: "albumId",
					value: args.albumId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.ALBUM),
				}],
			})
		),
	)

export const genre =
	resolver<Genre, { genreId: string }>(
		({ args }) => (
			sql.query({
				sql: SELECT_GENRE,
				parse: sql.parseRow(),
				variables: [{
					key: "genreId",
					value: args.genreId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.GENRE),
				}],
			})
		),
	)

export const artist =
	resolver<Artist, { artistId: string }>(
		({ args }) => (
			sql.query({
				sql: SELECT_ARTIST,
				parse: sql.parseRow(),
				variables: [{
					key: "artistId",
					value: args.artistId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.ARTIST),
				}],
			})
		),
	)

export const playlist =
	resolver<Playlist, { playlistId: string }>(
		({ args }) => (
			sql.query({
				sql: SELECT_PLAYLIST,
				parse: sql.parseRow(),
				variables: [{
					key: "playlistId",
					value: args.playlistId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.PLAYLIST),
				}],
			})
		),
	)

export const song =
	resolver<Song, { songId: string }>(
		({ args }) => (
			sql.query({
				sql: SELECT_SONG,
				parse: sql.parseRow(),
				variables: [{
					key: "songId",
					value: args.songId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.SONG),
				}],
			})
		),
	)