import cheerio from "cheerio"
import fetch from "node-fetch"

import {
	User,
	Song,
	Play,
	Album,
	Genre,
	Artist,
	Playlist,
	OrderByArgs,
} from "../types"

import {
	SELECT_USER,
	SELECT_SONG,
	SELECT_PLAY,
	SELECT_ALBUM,
	SELECT_GENRE,
	SELECT_SONGS,
	SELECT_ALBUMS,
	SELECT_ARTIST,
	SELECT_ARTISTS,
	SELECT_PLAYLIST,
	SELECT_PLAYLISTS,
	SELECT_NEW_ALBUMS,
	SELECT_TOP_TEN_SONGS,
} from "../sql"

import { pg } from "../services"
import { COLUMN_NAMES } from "../globals"
import { sql, createResolver } from "../helpers"

const resolver =
	createResolver()

export const songs =
	resolver<Song[], OrderByArgs>(
		({ args }) => (
			sql.query({
				sql: SELECT_SONGS,
				parse: sql.parseTable(),
				variables: [{
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
					value: sql.join(COLUMN_NAMES.SONG, "songs"),
				}],
			})
		),
	)

export const albums =
	resolver<Album[], OrderByArgs>(
		({ args }) => (
			sql.query({
				sql: SELECT_ALBUMS,
				parse: sql.parseTable(),
				variables: [{
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
	resolver<Artist[], OrderByArgs>(
		({ args }) => (
			sql.query({
				sql: SELECT_ARTISTS,
				parse: sql.parseTable(),
				variables: [{
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

export const newAlbums =
	resolver<Album[]>(
		() => (
			sql.query({
				sql: SELECT_NEW_ALBUMS,
				parse: sql.parseTable(),
			})
		),
	)

export const topTenSongs =
	resolver<Song[]>(
		() => (
			sql.query({
				sql: SELECT_TOP_TEN_SONGS,
				parse: sql.parseTable(),
			})
		),
	)

interface SearchArgs {
	query: string,
	exact: boolean,
}

export const artistSearch =
	resolver<Artist[], SearchArgs>(
		({ args }) => (
			sql.search(pg)({
				...args,
				columnName: "name",
				tableName: "artists",
				columnNames: COLUMN_NAMES.ARTIST,
			})
		),
	)

export const albumSearch =
	resolver<Album[], SearchArgs>(
		({ args }) => (
			sql.search(pg)({
				...args,
				tableName: "albums",
				columnName: "title",
				columnNames: COLUMN_NAMES.ALBUM,
			})
		),
	)

export const genreSearch =
	resolver<Genre[], SearchArgs>(
		({ args }) => (
			sql.search(pg)({
				...args,
				columnName: "name",
				tableName: "genres",
				columnNames: COLUMN_NAMES.GENRE,
			})
		),
	)

const urlStart = "https://www.google.com/search"

interface AlbumReleasedSearchArgs {
	title: string,
	artists: string[],
}

export const albumReleasedSearch =
	resolver<string, AlbumReleasedSearchArgs>(
		async () => {
			const search = "higher+ground+diplo+release+date"
			const url = `${urlStart}?q=${search}`
			const response = await fetch(url)
			const html = await response.text()
			const $ = cheerio.load(html)
			return $("div[data-tts=answers]").html() || "err"
		},
	)