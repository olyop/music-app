type IType = {
	__typename: string,
}

export const determineReturnFromDoc =
	({ __typename }: IType) =>
		<T>(song: T, album: T, genre: T, artist: T) => {
			if (__typename === "Song") return song
			else if (__typename === "Album") return album
			else if (__typename === "Genre") return genre
			else return artist
		}