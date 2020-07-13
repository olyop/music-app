import { QueryResult } from "pg"

import { COLUMN_NAMES } from "../../globals"
import { sql, createResolver } from "../../helpers"
import { userDocDateAdded, userDocInLib } from "./common"
import { Song, Play, Genre, UserArgs } from "../../types"
import { SELECT_GENRE_SONGS, SELECT_USER_DOC_PLAYS } from "../../sql"

const resolver =
	createResolver<Genre>()

const genreSongs = <T>(genreId: string, parse: (res: QueryResult) => T) =>
	sql.query({
		sql: SELECT_GENRE_SONGS,
		parse,
		variables: [{
			key: "genreId",
			value: genreId,
		}, {
			string: false,
			key: "columnNames",
			value: sql.join(COLUMN_NAMES.SONG, "songs"),
		}],
	})

export const songs =
	resolver<Song[]>(
		({ parent }) => (
			genreSongs(
				parent.genreId,
				sql.parseTable(),
			)
		),
	)

export const numOfSongs =
	resolver<number>(
		({ parent }) => (
			genreSongs(
				parent.genreId,
				sql.rowCount,
			)
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

export const dateAdded =
	resolver<number, UserArgs>(
		({ parent, args }) => (
			userDocDateAdded({
				userId: args.userId,
				docId: parent.genreId,
				columnName: "genre_id",
				userDocTable: "users_genres",
			})
		),
	)

export const inLibrary =
	resolver<boolean, UserArgs>(
		({ parent, args }) => (
			userDocInLib({
				userId: args.userId,
				docId: parent.genreId,
				columnName: "genre_id",
				userDocTable: "users_genres",
			})
		),
	)