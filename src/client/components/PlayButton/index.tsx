import { createElement, FC } from "react"
import { useMutation } from "@apollo/react-hooks"
import { createBem, BemInput } from "@oly_op/bem"

import Icon from "../Icon"
import ApiError from "../ApiError"
import { determineDocId } from "../../helpers"
import { User, UserDoc, Song } from "../../types"
import { useUserContext } from "../../contexts/User"
import { usePlayContext } from "../../contexts/Play"
import USER_PLAY from "../../graphql/mutations/userPlay.gql"

const bem = createBem("PlayButton")

const PlayButton: FC<PropTypes> = ({ doc, className }) => {
	const docId = determineDocId(doc)
	const isCurrent = "isCurrent" in doc ? doc.isCurrent : false

	const userId = useUserContext()
	const { play, togglePlay } = usePlayContext()

	const [ userPlay, { error } ] =
		useMutation<User, Variables>(USER_PLAY, { variables: { userId, docId } })

	if (error) {
		return <ApiError error={error}/>
	}

	const handleClick = () => (isCurrent ? togglePlay : userPlay)()
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

interface Variables {
	docId: string,
	userId: string,
}

interface PropTypes {
	doc: UserDoc | Song,
	className?: BemInput,
}

export default PlayButton