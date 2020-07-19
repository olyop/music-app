import { Doc } from "../types"

export const determineDocReturn =
	<A extends Doc>({ __typename }: A) =>
		<B>(song: B, album: B, artist: B): B => {
			if (__typename === "Song") return song
			else if (__typename === "Album") return album
			else return artist
		}