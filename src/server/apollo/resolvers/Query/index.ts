import {
	sql,
	createResolver,
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

const resolver =
	createResolver()

export const newAlbums =
	resolver<Album[]>(
		() => (
			sql.query({
				sql: SELECT_NEW_ALBUMS,
				parse: res => sql.parseTable(res),
			})
		),
	)

export const topTenSongs =
	resolver<Song[]>(
		() => (
			sql.query({
				sql: SELECT_TOP_TEN_SONGS,
				parse: res => sql.parseTable(res),
			})
		),
	)

export const songs =
	resolver<Song[]>(
		() => (
			sql.query({
				sql: SELECT_SONGS,
				parse: res => sql.parseTable(res),
				variables: [{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.SONG, "songs"),
				}],
			})
		),
	)

export const albums =
	resolver<Album[]>(
		() => (
			sql.query({
				sql: SELECT_ALBUMS,
				parse: res => sql.parseTable(res),
				variables: [{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.ALBUM),
				}],
			})
		),
	)

export const genres =
	resolver<Genre[]>(
		() => (
			sql.query({
				sql: SELECT_GENRES,
				parse: res => sql.parseTable(res),
				variables: [{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.GENRE),
				}],
			})
		),
	)

export const artists =
	resolver<Artist[]>(
		() => (
			sql.query({
				sql: SELECT_ARTISTS,
				parse: res => sql.parseTable(res),
				variables: [{
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
				parse: res => sql.parseTable(res),
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
				parse: res => sql.parseRow(res),
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
				parse: res => sql.parseRow(res),
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
				parse: res => sql.parseRow(res),
				variables: [{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.ALBUM),
				},{
					key: "albumId",
					value: args.albumId,
				}],
			})
		),
	)

export const genre =
	resolver<Genre, { genreId: string }>(
		({ args }) => (
			sql.query({
				sql: SELECT_GENRE,
				parse: res => sql.parseRow(res),
				variables: [{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.GENRE),
				},{
					key: "genreId",
					value: args.genreId,
				}],
			})
		),
	)

export const artist =
	resolver<Artist, { artistId: string }>(
		({ args }) => (
			sql.query({
				sql: SELECT_ARTIST,
				parse: res => sql.parseRow(res),
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
				parse: res => sql.parseRow(res),
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
				parse: res => sql.parseRow(res),
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