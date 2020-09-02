import { pg } from "../../services"
import { COLUMN_NAMES } from "../../globals"
import { sql, createResolver } from "../../helpers"
import { Song, Album, Genre, Artist } from "../../types"

const resolver =
	createResolver()

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

export const songSearch =
	resolver<Song[], SearchArgs>(
		({ args }) => (
			sql.search(pg)({
				...args,
				tableName: "songs",
				columnName: "title",
				columnNames: COLUMN_NAMES.SONG,
			})
		),
	)