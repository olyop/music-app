/* eslint-disable no-await-in-loop, no-restricted-syntax */
import { sql } from "../../../helpers"
import { COLUMN_NAMES } from "../../../globals"
import { AlbumUpload, SongUpload } from "./types"
import { Client, Genre, Artist } from "../../../types"

interface GetDocInputBase<T> {
	key: keyof T,
	tableName: string,
	columnName: string,
	columnNames: string[],
}

interface GetDocInput<T> extends GetDocInputBase<T> {
	query: string,
}

interface GetDocsInput<T> extends GetDocInputBase<T> {
	docs: string[],
}

const getDoc =
	(client: Client) =>
		async <T>({ key, ...input }: GetDocInput<T>): Promise<string> =>
			// @ts-ignore
			(await sql.search(client)<T>({ ...input, exact: true }))[0][key] || ""

const getDocs =
	(client: Client) =>
		async <T>({ docs, ...input }: GetDocsInput<T>) => {
			const artists: string[] = []
			for (const query of docs) {
				artists.push(await getDoc(client)({ query, ...input }))
			}
			return artists
		}

export const populateAlbum =
	(client: Client) => async (album: AlbumUpload): Promise<AlbumUpload> => ({
		...album,
		artists: await getDocs(client)<Artist>({
			key: "artistId",
			columnName: "name",
			docs: album.artists,
			tableName: "artists",
			columnNames: COLUMN_NAMES.ARTIST,
		}),
	})

export const populateSong =
	(client: Client) => async (song: SongUpload): Promise<SongUpload> => ({
		...song,
		genres: await getDocs(client)<Genre>({
			key: "genreId",
			docs: song.genres,
			columnName: "name",
			tableName: "genres",
			columnNames: COLUMN_NAMES.GENRE,
		}),
		artists: await getDocs(client)<Artist>({
			key: "artistId",
			columnName: "name",
			docs: song.artists,
			tableName: "artists",
			columnNames: COLUMN_NAMES.ARTIST,
		}),
		remixers: await getDocs(client)<Artist>({
			key: "artistId",
			columnName: "name",
			docs: song.remixers,
			tableName: "artists",
			columnNames: COLUMN_NAMES.ARTIST,
		}),
		featuring: await getDocs(client)<Artist>({
			key: "artistId",
			columnName: "name",
			tableName: "artists",
			docs: song.featuring,
			columnNames: COLUMN_NAMES.ARTIST,
		}),
	})