import { createElement, FC } from "react"
import { createBem, BemInput } from "@oly_op/bem"
import { useQuery, useMutation } from "@apollo/client"

import Icon from "../Icon"
import { User, UserDoc } from "../../types"
import { useUserContext } from "../../contexts/User"
import { usePlayContext } from "../../contexts/Play"
import { isSong, determineDocId } from "../../helpers"
import { useCurrentContext } from "../../contexts/Current"
import USER_PLAY from "../../graphql/mutations/userPlay.gql"
import GET_USER_CURRENT from "../../graphql/queries/userCurrent.gql"

const bem = createBem("PlayButton")

const PlayButton: FC<PropTypes> = ({ doc, className }) => {
	const userId = useUserContext()
	const docId = determineDocId(doc)
	const { setCurrent } = useCurrentContext()
	const { play, setPlay } = usePlayContext()

	const { data } =
		useQuery<UserCurrentRes>(GET_USER_CURRENT, {
			query: GET_USER_CURRENT,
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

	const isCurrent = data === undefined || data.user.current === null ?
		false : data.user.current.songId === docId

	const handleClick = () => {
		if (isSong(doc)) {
			if (isCurrent) {
				setPlay(prevState => !prevState)
			} else {
				setCurrent(0)
				setPlay(true)
				userPlay()
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

interface PropTypes {
	doc: UserDoc,
	className?: BemInput,
}

export default PlayButton