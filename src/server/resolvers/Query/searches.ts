import { isEmpty, orderBy } from "lodash"

import {
	sqlJoin,
	sqlQuery,
	sqlSearch,
	parseSqlRow,
	createResolver,
} from "../../helpers"

import {
	SELECT_SONG,
	SELECT_GENRE,
	SELECT_ALBUM,
	SELECT_ARTIST,
} from "../../sql"

import { COLUMN_NAMES } from "../../globals"
import { Search, Song, Album, Genre, Artist, SearchResult } from "../../types"

const resolver =
	createResolver()

interface SearchArgs {
	query: string,
}

interface DocSearchArgs extends SearchArgs {
	exact: boolean,
}

export const artistSearch =
	resolver<Artist[], DocSearchArgs>(
		({ args, context }) => (
			sqlSearch(context.pg)({
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
			sqlSearch(context.pg)({
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
			sqlSearch(context.pg)({
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
			sqlSearch(context.pg)({
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
			const { hits } =
				await context.ag.search<SearchResult>(
					args.query,
					{ getRankingInfo: true },
				)
			const results =
				await Promise.all<Search>(
					orderBy(hits, "_rankingInfo.userScore", "asc").map(hit => {
						if (hit.type === "Song") {
							return sqlQuery(context.pg)({
								sql: SELECT_SONG,
								parse: parseSqlRow<Song>(),
								variables: [{
									key: "songId",
									value: hit.objectID,
								},{
									string: false,
									key: "columnNames",
									value: sqlJoin(COLUMN_NAMES.SONG),
								}],
							})
						} else if (hit.type === "Genre") {
							return sqlQuery(context.pg)({
								sql: SELECT_GENRE,
								parse: parseSqlRow<Genre>(),
								variables: [{
									key: "genreId",
									value: hit.objectID,
								},{
									string: false,
									key: "columnNames",
									value: sqlJoin(COLUMN_NAMES.GENRE),
								}],
							})
						} else if (hit.type === "Album") {
							return sqlQuery(context.pg)({
								sql: SELECT_ALBUM,
								parse: parseSqlRow<Album>(),
								variables: [{
									key: "albumId",
									value: hit.objectID,
								},{
									string: false,
									key: "columnNames",
									value: sqlJoin(COLUMN_NAMES.ALBUM),
								}],
							})
						} else {
							return sqlQuery(context.pg)({
								sql: SELECT_ARTIST,
								parse: parseSqlRow<Artist>(),
								variables: [{
									key: "artistId",
									value: hit.objectID,
								},{
									string: false,
									key: "columnNames",
									value: sqlJoin(COLUMN_NAMES.ARTIST),
								}],
							})
						}
					}),
				)
			return results.filter(doc => !isEmpty(doc))
		},
	)