import uniq from "lodash/uniq"
import pipe from "@oly_op/pipe"
import flatten from "lodash/flatten"
import reduce from "lodash/fp/reduce"
import uniqueId from "lodash/uniqueId"
import includes from "lodash/includes"

import { Album, Genre } from "../types"
import { getSearchResults } from "./getSearchResults"

const stringsToGenres =
	(arr: string[]): Genre[] =>
		arr.map(name => ({
			name,
			genreId: uniqueId(),
		}))

const albumsToGenres =
	(albums: Album[]) =>
		pipe(
			reduce<Album, string[]>(
				(genres, album) => [
					...genres,
					...album.songs.map(song => song.genres).flat(),
				],
				[],
			),
			uniq,
		)(albums)

export const getGenresToAdd =
	(albums: Album[]): Promise<Genre[]> => {
		const query = getSearchResults(client)
		const genres = albumsToGenres(albums)
		return (
			Promise
				.all(genres.map(query<Genre, Res>({
					exact: true,
					query: GENRE_SEARCH,
					parseRes: ({ genreSearch }) => genreSearch,
				})))
				.then(flatten)
				.then(res => {
					const resMap = res.map(({ name }) => name)
					const filtered = genres.filter(genre => !includes(resMap, genre))
					return stringsToGenres(filtered)
				})
		)
	}

interface Res {
	genreSearch: Genre[],
}