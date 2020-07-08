import { createElement, FC } from "react"
import { useMutation } from "@apollo/react-hooks"
import { createBem, BemInput } from "@oly_op/bem"

import Icon from "../Icon"
import { User, Doc, Song } from "../../types"
import { determineDocId } from "../../helpers"
import { useUserContext } from "../../contexts/User"
import { usePlayContext } from "../../contexts/Play"
import USER_PLAY from "../../graphql/mutations/userPlay.gql"

const bem = createBem("PlayButton")

const PlayButton: FC<PropTypes> = ({ doc, className }) => {
	const docId = determineDocId(doc)
	const isCurrent = "isCurrent" in doc ? doc.isCurrent : false

	const userId = useUserContext()
	const { play, togglePlay } = usePlayContext()

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
				.then(togglePlay)
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

interface PropTypes {
	doc: Doc | Song,
	className?: BemInput,
}

interface Data {
	userPlay: User,
}

interface Variables {
	docId: string,
	userId: string,
}

export default PlayButton