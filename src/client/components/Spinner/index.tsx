import { createElement, FC } from "react"
import { createBem, BemInput } from "@oly_op/bem"

import "./index.scss"

const bem = createBem("Spinner")

const Spinner: FC<PropTypes> = ({ className, spinClassName }) => (
	<div className={bem(className, "")}>
		<div className={bem(spinClassName, "spin")}/>
		<div className={bem(spinClassName, "spin")}/>
		<div className={bem(spinClassName, "spin")}/>
	</div>
)

interface PropTypes {
	className?: BemInput,
	spinClassName?: BemInput,
}

export default Spinner