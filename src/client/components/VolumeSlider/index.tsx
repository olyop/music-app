import { createBem } from "@oly_op/bem"
import { createElement, ChangeEventHandler, Fragment } from "react"

import Icon from "../Icon"
import { useVolumeContext, useShowVolumeContext } from "../../contexts"

import "./index.scss"

const bem = createBem("VolumeSlider")

const VolumeSlider = () => {
	const { volume, setVolume } =
		useVolumeContext()
	const { setShowVolume } =
		useShowVolumeContext()
	const handleChange: ChangeEventHandler<HTMLInputElement> =
		event => setVolume(parseInt(event.target.value))
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
			<div
				className={bem("close")}
				onClick={() => setShowVolume(false)}
			/>
		</Fragment>
	)
}

export default VolumeSlider