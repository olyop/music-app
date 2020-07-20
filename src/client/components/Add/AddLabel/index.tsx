import { createBem, BemInput } from "@oly_op/bem"
import { createElement, FC, ReactNode } from "react"

import "./index.scss"

const bem = createBem("AddLabel")

const AddLabel: FC<PropTypes> = ({ children, className }) => (
	<p className={bem(className, "")}>
		{children}
	</p>
)

interface PropTypes {
	children: ReactNode,
	className: BemInput,
}

export default AddLabel