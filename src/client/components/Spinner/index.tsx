import { createElement, FC } from "react"
import { createBem, BemInputType } from "@oly_op/bem"

import "./index.scss"

const bem = createBem("Spinner")

const Spinner: FC<PropTypes> = ({ className, spinClassName }) => (
	<div className={bem(className, "")}>
		<div className={bem(spinClassName, "spin")}/>
		<div className={bem(spinClassName, "spin")}/>
		<div className={bem(spinClassName, "spin")}/>
	</div>
)

type PropTypes = {
	className?: BemInputType,
	spinClassName?: BemInputType,
}

export default Spinner