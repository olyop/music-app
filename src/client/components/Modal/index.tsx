import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import "./index.scss"

const bem = createBem("Modal")

const Modal: FC<PropTypes> = ({ onClick, className, children }) => (
	<div className={bem("")}>
		<div className={bem("inner")}>
			<div
				className={bem("black")}
				onClick={() => onClick()}
			/>
			<div className={bem(className, "content", "Elevated")}>
				{children}
			</div>
		</div>
	</div>
)

interface PropTypes extends BemPropTypes {
	onClick: () => void,
}

export default Modal