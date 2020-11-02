import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import Icon from "../Icon"
import { useDispatch, changeModal, useStateModal } from "../../redux"

const bemBar = createBem("Bar")

const BarVolume: FC = () => {
	const modal = useStateModal()
	const dispatch = useDispatch()
	const handleClick = () => dispatch(changeModal({ volume: true }))
	return (
		<Icon
			title="Volume"
			onClick={handleClick}
			icon={modal?.volume ? "close" : "volume_up"}
			className={bemBar("main-content-controls-control", "icon")}
		/>
	)
}

export default BarVolume