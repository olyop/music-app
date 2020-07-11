import isNull from "lodash/isNull"
import { createElement, FC } from "react"
import isUndefined from "lodash/isUndefined"
import { useMutation } from "@apollo/client"
import { createBem, BemInput } from "@oly_op/bem"

import Icon from "../Icon"
import QueryApi from "../QueryApi"
import { determineDocId } from "../../helpers"
import { User, Song, UserDoc } from "../../types"
import { useUserContext } from "../../contexts/User"
import { usePlayContext } from "../../contexts/Play"
import USER_PLAY from "../../graphql/mutations/userPlay.gql"
import GET_USER_CURRENT from "../../graphql/queries/userCurrent.gql"

const bem = createBem("PlayButton")

const PlayButton: FC<PropTypes> = ({ doc, className }) => {
	const userId =
		useUserContext()
	const docId =
		determineDocId(doc)
	const { play, setPlay, togglePlay } =
		usePlayContext()
	const [ userPlay ] =
		useMutation<UserPlayRes>(USER_PLAY, {
			variables: { userId, docId },
			optimisticResponse: {
				userPlay: {
					userId,
					__typename: "User",
					current: doc as Song,
				},
			},
		})
	return (
		<QueryApi
			query={GET_USER_CURRENT}
			spinner={false}
			children={
				(res: UserCurrentRes) => {
					const isCurrent = isUndefined(res) || isNull(res.user.current) ?
						false : res.user.current.songId === docId
					const icon = isCurrent && play ?
						"pause" : "play_arrow"
					const handleClick = () =>
						(isCurrent ? togglePlay() : userPlay().then(() => setPlay(true)))
					return (
						<Icon
							icon={icon}
							title="Play"
							onClick={handleClick}
							className={bem(className, "IconHover")}
						/>
					)
				}
			}
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