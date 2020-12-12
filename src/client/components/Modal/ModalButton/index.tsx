import { Link } from "react-router-dom"
import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import Button from "../../Button"
import { ModalButton as TModalButton } from "../../../types"

import "./index.scss"

const bem = createBem("ModalButton")

const ModalButton: FC<PropTypes> = ({ button, onClose }) => {
	const handleClick = () => {
		if (button.handler) {
			button.handler()
			onClose()
		}
	}

	const jsx = (
		<Button
			key={button.text}
			icon={button.icon}
			text={button.text}
			onClick={handleClick}
			spanClassName={bem("span")}
			className={bem("", "PaddingHalf")}
		/>
	)

	return button.link ? (
		<Link
			children={jsx}
			to={button.link}
			onClick={onClose}
		/>
	) : jsx
}

interface PropTypes {
	onClose: () => void,
	button: TModalButton,
}

export default ModalButton