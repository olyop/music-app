import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import Button from "../../Button"
import { ModalButton as TModalButton } from "../../../types"

import "./index.scss"

const bem = createBem("ModalButton")

const ModalButton: FC<PropTypes> = ({ button, onClose }) => {
	const handleClick = () => {
		button.handler!()
		onClose()
	}
	return (
		<Button
			key={button.text}
			icon={button.icon}
			text={button.text}
			spanClassName={bem("span")}
			className={bem("", "PaddingHalf")}
			onClick={button.handler ? handleClick : undefined}
		/>
	)
}

interface PropTypes {
	onClose: () => void,
	button: TModalButton,
}

export default ModalButton