import uniq from "lodash/uniq"
import pipe from "@oly_op/pipe"
import reduce from "lodash/fp/reduce"
import filter from "lodash/fp/filter"
import uniqueId from "lodash/uniqueId"

import { Album, Artist } from "../types"

const stringsToArtists = (arr: string[]): Artist[] =>
	arr.map(artist => ({
		name: artist,
		artistId: uniqueId(),
	}))

export const albumsToArtists = (albums: Album[]): Artist[] =>
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
		stringsToArtists,
		filter<Artist>(({ name }) => name !== "Various Artists"),
	)(albums)