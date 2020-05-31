import { createElement, FC, ReactNode } from "react"

import Icon from "../Icon"

import { reactBem } from "../../helpers"

import "./index.scss"

const bem = reactBem("Empty")

type PropTypes = {
	title: ReactNode,
}

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

export default Empty