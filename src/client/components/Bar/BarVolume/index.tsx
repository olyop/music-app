import {
	FC,
	Fragment,
	createElement,
	ChangeEventHandler,
} from "react"

import { createBem } from "@oly_op/bem"

import {
	useDispatch,
	updateVolume,
	useStateVolume,
	toggleShowVolume,
	useStateShowVolume,
} from "../../../redux"

import Icon from "../../Icon"
import Modal from "../../Modal"

import "./index.scss"

const bemBar = createBem("Bar")
const bem = createBem("BarVolume")

const BarVolume: FC = () => {
	const dispatch = useDispatch()
	const volume = useStateVolume()
	const showVolume = useStateShowVolume()

	const handleVolumeMute = () =>
		dispatch(updateVolume(0))
	const handleVolumeFull = () =>
		dispatch(updateVolume(100))
	const handleVolumeClick = () =>
		dispatch(toggleShowVolume())
	const handleChange: HandleChange = event =>
		dispatch(updateVolume(parseInt(event.target.value)))

	return (
		<Fragment>
			{showVolume && (
				<Modal onClose={handleVolumeClick}>
					<div className={bem("", "Elevated")}>
						<Icon
							icon="volume_up"
							className={bem("button")}
							onClick={handleVolumeFull}
						/>
						<input
							min={0}
							step={1}
							max={100}
							type="range"
							value={volume}
							onChange={handleChange}
							className={bem("slider")}
						/>
						<Icon
							icon="volume_down"
							className={bem("button")}
							onClick={handleVolumeMute}
						/>
					</div>
				</Modal>
			)}
			<Icon
				title="Volume"
				icon="volume_up"
				onClick={handleVolumeClick}
				className={bemBar("main-controls-control", "icon")}
			/>
		</Fragment>
	)
}

type HandleChange = ChangeEventHandler<HTMLInputElement>

export default BarVolume