import {
	Song,
	Play,
	Genre,
	UserArgs,
	SqlParse,
	PGClient,
	DocsOrderBy,
	OrderByArgs,
} from "../types"

import {
	sqlJoin,
	sqlQuery,
	parseSqlTable,
	createResolver,
	getSqlRowCountOrNull,
	getSongsOrderByField,
} from "../helpers"

import { COLUMN_NAMES } from "../globals"
import { SELECT_GENRE_SONGS, SELECT_USER_DOC_PLAYS } from "../sql"

const resolver =
	createResolver<Genre>()

const getGenreSongs =
	(client: PGClient) =>
		<T>({ id, parse, orderBy }: DocsOrderBy<T>) =>
			sqlQuery(client)({
				sql: SELECT_GENRE_SONGS,
				parse,
				variables: [{
					value: id,
					key: "genreId",
				},{
					string: false,
					key: "orderByDirection",
					value: orderBy?.direction || "ASC",
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.SONG, "songs"),
				},{
					string: false,
					key: "orderByField",
					value: getSongsOrderByField(orderBy?.field.toLowerCase() || "title"),
				}],
			})

export const songs =
	resolver<Song[], OrderByArgs>(
		({ parent, args, context }) => (
			getGenreSongs(context.pg)({
				id: parent.genreId,
				orderBy: args.orderBy,
				parse: parseSqlTable(),
			})
		),
	)

export const songsTotal =
	resolver<number | null>(
		({ parent, context }) => (
			getGenreSongs(context.pg)({
				id: parent.genreId,
				parse: getSqlRowCountOrNull,
			})
		),
	)

const getUserGenrePlays =
	(client: PGClient) =>
		<T>(userId: string, genreId: string, parse: SqlParse<T>) =>
			sqlQuery(client)({
				sql: SELECT_USER_DOC_PLAYS,
				parse,
				variables: [{
					key: "userId",
					value: userId,
				},{
					key: "genreId",
					value: genreId,
				},{
					string: false,
					key: "columnNames",
					value: sqlJoin(COLUMN_NAMES.PLAY),
				}],
			})

export const userPlays =
	resolver<Play[], UserArgs>(
		({ parent, args, context }) => (
			getUserGenrePlays(context.pg)(
				args.userId,
				parent.genreId,
				parseSqlTable(),
			)
		),
	)

export const userPlaysTotal =
	resolver<number | null, UserArgs>(
		({ parent, args, context }) => (
			getUserGenrePlays(context.pg)(
				args.userId,
				parent.genreId,
				getSqlRowCountOrNull,
			)
		),
	)