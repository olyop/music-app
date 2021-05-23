import isNull from "lodash/isNull"
import isUndefined from "lodash/isUndefined"

import {
	updatePlay,
	togglePlay,
	useDispatch,
	useStatePlay,
} from "../../redux"

import { useQuery } from "../useQuery"
import { User, Song } from "../../types"
import { getUserId } from "../../helpers"
import { useMutation } from "../useMutation"
import { useResetPlayer } from "../useResetPlayer"
import GET_USER_CURRENT from "./getUserCurrent.gql"
import UPDATE_USER_PLAY from "./updateUserCurrent.gql"

export const usePlaySong =
	(song: Song) => {
		const { songId } = song
		const userId = getUserId()
		const play = useStatePlay()
		const dispatch = useDispatch()
		const variables: Vars = { songId }
		const resetPlayer = useResetPlayer()

		const { data } =
			useQuery<UserCurrentRes>(GET_USER_CURRENT, { fetchPolicy: "cache-first" })

		const [ mutation, result ] =
			useMutation<UserPlayRes, Vars>(UPDATE_USER_PLAY, {
				variables,
				optimisticResponse: {
					updateUserCurrent: {
						userId,
						current: song,
						__typename: "User",
					},
				},
				update: cache => {
					cache.modify({
						id: cache.identify({ userId, __typename: "User" }),
						fields: {
							prev: () => [],
							next: () => [],
							later: () => [],
							current: () => song,
						},
					})
					cache.modify({
						id: cache.identify({ songId, __typename: "Song" }),
						fields: {
							playsTotal: (cached: number) => cached + 1,
						},
					})
				},
			})

		const isCurrent = (
			!isUndefined(data) &&
			!isNull(data.user.current) &&
			data.user.current.songId === songId
		)

		const handler =
			async () => {
				if (!result.loading) {
					if (isCurrent) {
						dispatch(togglePlay())
					} else {
						resetPlayer()
						await mutation()
						dispatch(updatePlay(true))
					}
				}
			}

		return [ handler, isCurrent && play, result ] as const
	}

interface Vars {
	songId: string,
}

interface UserCurrentRes {
	user: User,
}

interface UserPlayRes {
	updateUserCurrent: Pick<User, "userId" | "current" | "__typename">,
}