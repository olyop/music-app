import { createElement, Fragment, FC } from "react"

import Icon from "../Icon"
import { reactBem } from "../../helpers"

import "./index.scss"
import { BemInputType } from "../../types"

const bem = reactBem("IconText")

const IconText: FC<TProps> = ({
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

type TProps = {
	icon: string,
	text: string,
	onClick: () => void,
	className: BemInputType,
	iconClassName: BemInputType,
	textClassName: BemInputType,
}

export default IconText