import { createElement, FC } from "react"
import { createBem, BemInput } from "@oly_op/bem"

import { Handler } from "../../types"
import ModalHeader, { ModalHeaderPropTypes } from "./ModalHeader"
import ModalButton, { ModalButtonPropTypes } from "./ModalButton"

import "./index.scss"

const bem = createBem("Modal")

const Modal: FC<ModalPropTypes> = ({
	header,
	onClose,
	children,
	contentClassName,
}) => (
	<div className={bem("")}>
		<div
			onClick={onClose}
			className={bem("black")}
		/>
		<div className={bem(contentClassName, "content", "Elevated")}>
			{header && <ModalHeader onClose={onClose} {...header}/>}
			{children}
		</div>
	</div>
)

export interface ModalPropTypes {
	onClose: Handler,
	contentClassName?: BemInput,
	header?: ModalHeaderPropTypes,
}

export { ModalHeaderPropTypes }
export { ModalButton, ModalButtonPropTypes }

export default Modal