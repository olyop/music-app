import { createElement, FC } from "react"
import { createBem, BemInput } from "@oly_op/bem"

import "./index.scss"

const bem = createBem("AddLabel")

const AddLabel: FC<PropTypes> = ({ children, className }) => (
	<p className={bem(className, "")}>
		{children}
	</p>
)

interface PropTypes {
	className: BemInput,
}

export default AddLabel