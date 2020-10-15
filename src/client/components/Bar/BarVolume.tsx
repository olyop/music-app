import { createBem } from "@oly_op/bem"
import { createElement, Fragment, FC } from "react"

import {
	useDispatch,
	toggleShowVolume,
	useStateShowVolume,
} from "../../redux"

import Icon from "../Icon"
import Modal from "../Modal"
import VolumeSlider from "../VolumeSlider"

const bem = createBem("Bar")

const BarVolume: FC = () => {
	const dispatch = useDispatch()
	const showVolume = useStateShowVolume()
	const handleVolumeClick = () => dispatch(toggleShowVolume())
	return (
		<Fragment>
			{showVolume && (
				<Modal onClose={handleVolumeClick}>
					<VolumeSlider/>
				</Modal>
			)}
			<Icon
				title="Volume"
				icon="volume_up"
				onClick={handleVolumeClick}
				className={bem(
					"main-controls-control",
					"icon",
					"IconHover",
				)}
			/>
		</Fragment>
	)
}

export default BarVolume