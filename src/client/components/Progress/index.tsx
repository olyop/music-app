import { createBem, BemPropTypes } from "@oly_op/bem"
import { createElement, ChangeEventHandler, FC } from "react"
import deserializeDuration from "@oly_op/music-app-common/deserializeDuration"

import {
	useDispatch,
	updateCurrent,
	useStateCurrent,
} from "../../redux"

import "./index.scss"

const bem = createBem("Progress")

const Progress: FC<PropTypes> = ({ duration, className }) => {
	const dispatch = useDispatch()
	const current = useStateCurrent()
	const handleChange: HandleChange = event =>
		dispatch(updateCurrent(parseInt(event.target.value)))
	return (
		<div className={bem(className, "")}>
			<p
				className={bem("text", "Text")}
				children={deserializeDuration(current)}
			/>
			<input
				min={0}
				step={1}
				type="range"
				max={duration}
				value={current}
				onChange={handleChange}
				className={bem("slider")}
			/>
			<p
				className={bem("text", "Text")}
				children={deserializeDuration(duration)}
			/>
		</div>
	)
}

type HandleChange = ChangeEventHandler<HTMLInputElement>

interface PropTypes extends BemPropTypes {
	duration: number,
}

export default Progress