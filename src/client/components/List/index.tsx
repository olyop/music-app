import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import { ListStyle } from "../../types"
import { useStateListStyle } from "../../redux"

const bem = createBem("List")

const List: FC<BemPropTypes> = ({ children, className }) => (
	<div
		className={bem(
			className,
			useStateListStyle() === ListStyle.GRID ? "Grid" : "Elevated",
		)}
		children={children}
	/>
)

export default List