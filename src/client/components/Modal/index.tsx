import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import { ModalButton } from "../../types"

import "./index.scss"

const bem = createBem("Modal")

const Modal: FC<PropTypes> = ({ onClose, className, buttons = [], children }) => (
	<div className={bem("")}>
		<div className={bem("inner")}>
			<div
				className={bem("black")}
				onClick={() => onClose()}
			/>
			<div className={bem(className, "content", "Elevated")}>
				{buttons.map(
					({ text, handler }) => (
						<button
							key={text}
							type="button"
							children={text}
							className={bem("button", "PaddingHalf Text2")}
							onClick={() => {
								handler()
								onClose()
							}}
						/>
					),
				)}
			</div>
		</div>
	</div>
)

interface PropTypes extends BemPropTypes {
	onClose: () => void,
	buttons?: ModalButton[],
}

export default Modal