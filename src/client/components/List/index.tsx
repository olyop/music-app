import { createElement, FC, ReactNode } from "react"
import { createBem, BemInput } from "@oly_op/bem"

import { ListStyleEnum } from "../../types"
import { useSettingsContext } from "../../contexts/Settings"

const bem = createBem("List")

const List: FC<PropTypes> = ({ children, className }) => {
	const { settings: { listStyle } } = useSettingsContext()
	const listClassName = listStyle === ListStyleEnum.GRID ? "Grid" : "Elevated"
	return (
		<div className={bem(listClassName, className, "")}>
			{children}
		</div>
	)
}

interface PropTypes {
	className?: BemInput,
	children: ReactNode, // required prop as "FC" does not
}

export default List