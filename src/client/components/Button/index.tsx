import { createElement, FC } from "react"

import Icon from "../Icon"
import { reactBem } from "../../helpers"
import { BemInputType } from "../../types"

import "./index.scss"

const bem = reactBem("Button")

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

type PropTypes = {
	icon?: string,
	text?: string,
	onClick?: () => void,
	className: BemInputType,
}

export default Button