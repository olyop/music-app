import { createElement, FC } from "react"

import Button from "@material-ui/core/Button"
import withStyles from "@material-ui/core/styles/withStyles"

import { useStateContext } from "../context"

const SubmitButton =
	withStyles(theme => ({
		root: {
			width: "100vw",
			borderRadius: 0,
			display: "block",
			height: theme.spacing(7),
		},
	}))(Button)

const Main: FC = () => {
	const { handleSubmit } = useStateContext()
	return (
		<SubmitButton
			children="Submit"
			variant="contained"
			onClick={handleSubmit}
		/>
	)
}

export default Main