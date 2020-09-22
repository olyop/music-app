import { createBem } from "@oly_op/bem"
import { createElement, ChangeEventHandler, Fragment } from "react"

import {
	useDispatch,
	updateVolume,
	useStateVolume,
	toggleShowVolume,
} from "../../redux"

import Icon from "../Icon"
import Modal from "../Modal"

import "./index.scss"

const bem = createBem("VolumeSlider")

const VolumeSlider = () => {
	const dispatch =
		useDispatch()
	const volume =
		useStateVolume()
	const handleClose =
		() => dispatch(toggleShowVolume())
	const handleChange: ChangeEventHandler<HTMLInputElement> =
		event => dispatch(updateVolume(parseInt(event.target.value)))
	return (
		<Fragment>
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
			<Modal
				onClose={handleClose}
			/>
		</Fragment>
	)
}

export default VolumeSlider