import { createElement, FC } from "react"
import { createBem, BemInput, BemPropTypes } from "@oly_op/bem"

import {
	togglePlay,
	updatePlay,
	useDispatch,
	useStatePlay,
} from "../../../redux"

import Icon from "../../Icon"
import { User } from "../../../types"
import USER_PREV from "./userPrev.gql"
import USER_NEXT from "./userNext.gql"
import { useMutation, useResetPlayer } from "../../../hooks"

import "./index.scss"

const bem = createBem("BarControls")

const BarControls: FC<PropTypes> = ({ className, iconClassName }) => {
	const play = useStatePlay()
	const dispatch = useDispatch()
	const resetPlayer = useResetPlayer()

	const [ userPrev, { loading: prevLoading } ] =
		useMutation<UserPrevData>(USER_PREV)

	const [ userNext, { loading: nextLoading } ] =
		useMutation<UserNextData>(USER_NEXT)

	const loading = prevLoading || nextLoading

	const handlePrevClick =
		async () => {
			resetPlayer()
			await userPrev()
			dispatch(updatePlay(true))
		}

	const handleNextClick =
		async () => {
			resetPlayer()
			await userNext()
			dispatch(updatePlay(true))
		}

	const handlePlayClick =
		() => {
			dispatch(togglePlay())
		}

	return (
		<div className={bem(className, "")}>
			<Icon
				icon="skip_previous"
				className={bem(iconClassName)}
				onClick={loading ? undefined : handlePrevClick}
			/>
			<Icon
				className={bem(iconClassName)}
				icon={play ? "pause" : "play_arrow"}
				onClick={loading ? undefined : handlePlayClick}
			/>
			<Icon
				icon="skip_next"
				className={bem(iconClassName)}
				onClick={loading ? undefined : handleNextClick}
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