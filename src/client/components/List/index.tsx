import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import { ListStyle } from "../../types"
import { useStateListStyle } from "../../redux"

const bem = createBem("List")

const List: FC<BemPropTypes> = ({ children, className }) => {
	const listStyle = useStateListStyle()
	const listClassName = listStyle === ListStyle.GRID ? "Grid" : "Elevated"
	return (
		<div className={bem(className, listClassName)}>
			{children}
		</div>
	)
}

export default List