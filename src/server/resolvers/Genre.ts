import {
	Song,
	Play,
	Genre,
	UserArgs,
	DocsOrderBy,
	OrderByArgs,
} from "../types"

import { COLUMN_NAMES } from "../globals"
import { sql, createResolver } from "../helpers"
import { SELECT_GENRE_SONGS, SELECT_USER_DOC_PLAYS } from "../sql"

const resolver =
	createResolver<Genre>()

const genreSongs = <T>({ id, parse, orderBy }: DocsOrderBy<T>) =>
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
			genreSongs({
				id: parent.genreId,
				orderBy: args.orderBy,
				parse: sql.parseTable(),
			})
		),
	)

export const numOfSongs =
	resolver<number>(
		({ parent }) => (
			genreSongs({
				id: parent.genreId,
				parse: sql.rowCount,
			})
		),
	)

export const plays =
	resolver<Play[], UserArgs>(
		({ parent, args }) => (
			sql.query({
				sql: SELECT_USER_DOC_PLAYS,
				parse: sql.parseTable(),
				variables: [{
					key: "userId",
					value: args.userId,
				},{
					key: "albumId",
					value: parent.genreId,
				},{
					string: false,
					key: "columnNames",
					value: sql.join(COLUMN_NAMES.PLAY),
				}],
			})
		),
	)