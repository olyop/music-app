export const __resolveType =
	(parent: Record<string, string>) => {
		if (parent.songId) return Promise.resolve("Song")
		else if (parent.genreId) return Promise.resolve("Genre")
		else if (parent.albumId) return Promise.resolve("Album")
		else if (parent.artistId) return Promise.resolve("Artist")
		else return null
	}