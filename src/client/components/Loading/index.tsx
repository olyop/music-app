import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import "./index.scss"

const bem = createBem("Loading")

const Loading: FC = () => (
	<div className={bem("")}>
		<div className={bem("line")}/>
		<div className={bem("subline", "asc")}/>
		<div className={bem("subline", "desc")}/>
	</div>
)

export default Loading