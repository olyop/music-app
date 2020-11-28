import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import Icon from "../Icon"

const bem = createBem("PlayButton")

const PlayButton: FC<PropTypes> = ({ play, onClick, className }) => (
	<Icon
		title="Play"
		onClick={onClick}
		className={bem(className, "Hover")}
		icon={play ? "pause" : "play_arrow"}
	/>
)

interface PropTypes extends BemPropTypes {
	play: boolean,
	onClick: () => void,
}

export default PlayButton