import { Link } from "react-router-dom"
import { createElement, FC, Fragment } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import Button from "../../Button"
import { ModalButton as TModalButton } from "../../../types"

import "./index.scss"

const bem = createBem("ModalButton")

const ModalButton: FC<PropTypes> = ({ button, onClose, className }) => {
	const handleClick = () => {
		if (button.handler) {
			button.handler()
			onClose()
		}
	}

	const classNamee = bem(
		className,
		"",
		button.link ? "Button" : undefined,
		"PaddingHalf",
	)

	const jsx = (
		<Button
			key={button.text}
			icon={button.icon}
			text={button.text}
			onClick={handleClick}
			spanClassName={bem("span")}
			className={button.link ? bem("none") : classNamee}
		/>
	)

	return button.link ? (
		<Fragment>
			{button.externalLink ? (
				<a
					download
					children={jsx}
					href={button.link}
					className={classNamee}
				/>
			) : (
				<Link
					children={jsx}
					to={button.link}
					onClick={onClose}
					className={classNamee}
				/>
			)}
		</Fragment>
	) : jsx
}

interface PropTypes extends BemPropTypes {
	onClose: () => void,
	button: TModalButton,
}

export default ModalButton