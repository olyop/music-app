import { createElement, FC } from "react"
import { createBem, BemInput } from "@oly_op/bem"

import Icon from "../../Icon"

import "./index.scss"

const bem = createBem("AddValid")

const AddValid: FC<PropTypes> = ({ isValid, className }) => (
	<Icon
		className={bem(className, "")}
		icon={isValid ? "done" : "close"}
		style={{ color: isValid ? "green" : "red" }}
	/>
)

interface PropTypes {
	isValid: boolean,
	className: BemInput,
}

export default AddValid