import {
	join,
	query,
	parseRow,
	parseTable,
} from "@oly_op/pg-helpers"

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
	SELECT_PLAYLISTS,
} from "../../sql"

import { COLUMN_NAMES } from "../../globals"
import { createResolver, getSongsOrderByField } from "../../helpers"

const resolver =
	createResolver()

export const genres =
	resolver<Genre[], DocsArgs>(
		async ({ args, context }) => (
			query(context.pg)({
				sql: SELECT_GENRES,
				parse: parseTable(),
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
					key: "columnNames",
					value: join(COLUMN_NAMES.GENRE),
				},{
					string: false,
					key: "orderByField",
					value: args.orderBy?.field || "name",
				},{
					string: false,
					key: "orderByDirection",
					value: args.orderBy?.direction || "ASC",
				}],
			})
		),
	)

export const songs =
	resolver<Song[], DocsArgs>(
		async ({ args, context }) => (
			query(context.pg)({
				sql: SELECT_SONGS,
				parse: parseTable(),
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
					value: args.orderBy?.direction || "ASC",
				},{
					string: false,
					key: "columnNames",
					value: join(COLUMN_NAMES.SONG, "songs"),
				},{
					string: false,
					key: "orderByField",
					value: getSongsOrderByField((args.orderBy?.field || "title").toLowerCase()),
				}],
			})
		),
	)

export const albums =
	resolver<Album[], DocsArgs>(
		async ({ args, context }) => (
			query(context.pg)({
				sql: SELECT_ALBUMS,
				parse: parseTable(),
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
					key: "columnNames",
					value: join(COLUMN_NAMES.ALBUM),
				},{
					string: false,
					key: "orderByField",
					value: args.orderBy?.field || "title",
				},{
					string: false,
					key: "orderByDirection",
					value: args.orderBy?.direction || "ASC",
				}],
			})
		),
	)

export const artists =
	resolver<Artist[], DocsArgs>(
		async ({ args, context }) => (
			query(context.pg)({
				sql: SELECT_ARTISTS,
				parse: parseTable(),
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
					key: "columnNames",
					value: join(COLUMN_NAMES.ARTIST),
				},{
					string: false,
					key: "orderByField",
					value: args.orderBy?.field || "name",
				},{
					string: false,
					key: "orderByDirection",
					value: args.orderBy?.direction || "ASC",
				}],
			})
		),
	)

export const playlists =
	resolver<Playlist[]>(
		async ({ context }) => (
			query(context.pg)({
				sql: SELECT_PLAYLISTS,
				parse: parseTable(),
				variables: [{
					string: false,
					key: "columnNames",
					value: join(COLUMN_NAMES.PLAYLIST),
				}],
			})
		),
	)

export const user =
	resolver<User, { userId?: string }>(
		async ({ args, context }) => (
			query(context.pg)({
				sql: SELECT_USER,
				parse: parseRow(),
				variables: [{
					string: false,
					key: "columnNames",
					value: join(COLUMN_NAMES.USER),
				},{
					key: "userId",
					value: args.userId || context.authorization!.userId,
				}],
			})
		),
	)

export const play =
	resolver<Play, { playId: string }>(
		async ({ args, context }) => (
			query(context.pg)({
				sql: SELECT_PLAY,
				parse: parseRow(),
				variables: [{
					key: "playId",
					value: args.playId,
				},{
					string: false,
					key: "columnNames",
					value: join(COLUMN_NAMES.PLAY),
				}],
			})
		),
	)

export const album =
	resolver<Album, { albumId: string }>(
		async ({ args, context }) => (
			query(context.pg)({
				sql: SELECT_ALBUM,
				parse: parseRow(),
				variables: [{
					key: "albumId",
					value: args.albumId,
				},{
					string: false,
					key: "columnNames",
					value: join(COLUMN_NAMES.ALBUM),
				}],
			})
		),
	)

export const genre =
	resolver<Genre, { genreId: string }>(
		async ({ args, context }) => (
			query(context.pg)({
				sql: SELECT_GENRE,
				parse: parseRow(),
				variables: [{
					key: "genreId",
					value: args.genreId,
				},{
					string: false,
					key: "columnNames",
					value: join(COLUMN_NAMES.GENRE),
				}],
			})
		),
	)

export const artist =
	resolver<Artist, { artistId: string }>(
		async ({ args, context }) => (
			query(context.pg)({
				sql: SELECT_ARTIST,
				parse: parseRow(),
				variables: [{
					key: "artistId",
					value: args.artistId,
				},{
					string: false,
					key: "columnNames",
					value: join(COLUMN_NAMES.ARTIST),
				}],
			})
		),
	)

export const playlist =
	resolver<Playlist, { playlistId: string }>(
		async ({ args, context }) => (
			query(context.pg)({
				sql: SELECT_PLAYLIST,
				parse: parseRow(),
				variables: [{
					key: "playlistId",
					value: args.playlistId,
				},{
					string: false,
					key: "columnNames",
					value: join(COLUMN_NAMES.PLAYLIST),
				}],
			})
		),
	)

export const song =
	resolver<Song, { songId: string }>(
		async ({ args, context }) => (
			query(context.pg)({
				sql: SELECT_SONG,
				parse: parseRow(),
				variables: [{
					key: "songId",
					value: args.songId,
				},{
					string: false,
					key: "columnNames",
					value: join(COLUMN_NAMES.SONG),
				}],
			})
		),
	)