import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import { ModalButton as TModalButton } from "../../types"

import "./index.scss"

const bem = createBem("ModalButton")

const ModalButton: FC<PropTypes> = ({ button, onClose }) => (
	<button
		type="button"
		key={button.text}
		children={button.text}
		className={bem("", "PaddingHalf Text2")}
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