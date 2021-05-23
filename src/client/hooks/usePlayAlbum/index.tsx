import isNull from "lodash/isNull"
import isUndefined from "lodash/isUndefined"
import { MutationResult } from "@apollo/client"

import { useQuery } from "../useQuery"
import PLAY_ALBUM from "./playAlbum.gql"
import { User, Handler } from "../../types"
import { useMutation } from "../useMutation"
import { useResetPlayer } from "../useResetPlayer"
import GET_USER_CURRENT from "./getUserCurrent.gql"
import { useDispatch, updatePlay, useStatePlay } from "../../redux"

export const usePlayAlbum =
	(albumId: string): ReturnType => {
		const play = useStatePlay()
		const dispatch = useDispatch()
		const resetPlayer = useResetPlayer()

		const [ playAlbum, result ] =
			useMutation<Data, Vars>(PLAY_ALBUM, { variables: { albumId } })

		const { data } =
			useQuery<UserCurrentRes>(GET_USER_CURRENT, { fetchPolicy: "cache-first" })

		const isCurrent = (
			!isUndefined(data) &&
			!isNull(data.user.current) &&
			data.user.current.album.albumId === albumId
		)

		const handlePlayAlbum =
			async () => {
				if (!result.loading) {
					if (isCurrent) {
						if (play) {
							dispatch(updatePlay(false))
						} else {
							dispatch(updatePlay(true))
						}
					} else {
						resetPlayer()
						await playAlbum()
						dispatch(updatePlay(true))
					}
				}
			}

		return [ handlePlayAlbum, isCurrent && play, result ]
	}

interface Vars {
	albumId: string,
}

interface Data {
	shuffleAlbum: User,
}

interface UserCurrentRes {
	user: User,
}

type ReturnType = [
	playAlbum: Handler,
	isPlaying: boolean,
	result: MutationResult<Data>,
]