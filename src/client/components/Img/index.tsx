import { createElement, ReactNode, FC } from "react"

import reactBem from "../../helpers/reactBem"

import "./index.scss"

const bem = reactBem("Img")

type PropTypes = {
	url: string,
	className?: string,
	children?: ReactNode,
	imgClassName?: string,
}

const Img: FC<PropTypes> = ({
	url,
	children = null,
	className = null,
	imgClassName = null,
}) => (
	<div className={bem(className, "")}>
		<div
			className={bem(imgClassName, "img")}
			style={{ backgroundImage: `url(${url})` }}
		/>
		{children}
	</div>
)

export default Img