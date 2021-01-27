import {
	join,
	query,
	Client,
	parseTable,
	getRowCountOrNull,
} from "@oly_op/pg-helpers"

import {
	Song,
	Play,
	Genre,
	UserArgs,
	SqlParse,
	DocsOrderBy,
	OrderByArgs,
} from "../types"

import { COLUMN_NAMES } from "../globals"
import { createResolver, getSongsOrderByField } from "../helpers"
import { SELECT_GENRE_SONGS, SELECT_USER_DOC_PLAYS } from "../sql"

const resolver =
	createResolver<Genre>()

const getGenreSongs =
	(client: Client) =>
		<T>({ id, parse, orderBy }: DocsOrderBy<T>) =>
			query(client)({
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
					value: join(COLUMN_NAMES.SONG, "songs"),
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
				parse: parseTable(),
			})
		),
	)

export const songsTotal =
	resolver<number | null>(
		({ parent, context }) => (
			getGenreSongs(context.pg)({
				id: parent.genreId,
				parse: getRowCountOrNull,
			})
		),
	)

const getUserGenrePlays =
	(client: Client) =>
		<T>(userId: string, genreId: string, parse: SqlParse<T>) =>
			query(client)({
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
					value: join(COLUMN_NAMES.PLAY),
				}],
			})

export const userPlays =
	resolver<Play[], UserArgs>(
		({ parent, args, context }) => (
			getUserGenrePlays(context.pg)(
				args.userId,
				parent.genreId,
				parseTable(),
			)
		),
	)

export const userPlaysTotal =
	resolver<number | null, UserArgs>(
		({ parent, args, context }) => (
			getUserGenrePlays(context.pg)(
				args.userId,
				parent.genreId,
				getRowCountOrNull,
			)
		),
	)