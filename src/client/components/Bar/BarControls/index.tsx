import { createElement, FC } from "react"
import { createBem, BemInput, BemPropTypes } from "@oly_op/bem"

import {
	updatePlay,
	togglePlay,
	useDispatch,
	useStatePlay,
	useStateUserId,
} from "../../../redux"

import Icon from "../../Icon"
import USER_PREV from "./userPrev.gql"
import USER_NEXT from "./userNext.gql"
import { User, UserVar } from "../../../types"
import { useMutation } from "../../../helpers"

import "./index.scss"

const bem = createBem("BarControls")

const BarControls: FC<PropTypes> = ({ className, iconClassName }) => {
	const play = useStatePlay()
	const dispatch = useDispatch()
	const userId = useStateUserId()

	const variables: UserVar = { userId }

	const [ userPrev, { loading: prevLoading } ] =
		useMutation<UserPrevData, UserVar>(USER_PREV, { variables })

	const [ userNext, { loading: nextLoading } ] =
		useMutation<UserNextData, UserVar>(USER_NEXT, { variables })

	const handlePrevClick =
		() => {
			if (!prevLoading || !nextLoading) {
				dispatch(updatePlay(false))
				userPrev()
			}
		}

	const handlePlayClick =
		() => dispatch(togglePlay())

	const handleNextClick =
		async () => {
			if (!nextLoading || !prevLoading) {
				dispatch(updatePlay(false))
				await userNext()
			}
		}

	return (
		<div className={bem(className, "")}>
			<Icon
				icon="skip_previous"
				onClick={handlePrevClick}
				className={bem(iconClassName)}
			/>
			<Icon
				onClick={handlePlayClick}
				className={bem(iconClassName)}
				icon={play ? "pause" : "play_arrow"}
			/>
			<Icon
				icon="skip_next"
				className={bem(iconClassName)}
				onClick={handleNextClick}
			/>
		</div>
	)
}

interface UserPrevData {
	userPrev: User,
}

interface UserNextData {
	userNext: User,
}

interface PropTypes extends BemPropTypes {
	iconClassName?: BemInput,
}

export default BarControls