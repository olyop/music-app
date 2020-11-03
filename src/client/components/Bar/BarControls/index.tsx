import { createElement, FC } from "react"
import { createBem, BemInput, BemPropTypes } from "@oly_op/bem"

import {
	togglePlay,
	useDispatch,
	useStatePlay,
	useStateUserId,
} from "../../../redux"

import Icon from "../../Icon"
import USER_PREV from "./userPrev.gql"
import USER_NEXT from "./userNext.gql"
import { useMutation } from "../../../helpers"

import "./index.scss"

const bem = createBem("BarControls")

const BarControls: FC<PropTypes> = ({ className, iconClassName }) => {
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
				className={bem(iconClassName)}
			/>
			<Icon
				onClick={handlePlayClick}
				icon={play ? "pause" : "play_arrow"}
				className={bem(iconClassName)}
			/>
			<Icon
				icon="skip_next"
				onClick={handleNextClick}
				className={bem(iconClassName)}
			/>
		</div>
	)
}

interface PropTypes extends BemPropTypes {
	iconClassName?: BemInput,
}

export default BarControls