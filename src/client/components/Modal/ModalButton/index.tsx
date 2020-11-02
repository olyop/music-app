import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import Button from "../../Button"
import { ModalButton as TModalButton } from "../../../types"

import "./index.scss"

const bem = createBem("ModalButton")

const ModalButton: FC<PropTypes> = ({ button, onClose }) => (
	<Button
		key={button.text}
		icon={button.icon}
		text={button.text}
		className={bem("", "PaddingHalf")}
		spanClassName={bem("span")}
		onClick={() => {
			button.handler()
			onClose()
		}}
	/>
)

interface PropTypes {
	onClose: () => void,
	button: TModalButton,
}

export default ModalButton