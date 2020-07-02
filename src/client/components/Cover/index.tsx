import { createElement, FC } from "react"
import { createBem, BemInput } from "@oly_op/bem"

import Img from "../Img"
import IconText from "../IconText"

import "./index.scss"

const bem = createBem("Cover")

const Cover: FC<PropTypes> = ({
	url,
	children,
	className,
	imgClassName,
	landscape = false,
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

interface PropTypes {
	url: string,
	landscape?: boolean,
	className?: BemInput,
	imgClassName?: BemInput,
}

export default Cover