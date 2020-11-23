import {
	updatePlay,
	useDispatch,
	useStatePlay,
	updateCurrent,
	useStateUserId,
} from "../../redux"

import { useQuery } from "../useQuery"
import { useMutation } from "../useMutation"
import { User, UserDoc, Song } from "../../types"
import { determineDocId } from "../determineDocId"
import GET_USER_CURRENT from "./getUserCurrent.gql"
import UPDATE_USER_PLAY from "./updateUserCurrent.gql"

const isSong = (doc: UserDoc): doc is Song =>
	doc.__typename === "Song"

export const usePlay = (doc: UserDoc): ReturnType => {
	const play = useStatePlay()
	const dispatch = useDispatch()
	const userId = useStateUserId()
	const songId = determineDocId(doc)

	const { data } =
		useQuery<UserCurrentRes>(GET_USER_CURRENT, {
			variables: { userId },
			fetchPolicy: "cache-first",
		})

	const [ userPlay, { loading } ] =
		useMutation<UserPlayRes>(UPDATE_USER_PLAY, {
			variables: { songId, userId },
			optimisticResponse: isSong(doc) ? {
				updateUserCurrent: {
					userId,
					current: doc,
					__typename: "User",
				},
			} : undefined,
		})

	const isCurrent = (
		data &&
		data.user.current &&
		data.user.current.songId === songId
	)

	const handleClick = async () => {
		if (!loading || isSong(doc)) {
			if (isCurrent) {
				dispatch(updatePlay(!play))
			} else {
				dispatch(updateCurrent(0))
				dispatch(updatePlay(false))
				await userPlay()
			}
		}
	}

	return [ !!isCurrent && play, handleClick ]
}

type ReturnType = [ boolean, () => Promise<void> ]

interface UserPlayRes {
	updateUserCurrent: Pick<User, "userId" | "current" | "__typename">,
}

interface UserCurrentRes {
	user: User,
}