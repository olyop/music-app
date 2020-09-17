import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import { ListStyle } from "../../types"
import { useStateListStyle } from "../../redux"

const bem = createBem("List")

const List: FC<BemPropTypes> = ({ children, className }) => {
	const listStyle = useStateListStyle()
	const isGrid = listStyle === ListStyle.GRID
	return (
		<div
			children={children}
			className={bem(className, isGrid && "Grid")}
		/>
	)
}

export default List