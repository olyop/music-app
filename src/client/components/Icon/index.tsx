import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import "./index.scss"

const bem = createBem("Icon")

const Icon: FC<PropTypes> = ({ icon, title, onClick, className }) => (
	<span
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