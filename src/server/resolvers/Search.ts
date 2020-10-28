import { createResolver } from "../helpers"

const resolver =
	createResolver<Record<string, unknown>>()

export const __resolveType =
	resolver<string>(
		({ parent }) => {
			if (parent.songId) return Promise.resolve("Song")
			else if (parent.genreId) return Promise.resolve("Genre")
			else if (parent.albumId) return Promise.resolve("Album")
			else return Promise.resolve("Artist")
		},
	)