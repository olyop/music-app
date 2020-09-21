import { createResolver } from "../helpers"

const resolver =
	createResolver<Record<string, unknown>>()

export const __resolveType =
	resolver<string>(
		({ parent }) => {
			if (parent.songId) return "Song"
			else if (parent.genreId) return "Genre"
			else if (parent.albumId) return "Album"
			else return "Artist"
		},
	)