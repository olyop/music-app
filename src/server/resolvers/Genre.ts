import {
	Song,
	Play,
	Genre,
	UserArgs,
	DocsOrderBy,
	OrderByArgs,
	SqlParse,
} from "../types"

import { COLUMN_NAMES } from "../globals"
import { sql, createResolver, songOrderByField } from "../helpers"
import { SELECT_GENRE_SONGS, SELECT_USER_DOC_PLAYS } from "../sql"

const resolver =
	createResolver<Genre>()

const getGenreSongs =
	<T>({ id, parse, orderBy }: DocsOrderBy<T>) =>
		sqlPoolQuery({
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
				value: songOrderByField(orderBy?.field.toLowerCase() || "title"),
			}],
		})

export const songs =
	resolver<Song[], OrderByArgs>(
		({ parent, args }) => (
			getGenreSongs({
				id: parent.genreId,
				orderBy: args.orderBy,
				parse: parseSqlTable(),
			})
		),
	)

export const songsTotal =
	resolver<number | null>(
		({ parent }) => (
			getGenreSongs({
				id: parent.genreId,
				parse: getSqlRowCountOrNull,
			})
		),
	)

const getUserGenrePlays =
	<T>(userId: string, genreId: string, parse: SqlParse<T>) =>
		sqlPoolQuery({
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
		({ parent, args }) => (
			getUserGenrePlays(
				args.userId,
				parent.genreId,
				parseSqlTable(),
			)
		),
	)

export const userPlaysTotal =
	resolver<number | null, UserArgs>(
		({ parent, args }) => (
			getUserGenrePlays(
				args.userId,
				parent.genreId,
				getSqlRowCountOrNull,
			)
		),
	)