import {
	FC,
	createElement,
	ChangeEventHandler,
} from "react"

import { createBem } from "@oly_op/bem"

import {
	useDispatch,
	updateVolume,
	useStateVolume,
} from "../../../redux"

import Icon from "../../Icon"

import "./index.scss"

const bem = createBem("ModalVolume")

const ModalVolume: FC = () => {
	const dispatch = useDispatch()
	const volume = useStateVolume()

	const handleVolumeMute = () =>
		dispatch(updateVolume(0))
	const handleVolumeFull = () =>
		dispatch(updateVolume(100))
	const handleChange: HandleChange = event =>
		dispatch(updateVolume(parseInt(event.target.value)))

	return (
		<div className={bem("")}>
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
				icon="volume_off"
				className={bem("button")}
				onClick={handleVolumeMute}
			/>
		</div>
	)
}

type HandleChange = ChangeEventHandler<HTMLInputElement>

export default ModalVolume