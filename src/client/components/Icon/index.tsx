import { createElement, FC, CSSProperties } from "react"

import { reactBem } from "../../helpers"
import { BemInputType } from "../../types"

import "./index.scss"

const bem = reactBem("Icon")

const Icon: FC<PropTypes> = ({ icon, style, title, onClick, className }) => (
	<i
		style={style}
		title={title}
		children={icon}
		onClick={onClick}
		className={bem(
			className,
			"ButtonHover",
			"",
			{ ignore: true, className: "material-icons" },
		)}
	/>
)

type PropTypes = {
	icon: string,
	title?: string,
	onClick?: () => void,
	style?: CSSProperties,
	className?: BemInputType,
}

export default Icon