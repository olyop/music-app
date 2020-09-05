import { createElement, FC } from "react"
import { createBem, BemInput, BemPropTypes } from "@oly_op/bem"

import "./index.scss"

const bem = createBem("Img")

const Img: FC<PropTypes> = ({ url, title, children, className, imgClassName }) => (
	<div className={bem(className, "")} title={title}>
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
	imgClassName?: BemInput,
}

export default Img