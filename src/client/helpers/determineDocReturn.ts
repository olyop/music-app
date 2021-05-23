import { Doc } from "../types"

export const determineDocReturn =
	<A extends Doc>({ __typename }: A) =>
		<B>(song: B, artist: B, playlist: B): B => {
			if (__typename === "Song") return song
			else if (__typename === "Playlist") return playlist
			else return artist
		}