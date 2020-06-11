import {
	sqlJoin,
	sqlQuery,
	resolver,
	sqlParseRow,
	sqlParseTable,
} from "../../../helpers"

import {
	User,
	Song,
	Play,
	Album,
	Genre,
	Artist,
	Playlist,
} from "../../../types"

import {
	COLUMN_NAMES,
} from "../../../globals"

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

export * from "./parseUrl"
export * from "./searches"
export * from "./parseSongs"
export * from "./imageSearch"

export const newAlbums =
	resolver<Album[]>(
		async () => (
			sqlQuery({
				sql: SELECT_NEW_ALBUMS,
				parse: res => sqlParseTable(res),
			})
		),
	)

export const topTenSongs =
	resolver<Song[]>(
		async () => (
			sqlQuery({
				sql: SELECT_TOP_TEN_SONGS,
				parse: res => sqlParseTable(res),
			})
		),
	)

export const songs =
	resolver<Song[]>(
		async () => (
			sqlQuery({
				sql: SELECT_SONGS,
				parse: res => sqlParseTable(res),
				variables: [{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.SONG, "songs"),
				}],
			})
		),
	)

export const albums =
	resolver<Album[]>(
		async () => (
			sqlQuery({
				sql: SELECT_ALBUMS,
				parse: res => sqlParseTable(res),
				variables: [{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.ALBUM),
				}],
			})
		),
	)

export const genres =
	resolver<Genre[]>(
		async () => (
			sqlQuery({
				sql: SELECT_GENRES,
				parse: res => sqlParseTable(res),
				variables: [{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.GENRE),
				}],
			})
		),
	)

export const artists =
	resolver<Artist[]>(
		async () => (
			sqlQuery({
				sql: SELECT_ARTISTS,
				parse: res => sqlParseTable(res),
				variables: [{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.ARTIST),
				}],
			})
		),
	)

export const playlists =
	resolver<Playlist[]>(
		async () => (
			sqlQuery({
				sql: SELECT_PLAYLISTS,
				parse: res => sqlParseTable(res),
				variables: [{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.PLAYLIST),
				}],
			})
		),
	)

export const user =
	resolver<User, { userId: string }>(
		async ({ args }) => (
			sqlQuery({
				sql: SELECT_USER,
				parse: res => sqlParseRow(res),
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
		async ({ args }) => (
			sqlQuery({
				sql: SELECT_PLAY,
				parse: res => sqlParseRow(res),
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

export const song =
	resolver<Song, { songId: string }>(
		async ({ args }) => (
			sqlQuery({
				sql: SELECT_SONG,
				parse: res => sqlParseRow(res),
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

export const album =
	resolver<Album, { albumId: string }>(
		async ({ args }) => (
			sqlQuery({
				sql: SELECT_ALBUM,
				parse: res => sqlParseRow(res),
				variables: [{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.ALBUM),
				},{
					key: "albumId",
					value: args.albumId,
				}],
			})
		),
	)

export const genre =
	resolver<Genre, { genreId: string }>(
		async ({ args }) => (
			sqlQuery({
				sql: SELECT_GENRE,
				parse: res => sqlParseRow(res),
				variables: [{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.GENRE),
				},{
					key: "genreId",
					value: args.genreId,
				}],
			})
		),
	)

export const artist =
	resolver<Artist, { artistId: string }>(
		async ({ args }) => (
			sqlQuery({
				sql: SELECT_ARTIST,
				parse: res => sqlParseRow(res),
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
		async ({ args }) => (
			sqlQuery({
				sql: SELECT_PLAYLIST,
				parse: res => sqlParseRow(res),
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