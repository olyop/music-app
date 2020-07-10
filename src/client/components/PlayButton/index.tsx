import isNull from "lodash/isNull"
import { createElement, FC } from "react"
import { createBem, BemInput } from "@oly_op/bem"
import { useApolloClient, useMutation } from "@apollo/client"

import Icon from "../Icon"
import { User, Doc } from "../../types"
import { determineDocId } from "../../helpers"
import { useUserContext } from "../../contexts/User"
import { usePlayContext } from "../../contexts/Play"
import USER_PLAY from "../../graphql/mutations/userPlay.gql"
import USER_CURRENT_FRAG from "../../graphql/fragments/userCurrent.gql"

const bem = createBem("PlayButton")

const PlayButton: FC<PropTypes> = ({ doc, className }) => {
	console.log("PlayButton")
	const userId = useUserContext()
	const client = useApolloClient()
	const docId = determineDocId(doc)
	const { play, setPlay, togglePlay } = usePlayContext()

	const user =
		client.readFragment<User>({
			id: userId,
			fragment: USER_CURRENT_FRAG,
		})

	const isCurrent = isNull(user) || isNull(user.current) ?
		false : user.current.songId === docId

	const [ userPlay ] =
		useMutation<Data, Variables>(
			USER_PLAY,
			{ variables: { userId, docId } },
		)

	const handleClick = () => {
		if (isCurrent) {
			togglePlay()
		} else {
			userPlay()
				.then(() => setPlay(true))
				.catch(console.error)
		}
	}

	const icon = isCurrent && play ? "pause" : "play_arrow"

	return (
		<Icon
			icon={icon}
			title="Play"
			onClick={handleClick}
			className={bem(className, "IconHover")}
		/>
	)
}

interface Data {
	userPlay: User,
}

interface Variables {
	docId: string,
	userId: string,
}

interface PropTypes {
	doc: Doc,
	className?: BemInput,
}

export default PlayButton