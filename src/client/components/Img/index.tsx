import { createElement, FC } from "react"
import { createBem, BemInput, BemPropTypes } from "@oly_op/bem"

import { Handler } from "../../types"

import "./index.scss"

const bem = createBem("Img")

const Img: FC<PropTypes> = ({
	url,
	title,
	onClick,
	children,
	className,
	imgClassName,
}) => (
	<div onClick={onClick} className={bem(className, "")} title={title}>
		<div
			className={bem(imgClassName, "img")}
			style={{ backgroundImage: `url(${url})` }}
		/>
		{children}
	</div>
)

interface PropTypes extends BemPropTypes {
	url: string,
	title?: string,
	onClick?: Handler,
	imgClassName?: BemInput,
}

export default Img