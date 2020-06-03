import { createElement, FC } from "react"

import Img from "../Img"
import IconText from "../IconText"
import { reactBem } from "../../helpers"
import { BemInputType } from "../../types"

import "./index.scss"

const bem = reactBem("Cover")

type PropTypes = {
	url: string,
	landscape?: boolean,
	className?: BemInputType,
	imgClassName?: BemInputType,
}

const Cover: FC<PropTypes> = ({
	url,
	children,
	className = null,
	landscape = false,
	imgClassName = null,
}) => (
	<Img
		url={url}
		imgClassName={bem(imgClassName, "img")}
		className={bem(landscape ? "landscape" : null, className, "")}
	>
		<IconText
			text="Shuffle"
			icon="shuffle"
			className={bem("button")}
			iconClassName={bem("button-icon")}
			textClassName={bem("button-text")}
		/>
		<IconText
			text="Next"
			icon="double_arrow"
			className={bem("button")}
			iconClassName={bem("button-icon")}
			textClassName={bem("button-text")}
		/>
		<IconText
			text="Later"
			icon="playlist_add"
			className={bem("button")}
			iconClassName={bem("button-icon")}
			textClassName={bem("button-text")}
		/>
		<IconText
			text="Queue"
			icon="queue_music"
			className={bem("button")}
			iconClassName={bem("button-icon")}
			textClassName={bem("button-text")}
		/>
		<div
			className={bem("black-box")}
		/>
		{children}
	</Img>
)

export default Cover