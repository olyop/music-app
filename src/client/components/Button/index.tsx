import { createElement, FC } from "react"
import { createBem, BemInput } from "@oly_op/bem"

import Icon from "../Icon"

import "./index.scss"

const bem = createBem("Button")

const Button: FC<PropTypes> = ({
	text,
	icon,
	title,
	onClick,
	className,
	iconClassName,
	textClassName,
}) => (
	<button
		type="button"
		onClick={onClick}
		title={title || text}
		className={bem(className, "", "Hover")}
	>
		{icon && (
			<Icon
				icon={icon}
				className={bem(iconClassName, "icon")}
			/>
		)}
		{(icon && text) ? (
			<span className={bem("space")}/>
		) : null}
		{text && (
			<span
				children={text}
				className={bem(textClassName, "text")}
			/>
		)}
	</button>
)

interface PropTypes {
	icon?: string,
	text?: string,
	title?: string,
	onClick?: () => void,
	className?: BemInput,
	iconClassName?: BemInput,
	textClassName?: BemInput,
}

export default Button