import { User, UserVar } from "../../types"
import { useMutation } from "../useMutation"
import { useStateUserId } from "../../redux"
import SHUFFLE_ARTIST from "./shuffleArtist.gql"

export const useArtistShuffle = (artistId: string) => {
	const userId = useStateUserId()
	return useMutation<ShuffleData, Vars>(
		SHUFFLE_ARTIST,
		{ variables: { userId, artistId } },
	)
}

interface ShuffleData {
	shuffleArtist: User,
}

interface Vars extends UserVar {
	artistId: string,
}