import { createElement, FC } from "react"

import { reactBem } from "../../helpers"

import "./index.scss"

const bem = reactBem("Img")

const Img: FC<PropTypes> = ({ url, children, className, imgClassName }) => (
	<div className={bem(className, "")}>
		<div
			className={bem(imgClassName, "img")}
			style={{ backgroundImage: `url(${url})` }}
		/>
		{children}
	</div>
)

type PropTypes = {
	url: string,
	className?: string,
	imgClassName?: string,
}

export default Img