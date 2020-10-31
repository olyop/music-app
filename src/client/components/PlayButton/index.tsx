import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import {
	updatePlay,
	useDispatch,
	useStatePlay,
	updateCurrent,
	useStateUserId,
} from "../../redux"

import {
	useQuery,
	useMutation,
	determineDocId,
} from "../../helpers"

import Icon from "../Icon"
import { User, UserDoc, Song } from "../../types"
import GET_USER_CURRENT from "./getUserCurrent.gql"
import UPDATE_USER_PLAY from "./updateUserCurrent.gql"

const isSong = (doc: UserDoc): doc is Song =>
	doc.__typename === "Song"

const bem = createBem("PlayButton")

const PlayButton: FC<PropTypes> = ({ doc, className }) => {
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
		if (isSong(doc)) {
			if (isCurrent) {
				dispatch(updatePlay(!play))
			} else {
				dispatch(updateCurrent(0))
				dispatch(updatePlay(false))
				await userPlay()
			}
		}
	}

	return (
		<Icon
			title="Play"
			className={bem(className, "Hover")}
			onClick={loading ? undefined : handleClick}
			icon={isCurrent && play ? "pause" : "play_arrow"}
		/>
	)
}

interface UserPlayRes {
	updateUserCurrent: Pick<User, "userId" | "current" | "__typename">,
}

interface UserCurrentRes {
	user: User,
}

interface PropTypes extends BemPropTypes {
	doc: UserDoc,
}

export default PlayButton