/*
	eslint-disable
		prefer-destructuring,
		@typescript-eslint/brace-style
*/
import fetch from "node-fetch"
import { random, isEmpty } from "lodash"
import bufferToDataUrl from "@oly_op/music-app-common/bufferToDataUrl"

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
	sql,
	yearRegEx,
	dateRegEx,
	googleRegEx,
	createResolver,
	wikipediaRegEx,
	googleMonthRegEx,
	wikipediaMonthRegEx,
	googleMonthLookupIndex,
	wikipediaMonthLookupIndex,
} from "../helpers"

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
import { COLUMN_NAMES, SERP_API_KEY } from "../globals"

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

const albumReleasedSearchUrl = "https://www.google.com/search"

interface AlbumReleasedSearchArgs {
	title: string,
	artists: string[],
}

export const albumReleasedSearch =
	resolver<string | null, AlbumReleasedSearchArgs>(
		async ({ args }) => {
			const titleSearch = args.title.toLowerCase().replace(" ", "+")
			const artistsSearch = args.artists.join(" ").toLowerCase().replace(" ", "+")
			const search = `${titleSearch}+${artistsSearch}+release+date`
			const url = `${albumReleasedSearchUrl}?q=${search}`
			const response = await fetch(url)
			const html = await response.text()
			const googleRes = html.match(googleRegEx)
			const wikipediaRes = html.match(wikipediaRegEx)
			let dateString: string
			if (googleRes) { dateString = googleRes[0] }
			else if (wikipediaRes) { dateString = wikipediaRes[0] }
			else { dateString = "" }
			if (!isEmpty(dateString)) {
				const year = parseInt(dateString.match(yearRegEx)![0])
				const date = parseInt(dateString.match(dateRegEx)![0])
				const monthGoogleRes = dateString.match(googleMonthRegEx)
				const monthWikipediaRes = dateString.match(wikipediaMonthRegEx)
				console.log(
					monthGoogleRes ? monthGoogleRes[0] : null,
					monthWikipediaRes ? monthWikipediaRes[0] : null,
				)
				let month: string
				let lookup: Record<string, number>
				if (monthGoogleRes) {
					month = monthGoogleRes[0]
					lookup = googleMonthLookupIndex
				} else {
					month = monthWikipediaRes![0]
					lookup = wikipediaMonthLookupIndex
				}
				const monthIndex = lookup[month]
				return new Date(`${year}-${monthIndex}-${date + 1}`).toISOString().slice(0, 10)
			} else {
				return null
			}
		},
	)

interface PhotoSearchArgs {
	name: string,
}

interface PhotoSearchResult {
	original: string,
}

interface PhotoSearchResults {
	images_results: PhotoSearchResult[],
}

const photoSearchUrlBase = "https://serpapi.com/search.json"

export const photoSearch =
	resolver<string, PhotoSearchArgs>(
		async ({ args }) => {
			const params = new URLSearchParams()
			params.set("num", "10")
			params.set("tbm", "isch")
			params.set("engine", "google")
			params.set("api_key", SERP_API_KEY)
			params.set("google_domain", "google.com")
			params.set("q", `${args.name.toLowerCase().replace(" ", "+")}+artist`)
			const apiRes = await fetch(`${photoSearchUrlBase}?${params.toString()}`)
			const apiJson = await apiRes.json() as PhotoSearchResults
			const url = apiJson.images_results[random(0, 9)].original
			const imgRes = await fetch(url)
			const buffer = await imgRes.buffer()
			return bufferToDataUrl(buffer)
		},
	)