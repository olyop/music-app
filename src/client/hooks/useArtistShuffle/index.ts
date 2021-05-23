import { User } from "../../types"
import { getUserId } from "../../helpers"
import { useMutation } from "../useMutation"
import SHUFFLE_ARTIST from "./shuffleArtist.gql"
import { useResetPlayer } from "../useResetPlayer"
import { useDispatch, updatePlay } from "../../redux"

export const useArtistShuffle =
	(artistId: string) => {
		const userId = getUserId()
		const dispatch = useDispatch()
		const resetPlayer = useResetPlayer()
		const variables: Vars = { artistId }

		const [ shuffle, result ] =
			useMutation<ShuffleData, Vars>(SHUFFLE_ARTIST, {
				variables,
				optimisticResponse: {
					shuffleArtist: {
						userId,
						prev: [],
						next: [],
						later: [],
						current: null,
						__typename: "User",
					},
				},
			})

		const handleShuffle =
			async () => {
				resetPlayer()
				await shuffle()
				dispatch(updatePlay(true))
			}

		return [ handleShuffle, result ] as const
	}

interface Vars {
	artistId: string,
}

interface ShuffleData {
	shuffleArtist: Pick<
	User,
	"prev" |
	"next" |
	"later" |
	"userId" |
	"current" |
	"__typename"
	>,
}