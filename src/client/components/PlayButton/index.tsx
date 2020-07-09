import isNull from "lodash/isNull"
import { createElement, FC } from "react"
import { createBem, BemInput } from "@oly_op/bem"
import { useApolloClient, useMutation } from "@apollo/client"

import Icon from "../Icon"
import { User, Doc, Song } from "../../types"
import { determineDocId } from "../../helpers"
import { useUserContext } from "../../contexts/User"
import { usePlayContext } from "../../contexts/Play"
import USER_PLAY from "../../graphql/mutations/userPlay.gql"
import USER_CURRENT_FRAG from "../../graphql/fragments/userCurrent.gql"
import SONG_IS_CURRENT_FRAG from "../../graphql/fragments/songIsCurrent.gql"

const bem = createBem("PlayButton")

const PlayButton: FC<PropTypes> = ({ doc, className }) => {
	const client = useApolloClient()
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
			const { current } =
				client.readFragment<User>({
					id: userId,
					variables: { userId },
					fragment: USER_CURRENT_FRAG,
				})!
			if (!isNull(current)) {
				client.writeFragment({
					id: current.songId,
					variables: { userId },
					fragment: SONG_IS_CURRENT_FRAG,
					data: { isCurrent: false, __typename: "Song" },
				})
			}
			userPlay()
				.then(() => play || togglePlay())
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