import { createBem } from "@oly_op/bem"
import { createElement, FC } from "react"

import Button from "@material-ui/core/Button"
import AddCircle from "@material-ui/icons/AddCircle"

import "./index.scss"

const bem = createBem("Add")

const Add: FC = () => (
	<div className={bem("")}>
		<Button
			size="large"
			color="primary"
			variant="outlined"
			children="Add files"
			startIcon={<AddCircle/>}
		/>
	</div>
)

export default Add