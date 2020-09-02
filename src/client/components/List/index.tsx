import { createElement, FC, ReactNode } from "react"
import { createBem, BemInput } from "@oly_op/bem"

import { ListStyle } from "../../types"
import { useSettingsContext } from "../../contexts/Settings"

const bem = createBem("List")

const List: FC<PropTypes> = ({ children, className }) => {
	const { settings: { listStyle } } = useSettingsContext()
	const listClassName = listStyle === ListStyle.GRID ? "Grid" : "Elevated"
	return (
		<div className={bem(className, listClassName)}>
			{children}
		</div>
	)
}

interface PropTypes {
	children: ReactNode,
	className?: BemInput,
}

export default List