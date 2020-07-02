import { createElement, FC } from "react"
import { createBem, BemInputType } from "@oly_op/bem"

import Icon from "../Icon"

import "./index.scss"

const bem = createBem("Button")

const Button: FC<PropTypes> = ({ text, icon, onClick, className }) => (
	<button
		title={text}
		type="button"
		onClick={onClick}
		className={bem(className, "", "Hover")}
	>
		{icon && <Icon className={bem("icon")} icon={icon}/>}
		{text && <span className={bem("text")} children={text}/>}
	</button>
)

interface PropTypes {
	icon?: string,
	text?: string,
	onClick?: () => void,
	className?: BemInputType,
}

export default Button