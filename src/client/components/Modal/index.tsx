import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import ModalVolume from "./ModalVolume"
import ModalButton from "./ModalButton"
import { clearModal, useDispatch, useStateModal } from "../../redux"

import "./index.scss"

const bem = createBem("Modal")

const Modal: FC = () => {
	const modal = useStateModal()
	const dispatch = useDispatch()
	const handleClose = () => dispatch(clearModal())
	return modal ? (
		<div className={bem("")}>
			<div
				onClick={handleClose}
				className={bem("black")}
			/>
			<div className={bem("content", "Elevated")}>
				{modal.volume && <ModalVolume/>}
				{modal.buttons && modal.buttons.map(
					button => (
						<ModalButton
							button={button}
							key={button.text}
							onClose={handleClose}
						/>
					),
				)}
			</div>
		</div>
	) : null
}

export default Modal