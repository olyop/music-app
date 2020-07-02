import { createBem } from "@oly_op/bem"
import { createElement, FC, ReactNode } from "react"

import Icon from "../Icon"

import "./index.scss"

const bem = createBem("Empty")

const Empty: FC<PropTypes> = ({ title }) => (
	<div className={bem("")}>
		<Icon
			icon="help"
			className={bem("icon")}
		/>
		<h2
			children={title}
			className={bem("title")}
		/>
	</div>
)

interface PropTypes {
	title: ReactNode,
}

export default Empty