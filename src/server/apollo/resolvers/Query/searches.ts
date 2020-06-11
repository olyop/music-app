import { QueryResult } from "pg"
import { head, identity } from "lodash"

import {
	Song, Album,
} from "../../../types"

import {
	pipe,
	sqlJoin,
	sqlQuery,
	resolver,
	sqlParseTable,
} from "../../../helpers"

import { SELECT_SEARCH } from "../../../sql"
import { COLUMN_NAMES } from "../../../globals"

const parseSearch = <T>(res: QueryResult, exact: boolean) =>
	pipe(sqlParseTable, exact ? head : identity)(res) as T[]

const docSearch =
	<T>(tableName: string, docName: string, columnName: string, query: string, exact = false) =>
		sqlQuery<T>({
			sql: SELECT_SEARCH,
			parse: res => parseSearch(res, exact),
			variables: [{
				string: false,
				key: "tableName",
				value: tableName,
			},{
				string: false,
				key: "columnName",
				value: columnName,
			},{
				key: "query",
				parameterized: true,
				value: `%${query.toLowerCase()}%`,
			},{
				string: false,
				key: "columnNames",
				value: sqlJoin(COLUMN_NAMES[docName]),
			}],
		})

type TArgs = {
	query: string,
	exact?: boolean,
}

export const songSearch =
	resolver<Song | Song[], TArgs>(
		async ({ args }) => (
			docSearch("songs", "song", "title", args.query, args.exact)
		),
	)

export const albumSearch =
	resolver<Album | Album[], TArgs>(
		async ({ args }) => (
			docSearch("albums", "album", "title", args.query, args.exact)
		),
	)

export const genreSearch =
	async ({ args }) =>
		docSearch("genres", "genre", "name")(args.query)

export const artistSearch =
	async ({ args }) =>
		docSearch("artists", "artist", "name")(args.query)

export const genreSearchExact =
	async ({ args }) =>
		docSearch("genres", "genre", "name", true)(args.query)

export const artistSearchExact =
	async ({ args }) =>
		docSearch("artists", "artist", "name", true)(args.query)