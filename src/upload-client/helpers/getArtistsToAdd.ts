import uniq from "lodash/uniq"
import pipe from "@oly_op/pipe"
import flatten from "lodash/flatten"
import reduce from "lodash/fp/reduce"
import filter from "lodash/fp/filter"
import includes from "lodash/includes"
import uniqueId from "lodash/uniqueId"

import { Album, Artist } from "../types"
import { getSearchResults } from "./getSearchResults"

const stringsToArtists =
	(arr: string[]): Artist[] =>
		arr.map(name => ({
			name,
			photo: null,
			artistId: uniqueId(),
		}))

const albumsToArtists =
	(albums: Album[]): string[] =>
		pipe(
			reduce<Album, string[]>(
				(artists, album) => [
					...artists,
					...album.artists,
					...album.songs.reduce<string[]>(
						(songsArtists, song) => [
							...songsArtists,
							...song.artists,
							...song.remixers,
							...song.featuring,
						],
						[],
					),
				],
				[],
			),
			uniq,
			filter(name => name !== "Various Artists"),
		)(albums)

export const getArtistsToAdd =
	(albums: Album[]) => {
		const query = getSearchResults(client)
		const artists = albumsToArtists(albums)
		return (
			Promise
				.all(artists.map(query<Artist, Res>({
					exact: true,
					query: ARTIST_SEARCH,
					parseRes: ({ artistSearch }) => artistSearch,
				})))
				.then(flatten)
				.then(res => {
					const resMap = res.map(({ name }) => name)
					const filtered = artists.filter(artist => !includes(resMap, artist))
					return stringsToArtists(filtered)
				})
		)
	}

interface Res {
	artistSearch: Artist[],
}