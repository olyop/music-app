import { Link } from "react-router-dom"
import { createElement, FC } from "react"
import { createBem, BemInput, BemPropTypes } from "@oly_op/bem"

import Img from "../Img"
import { Handler } from "../../types"

import "./index.scss"

const bem = createBem("Cover")

const Cover: FC<PropTypes> = ({
	url,
	link,
	title,
	onClick,
	children,
	className,
	imgClassName,
	landscape = false,
}) => (
	<Img
		url={url}
		title={title}
		onClick={onClick}
		imgClassName={bem(imgClassName, "img")}
		className={bem(landscape ? "landscape" : null, className, "")}
	>
		<Link
			to={link}
			className={bem("link")}
		/>
		{children}
	</Img>
)

interface PropTypes extends BemPropTypes {
	url: string,
	link: string,
	title: string,
	onClick?: Handler,
	landscape?: boolean,
	imgClassName?: BemInput,
}

export default Cover