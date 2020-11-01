import { PAGINATION_NUM } from "@oly_op/music-app-common/globals"

import {
	User,
	Song,
	Play,
	Album,
	Genre,
	Artist,
	Playlist,
	DocsArgs,
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
} from "../../sql"

import {
	sqlJoin,
	sqlQuery,
	parseSqlRow,
	parseSqlTable,
	createResolver,
	getSongsOrderByField,
} from "../../helpers"

import { COLUMN_NAMES } from "../../globals"

const resolver =
	createResolver()

export const genres =
	resolver<Genre[], DocsArgs>(
		({ args, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_GENRES,
				parse: parseSqlTable(),
				variables: [{
					key: "page",
					string: false,
					value: args.page,
				},{
					string: false,
					key: "paginationNum",
					value: PAGINATION_NUM,
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
					value: sqlJoin(COLUMN_NAMES.GENRE),
				}],
			})
		),
	)

export const songs =
	resolver<Song[], DocsArgs>(
		({ args, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_SONGS,
				parse: parseSqlTable(),
				variables: [{
					key: "page",
					string: false,
					value: args.page,
				},{
					string: false,
					key: "paginationNum",
					value: PAGINATION_NUM,
				},{
					string: false,
					key: "orderByDirection",
					value: args.orderBy.direction,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.SONG, "songs"),
				},{
					string: false,
					key: "orderByField",
					value: getSongsOrderByField(args.orderBy.field.toLowerCase()),
				}],
			})
		),
	)

export const albums =
	resolver<Album[], DocsArgs>(
		({ args, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_ALBUMS,
				parse: parseSqlTable(),
				variables: [{
					key: "page",
					string: false,
					value: args.page,
				},{
					string: false,
					key: "paginationNum",
					value: PAGINATION_NUM,
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
					value: sqlJoin(COLUMN_NAMES.ALBUM),
				}],
			})
		),
	)

export const artists =
	resolver<Artist[], DocsArgs>(
		({ args, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_ARTISTS,
				parse: parseSqlTable(),
				variables: [{
					key: "page",
					string: false,
					value: args.page,
				},{
					string: false,
					key: "paginationNum",
					value: PAGINATION_NUM,
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
					value: sqlJoin(COLUMN_NAMES.ARTIST),
				}],
			})
		),
	)

export const user =
	resolver<User, { userId: string }>(
		({ args, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_USER,
				parse: parseSqlRow(),
				variables: [{
					key: "userId",
					value: args.userId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.USER),
				}],
			})
		),
	)

export const play =
	resolver<Play, { playId: string }>(
		({ args, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_PLAY,
				parse: parseSqlRow(),
				variables: [{
					key: "playId",
					value: args.playId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.PLAY),
				}],
			})
		),
	)

export const album =
	resolver<Album, { albumId: string }>(
		({ args, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_ALBUM,
				parse: parseSqlRow(),
				variables: [{
					key: "albumId",
					value: args.albumId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.ALBUM),
				}],
			})
		),
	)

export const genre =
	resolver<Genre, { genreId: string }>(
		({ args, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_GENRE,
				parse: parseSqlRow(),
				variables: [{
					key: "genreId",
					value: args.genreId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.GENRE),
				}],
			})
		),
	)

export const artist =
	resolver<Artist, { artistId: string }>(
		({ args, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_ARTIST,
				parse: parseSqlRow(),
				variables: [{
					key: "artistId",
					value: args.artistId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.ARTIST),
				}],
			})
		),
	)

export const playlist =
	resolver<Playlist, { playlistId: string }>(
		({ args, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_PLAYLIST,
				parse: parseSqlRow(),
				variables: [{
					key: "playlistId",
					value: args.playlistId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.PLAYLIST),
				}],
			})
		),
	)

export const song =
	resolver<Song, { songId: string }>(
		({ args, context }) => (
			sqlQuery(context.pg)({
				sql: SELECT_SONG,
				parse: parseSqlRow(),
				variables: [{
					key: "songId",
					value: args.songId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.SONG),
				}],
			})
		),
	)