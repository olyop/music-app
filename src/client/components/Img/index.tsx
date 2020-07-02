import { createElement, FC } from "react"
import { createBem, BemInput } from "@oly_op/bem"

import "./index.scss"

const bem = createBem("Img")

const Img: FC<PropTypes> = ({ url, children, className, imgClassName }) => (
	<div className={bem(className, "")}>
		<div
			className={bem(imgClassName, "img")}
			style={{ backgroundImage: `url(${url})` }}
		/>
		{children}
	</div>
)

interface PropTypes {
	url: string,
	className?: BemInput,
	imgClassName?: BemInput,
}

export default Img