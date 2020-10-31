import { createElement, FC } from "react"
import { createBem, BemInput, BemPropTypes } from "@oly_op/bem"

import "./index.scss"

const bem = createBem("Button")

const Button: FC<PropTypes> = ({
	icon,
	text,
	onClick,
	className,
	spanClassName,
	iconClassName,
	textClassName,
}) => (
	<button
		type="button"
		title={text}
		onClick={onClick}
		className={bem(className, "")}
	>
		<i
			children={icon}
			className={bem(
				iconClassName,
				spanClassName,
				"icon",
				{ ignore: true, className: "material-icons" },
			)}
		/>
		{icon && text && (
			<div className={bem("spacer")}/>
		)}
		<span
			children={text}
			className={bem(
				textClassName,
				spanClassName,
				"text",
			)}
		/>
	</button>
)

interface PropTypes extends BemPropTypes {
	icon?: string,
	text?: string,
	onClick?: () => void,
	spanClassName?: BemInput,
	iconClassName?: BemInput,
	textClassName?: BemInput,
}

export default Button