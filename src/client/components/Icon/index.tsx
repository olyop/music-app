import { createRipples } from "react-ripples"
import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import "./index.scss"

const bem = createBem("Icon")

const Ripples = createRipples({ during: 700 })

const Icon: FC<PropTypes> = ({ icon, title, onClick, className }) => (
	<Ripples
		// @ts-ignore
		title={title}
		children={icon}
		onClick={onClick}
		className={bem(
			className,
			"",
			{ ignore: true, className: "material-icons" },
		)}
	/>
)

interface PropTypes extends BemPropTypes {
	icon: string,
	title?: string,
	onClick?: () => void,
}

export default Icon