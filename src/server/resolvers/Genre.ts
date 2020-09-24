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
import { sql, createResolver } from "../helpers"
import { SELECT_GENRE_SONGS, SELECT_USER_DOC_PLAYS } from "../sql"

const resolver =
	createResolver<Genre>()

const getGenreSongs =
	<T>({ id, parse, orderBy }: DocsOrderBy<T>) =>
		sql.query({
			sql: SELECT_GENRE_SONGS,
			parse,
			variables: [{
				value: id,
				key: "genreId",
			},{
				string: false,
				key: "orderByField",
				value: orderBy?.field || "title",
			},{
				string: false,
				key: "orderByDirection",
				value: orderBy?.direction || "asc",
			},{
				string: false,
				key: "columnNames",
				value: sql.join(COLUMN_NAMES.SONG, "songs"),
			}],
		})

export const songs =
	resolver<Song[], OrderByArgs>(
		({ parent, args }) => (
			getGenreSongs({
				id: parent.genreId,
				orderBy: args.orderBy,
				parse: sql.parseTable(),
			})
		),
	)

export const songsTotal =
	resolver<number>(
		({ parent }) => (
			getGenreSongs({
				id: parent.genreId,
				parse: sql.rowCount,
			})
		),
	)

const getUserGenrePlays =
	<T>(userId: string, genreId: string, parse: SqlParse<T>) =>
		sql.query({
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
				value: sql.join(COLUMN_NAMES.PLAY),
			}],
		})

export const userPlays =
	resolver<Play[], UserArgs>(
		({ parent, args }) => (
			getUserGenrePlays(
				args.userId,
				parent.genreId,
				sql.parseTable(),
			)
		),
	)

export const userPlaysTotal =
	resolver<number, UserArgs>(
		({ parent, args }) => (
			getUserGenrePlays(
				args.userId,
				parent.genreId,
				sql.rowCount,
			)
		),
	)