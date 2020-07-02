import { createBem, BemInput } from "@oly_op/bem"
import { createElement, ReactNode, FC } from "react"

import { ListStyleEnum } from "../../types"
import { useListStyleContext } from "../../contexts/ListStyle"

const bem = createBem("List")

const List: FC<PropTypes> = ({ children, className }) => {
	const { listStyle } = useListStyleContext()
	const listClassName = listStyle === ListStyleEnum.grid ? "Grid" : "Elevated"
	return (
		<div className={bem(className, listClassName, "")}>
			{children}
		</div>
	)
}

interface PropTypes {
	children: ReactNode,
	className?: BemInput,
}

export default List