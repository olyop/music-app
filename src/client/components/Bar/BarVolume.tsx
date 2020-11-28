import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import {
	useDispatch,
	changeModal,
	useStateVolume,
} from "../../redux"

import Icon from "../Icon"

const bemBar = createBem("Bar")

const BarVolume: FC = () => {
	const dispatch = useDispatch()
	const volume = useStateVolume()
	const handleClick = () => dispatch(changeModal({ volume: true }))
	return (
		<Icon
			title="Volume"
			onClick={handleClick}
			icon={volume === 0 ? "volume_off" : "volume_up"}
			className={bemBar("main-content-controls-control", "icon")}
		/>
	)
}

export default BarVolume