import { createElement, FC } from "react"
import { createBem, BemPropTypes } from "@oly_op/bem"

import { ListStyle } from "../../types"
import { useStateListStyle } from "../../redux"

import "./index.scss"

const bem = createBem("List")

const List: FC<BemPropTypes> = ({ children, className }) => {
	const listStyle = useStateListStyle()
	const isGrid = listStyle === ListStyle.GRID
	return (
		<div className={bem(className, isGrid && "grid")}>
			{children}
		</div>
	)
}

export default List