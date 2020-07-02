import { createBem, BemInput } from "@oly_op/bem"
import { createElement, Fragment, FC } from "react"

import Icon from "../Icon"

import "./index.scss"

const bem = createBem("IconText")

const IconText: FC<PropTypes> = ({
	icon, text, onClick, className, iconClassName, textClassName,
}) => (
	<button
		type="button"
		onClick={onClick}
		className={bem(className, "", "Hover", "PaddingHalf")}
		children={(
			<Fragment>
				<Icon
					icon={icon}
					className={bem(iconClassName, "icon")}
				/>
				<span
					children={text}
					className={bem(textClassName, "text")}
				/>
			</Fragment>
		)}
	/>
)

interface PropTypes {
	icon: string,
	text: string,
	className: BemInput,
	onClick?: () => void,
	iconClassName: BemInput,
	textClassName: BemInput,
}

export default IconText