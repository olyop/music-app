import { Doc } from "../types"

export const determineDocReturn =
	<A extends Doc>({ __typename }: A) =>
		<B>(song: B, artist: B): B => {
			if (__typename === "Song") return song
			else return artist
		}