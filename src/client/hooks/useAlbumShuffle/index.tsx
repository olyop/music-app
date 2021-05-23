import { User } from "../../types"
import { getUserId } from "../../helpers"
import { useMutation } from "../useMutation"
import SHUFFLE_ALBUM from "./shuffleAlbum.gql"
import { useResetPlayer } from "../useResetPlayer"
import { useDispatch, updatePlay } from "../../redux"

export const useAlbumShuffle =
	(albumId: string) => {
		const userId = getUserId()
		const dispatch = useDispatch()
		const variables: Vars = { albumId }
		const resetPlayer = useResetPlayer()

		const [ shuffle, result ] =
			useMutation<Data, Vars>(SHUFFLE_ALBUM, {
				variables,
				optimisticResponse: {
					shuffleAlbum: {
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
				if (!result.loading) {
					resetPlayer()
					await shuffle()
					dispatch(updatePlay(true))
				}
			}

		return [ handleShuffle, result ] as const
	}

interface Vars {
	albumId: string,
}

interface Data {
	shuffleAlbum: Pick<
	User,
	"prev" |
	"next" |
	"later" |
	"userId" |
	"current" |
	"__typename"
	>,
}