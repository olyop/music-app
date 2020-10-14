import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import { ModalButton } from "../../types"

import "./index.scss"

const bem = createBem("Modal")

const Modal: FC<PropTypes> = ({
	onClose,
	children,
	className,
	buttons = [],
}) => (
	<div className={bem("")}>
		<div className={bem("inner")}>
			<div
				onClick={onClose}
				className={bem("black")}
			/>
			<div className={bem(className, "content", "Elevated")}>
				{buttons.map(
					({ text, handler }) => (
						<button
							key={text}
							type="button"
							children={text}
							className={bem("content-button", "PaddingHalf Text2")}
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