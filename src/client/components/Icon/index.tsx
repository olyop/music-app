import { createBem, BemPropTypes } from "@oly_op/bem"
import { createElement, FC, CSSProperties } from "react"

import "./index.scss"

const bem = createBem("Icon")

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

interface PropTypes extends BemPropTypes {
	icon: string,
	title?: string,
	onClick?: () => void,
	style?: CSSProperties,
}

export default Icon