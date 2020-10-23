import { createElement, FC } from "react"
import { createBem, BemInput, BemPropTypes } from "@oly_op/bem"

import "./index.scss"

const bem = createBem("Icon")

const Button: FC<PropTypes> = ({
	icon,
	text,
	onClick,
	className,
	iconClassName,
	textClassName,
}) => (
	<button
		type="button"
		title={text}
		onClick={onClick}
		className={bem(className, "")}
	>
		<i className={bem("icon", "material-icons")}>
			{icon}
		</i>
		<span className={bem("text", "Text")}>
			{text}
		</span>
	</button>
)

interface PropTypes extends BemPropTypes {
	icon?: string,
	text?: string,
	onClick?: () => void,
	iconClassName: BemInput,
	textClassName: BemInput,
}

export default Button