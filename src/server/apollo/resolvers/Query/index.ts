// import { IFieldResolver as Resolver } from "apollo-server-express"

import {
	SELECT_USER,
	SELECT_SONG,
	SELECT_PLAY,
	SELECT_ALBUM,
	SELECT_GENRE,
	SELECT_SONGS,
	SELECT_ALBUMS,
	SELECT_ARTIST,
	SELECT_GENRES,
	SELECT_ARTISTS,
	SELECT_PLAYLIST,
	SELECT_PLAYLISTS,
	SELECT_NEW_ALBUMS,
	SELECT_TOP_TEN_SONGS,
} from "../../../sql"

import {
	sqlJoin,
	sqlQuery,
	resolver,
	sqlParseRow,
	sqlParseTable,
} from "../../../helpers"

import searches from "./searches.js"
import parseUrl from "./parseUrl.js"
import imageSearch from "./imageSearch.js"
import parseSongs from "./parseSongs/index.js"
import { COLUMN_NAMES } from "../../../globals"

export const songs = resolver(
	async () => (
		sqlQuery({
			query: SELECT_SONGS,
			parse: sqlParseTable,
			variables: [{
				string: false,
				key: "columnNames",
				value: sqlJoin(COLUMN_NAMES.SONG, "songs"),
			}],
		})
	),
)

export const albums =
	async () =>
		sqlQuery({
			query: SELECT_ALBUMS,
			parse: sqlParseTable,
			variables: [{
				string: false,
				key: "columnNames",
				value: sqlJoin(COLUMN_NAMES.ALBUM),
			}],
		})

export const genres =
	async () =>
		sqlQuery({
			query: SELECT_GENRES,
			parse: sqlParseTable,
			variables: [{
				string: false,
				key: "columnNames",
				value: sqlJoin(COLUMN_NAMES.GENRE),
			}],
		})

export const artists =
	async () =>
		sqlQuery({
			query: SELECT_ARTISTS,
			parse: sqlParseTable,
			variables: [{
				string: false,
				key: "columnNames",
				value: sqlJoin(COLUMN_NAMES.ARTIST),
			}],
		})

export const playlists =
	async () =>
		sqlQuery({
			query: SELECT_PLAYLISTS,
			parse: sqlParseTable,
			variables: [{
				string: false,
				key: "columnNames",
				value: sqlJoin(COLUMN_NAMES.PLAYLIST),
			}],
		})

export const user =
	async ({ args }) =>
		sqlQuery({
			query: SELECT_USER,
			parse: sqlParseRow,
			variables: [{
				string: false,
				key: "columnNames",
				value: sqlJoin(COLUMN_NAMES.USER),
			},{
				key: "userId",
				value: args.userId,
			}],
		})

export const play =
	async ({ args }) =>
		sqlQuery({
			query: SELECT_PLAY,
			parse: sqlParseRow,
			variables: [{
				string: false,
				key: "columnNames",
				value: sqlJoin(COLUMN_NAMES.PLAY),
			},{
				key: "playId",
				value: args.playId,
			}],
		})

export const song =
	async ({ args }) =>
		sqlQuery({
			query: SELECT_SONG,
			parse: sqlParseRow,
			variables: [{
				key: "songId",
				value: args.songId,
			},{
				string: false,
				key: "columnNames",
				value: sqlJoin(COLUMN_NAMES.SONG),
			}],
		})

export const album =
	async ({ args }) =>
		sqlQuery({
			query: SELECT_ALBUM,
			parse: sqlParseRow,
			variables: [{
				string: false,
				key: "columnNames",
				value: sqlJoin(COLUMN_NAMES.ALBUM),
			},{
				key: "albumId",
				value: args.albumId,
			}],
		})

export const genre =
	async ({ args }) =>
		sqlQuery({
			query: SELECT_GENRE,
			parse: sqlParseRow,
			variables: [{
				string: false,
				key: "columnNames",
				value: sqlJoin(COLUMN_NAMES.GENRE),
			},{
				key: "genreId",
				value: args.genreId,
			}],
		})

export const artist =
	async ({ args }) =>
		sqlQuery({
			query: SELECT_ARTIST,
			parse: sqlParseRow,
			variables: [{
				string: false,
				key: "columnNames",
				value: sqlJoin(COLUMN_NAMES.ARTIST),
			},{
				key: "artistId",
				value: args.artistId,
			}],
		})

export const playlist =
	async ({ args }) =>
		sqlQuery({
			query: SELECT_PLAYLIST,
			parse: sqlParseRow,
			variables: [{
				key: "playlistId",
				value: args.playlistId,
			},{
				string: false,
				key: "columnNames",
				value: sqlJoin(COLUMN_NAMES.PLAYLIST),
			}],
		})

export const newAlbums =
	async () =>
		sqlQuery({
			query: SELECT_NEW_ALBUMS,
			parse: sqlParseTable,
		})

export const topTenSongs =
	async () =>
		sqlQuery({
			query: SELECT_TOP_TEN_SONGS,
			parse: sqlParseTable,
		})