import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import Icon from "../Icon"
import { useStateVolume } from "../../redux"

const bemBar = createBem("Bar")

const BarVolume: FC = () => {
	const volume = useStateVolume()
	return (
		<Icon
			title="Volume"
			icon={volume === 0 ? "volume_off" : "volume_up"}
			className={bemBar("main-content-controls-control", "icon")}
		/>
	)
}

export default BarVolume