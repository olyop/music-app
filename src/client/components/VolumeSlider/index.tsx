import { createBem } from "@oly_op/bem"
import { createElement, ChangeEventHandler } from "react"

import {
	useDispatch,
	updateVolume,
	useStateVolume,
} from "../../redux"

import Icon from "../Icon"

import "./index.scss"

const bem = createBem("VolumeSlider")

const VolumeSlider = () => {
	const dispatch = useDispatch()
	const volume = useStateVolume()
	const handleChange: HandleChange = event =>
		dispatch(updateVolume(parseInt(event.target.value)))
	return (
		<div className={bem("", "Elevated")}>
			<Icon
				icon="volume_up"
				className={bem("button")}
			/>
			<input
				min={0}
				step={10}
				max={100}
				type="range"
				value={volume}
				onChange={handleChange}
				className={bem("slider")}
			/>
			<Icon
				icon="volume_down"
				className={bem("button")}
			/>
		</div>
	)
}

type HandleChange = ChangeEventHandler<HTMLInputElement>

export default VolumeSlider