import { FC, createElement } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"
import { useQuery, useMutation } from "@apollo/client"

import {
	updatePlay,
	useDispatch,
	useStatePlay,
	updateCurrent,
	useStateUserId,
} from "../../redux"

import Icon from "../Icon"
import { determineDocId } from "../../helpers"
import { User, UserDoc, Song } from "../../types"
import USER_PLAY from "../../graphql/mutations/userPlay.gql"
import GET_USER_CURRENT from "../../graphql/queries/userCurrent.gql"

const isSong = (doc: UserDoc): doc is Song =>
	doc.__typename === "Song"

const bem = createBem("PlayButton")

const PlayButton: FC<PropTypes> = ({ doc, className }) => {
	const play = useStatePlay()
	const dispatch = useDispatch()
	const userId = useStateUserId()
	const docId = determineDocId(doc)

	const { data } =
		useQuery<UserCurrentRes>(GET_USER_CURRENT, {
			variables: { userId },
			fetchPolicy: "cache-first",
		})

	const [ userPlay ] =
		useMutation<UserPlayRes>(USER_PLAY, {
			variables: { docId, userId },
			optimisticResponse: isSong(doc) ? {
				userPlay: {
					userId,
					current: doc,
					__typename: "User",
				},
			} : undefined,
		})

	const isCurrent = (
		data &&
		data.user.current &&
		data.user.current.songId === docId
	)

	const handleClick = () => {
		if (isSong(doc)) {
			if (isCurrent) {
				dispatch(updatePlay(!isCurrent))
			} else {
				dispatch(updateCurrent(0))
				dispatch(updatePlay(true))
				userPlay().catch(console.error)
			}
		}
	}

	return (
		<Icon
			title="Play"
			onClick={handleClick}
			className={bem(className, "IconHover")}
			icon={isCurrent && play ? "pause" : "play_arrow"}
		/>
	)
}

interface UserPlayRes {
	userPlay: Pick<User, "userId" | "current" | "__typename">,
}

interface UserCurrentRes {
	user: User,
}

interface PropTypes extends BemPropTypes {
	doc: UserDoc,
}

export default PlayButton