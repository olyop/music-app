import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import Icon from "../Icon"
import { UserDoc } from "../../types"
import { usePlay } from "../../helpers"

const bem = createBem("PlayButton")

const PlayButton: FC<PropTypes> = ({ doc, className }) => {
	const [ play, handleClick ] = usePlay(doc)
	return (
		<Icon
			title="Play"
			onClick={handleClick}
			className={bem(className, "Hover")}
			icon={play ? "pause" : "play_arrow"}
		/>
	)
}

interface PropTypes extends BemPropTypes {
	doc: UserDoc,
}

export default PlayButton