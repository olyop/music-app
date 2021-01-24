import { createElement, FC } from "react"

import Button from "@material-ui/core/Button"
import withStyles from "@material-ui/core/styles/withStyles"
import { StyledComponentProps } from "@material-ui/core/styles"

import { useStateContext } from "../context"

const Root =
	withStyles({
		root: {
			borderRadius: 0,
			display: "block",
		},
	})(Button)

const Submit: FC<StyledComponentProps> = ({ classes }) => {
	const { handleSubmit } = useStateContext()
	return (
		<Root
			children="Submit"
			classes={classes}
			variant="contained"
			onClick={handleSubmit}
		/>
	)
}

export default Submit