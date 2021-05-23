import {
	join,
	parseRow,
	query as pgQuery,
	search as pgSearch,
} from "@oly_op/pg-helpers"

import { isEmpty, orderBy } from "lodash"

import {
	SELECT_SONG,
	SELECT_GENRE,
	SELECT_ALBUM,
	SELECT_ARTIST,
} from "../../sql"

import { COLUMN_NAMES } from "../../globals"
import { createResolver } from "../../helpers"
import { Search, Song, Album, Genre, Artist } from "../../types"

const resolver =
	createResolver()

export const artistSearch =
	resolver<Artist[], DocSearchArgs>(
		({ args, context }) => (
			pgSearch(context.pg)({
				...args,
				columnName: "name",
				tableName: "artists",
				columnNames: COLUMN_NAMES.ARTIST,
			})
		),
	)

export const albumSearch =
	resolver<Album[], DocSearchArgs>(
		({ args, context }) => (
			pgSearch(context.pg)({
				...args,
				tableName: "albums",
				columnName: "title",
				columnNames: COLUMN_NAMES.ALBUM,
			})
		),
	)

export const genreSearch =
	resolver<Genre[], DocSearchArgs>(
		({ args, context }) => (
			pgSearch(context.pg)({
				...args,
				columnName: "name",
				tableName: "genres",
				columnNames: COLUMN_NAMES.GENRE,
			})
		),
	)

export const songSearch =
	resolver<Song[], DocSearchArgs>(
		({ args, context }) => (
			pgSearch(context.pg)({
				...args,
				tableName: "songs",
				columnName: "title",
				columnNames: COLUMN_NAMES.SONG,
			})
		),
	)

export const search =
	resolver<Search[], SearchArgs>(
		async ({ args, context }) => {
			const { value } = args
			const query = pgQuery(context.pg)

			const { hits } =
				await context.ag.search<SearchResult>(value, { getRankingInfo: true })

			const hitsRanked =
				orderBy(hits, "_rankingInfo.userScore", "asc")

			const results =
				await Promise.all<Search>(
					hitsRanked.map(
						hit => {
							if (hit.type === "Song") {
								return query({
									sql: SELECT_SONG,
									parse: parseRow<Song>(),
									variables: [{
										key: "songId",
										value: hit.objectID,
									},{
										string: false,
										key: "columnNames",
										value: join(COLUMN_NAMES.SONG),
									}],
								})
							} else if (hit.type === "Genre") {
								return query({
									sql: SELECT_GENRE,
									parse: parseRow<Genre>(),
									variables: [{
										key: "genreId",
										value: hit.objectID,
									},{
										string: false,
										key: "columnNames",
										value: join(COLUMN_NAMES.GENRE),
									}],
								})
							} else if (hit.type === "Album") {
								return query({
									sql: SELECT_ALBUM,
									parse: parseRow<Album>(),
									variables: [{
										key: "albumId",
										value: hit.objectID,
									},{
										string: false,
										key: "columnNames",
										value: join(COLUMN_NAMES.ALBUM),
									}],
								})
							} else {
								return query({
									sql: SELECT_ARTIST,
									parse: parseRow<Artist>(),
									variables: [{
										key: "artistId",
										value: hit.objectID,
									},{
										string: false,
										key: "columnNames",
										value: join(COLUMN_NAMES.ARTIST),
									}],
								})
							}
						},
					),
				)

			const resultsFiltered =
				results.filter(doc => !isEmpty(doc))

			return resultsFiltered
		},
	)

interface SearchArgs {
	value: string,
}

interface DocSearchArgs extends SearchArgs {
	exact: boolean,
}

interface SearchResult {
	text: string,
	objectID: string,
	type: "Song" | "Genre" | "Album" | "Artist",
}