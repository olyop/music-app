import { createElement, ReactNode, FC } from "react"

import { reactBem } from "../../helpers"
import { BemInputType, ListStyleEnum } from "../../types"
import { useListStyleContext } from "../../contexts/ListStyle"

const bem = reactBem("Albums")

const List: FC<TProps> = ({ children, className }) => {
	const { listStyle } = useListStyleContext()
	const listClassName = listStyle === ListStyleEnum.grid ? "Grid" : "Elevated"
	return (
		<div className={bem(className, listClassName)}>
			{children}
		</div>
	)
}

type TProps = {
	children: ReactNode,
	className?: BemInputType,
}

export default List