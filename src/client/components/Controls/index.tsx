import { createElement, FC } from "react"
import { useMutation } from "@apollo/client"
import { createBem, BemInput, BemPropTypes } from "@oly_op/bem"

import {
	togglePlay,
	useDispatch,
	useStatePlay,
	useStateUserId,
} from "../../redux"

import Icon from "../Icon"
import USER_PREV from "./userPrev.gql"
import USER_NEXT from "./userNext.gql"

import "./index.scss"

const bem = createBem("Controls")

const Controls: FC<PropTypes> = ({ className, iconClassName }) => {
	const play = useStatePlay()
	const dispatch = useDispatch()
	const userId = useStateUserId()

	const variables = { userId }
	const [ userPrev ] = useMutation(USER_PREV, { variables })
	const [ userNext ] = useMutation(USER_NEXT, { variables })

	const handlePrevClick = () => userPrev()
	const handlePlayClick = () => dispatch(togglePlay())
	const handleNextClick = () => userNext()

	return (
		<div className={bem(className, "")}>
			<Icon
				icon="skip_previous"
				onClick={handlePrevClick}
				className={bem(iconClassName, "icon")}
			/>
			<Icon
				onClick={handlePlayClick}
				icon={play ? "pause" : "play_arrow"}
				className={bem(iconClassName, "icon")}
			/>
			<Icon
				icon="skip_next"
				onClick={handleNextClick}
				className={bem(iconClassName, "icon")}
			/>
		</div>
	)
}

interface PropTypes extends BemPropTypes {
	iconClassName?: BemInput,
}

export default Controls