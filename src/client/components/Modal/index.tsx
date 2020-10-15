import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import "./index.scss"

const bem = createBem("Modal")

const Modal: FC<PropTypes> = ({
	onClose,
	children,
	className,
}) => (
	<div className={bem("")}>
		<div className={bem("inner")}>
			<div
				onClick={onClose}
				className={bem("black")}
			/>
			<div className={bem(className, "content", "Elevated")}>
				{children}
			</div>
		</div>
	</div>
)

interface PropTypes extends BemPropTypes {
	onClose: () => void,
}

export default Modal