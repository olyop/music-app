import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import "./index.scss"

const bem = createBem("Modal")

const Modal: FC<PropTypes> = ({ children, onClose }) => (
	<div className={bem("")}>
		<div
			onClick={onClose}
			className={bem("black")}
		/>
		<div className={bem("content", "Elevated")}>
			{children}
		</div>
	</div>
)

interface PropTypes {
	onClose: () => void,
}

export default Modal