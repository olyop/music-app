import { createElement, FC } from "react"

import { reactBem } from "../../helpers"
import { BemInputType } from "../../types"

import "./index.scss"

const bem = reactBem("Spinner")

const Spinner: FC<PropTypes> = ({ className = null, spinClassName = null }) => (
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