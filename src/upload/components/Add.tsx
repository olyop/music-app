import { createElement, FC, Fragment } from "react"

import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import AddCircle from "@material-ui/icons/AddCircle"
import styled from "@material-ui/core/styles/styled"
import withTheme from "@material-ui/core/styles/withTheme"
import CircularProgress from "@material-ui/core/CircularProgress"

import { useStateContext } from "../context"

const Root =
	styled(withTheme(Grid))({
		width: "100%",
		height: "100%",
	})

const AddButton =
	styled(withTheme(Button))(({ theme }) => ({
		cursor: "pointer",
		position: "relative",
		paddingTop: theme.spacing(2),
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
		paddingBottom: theme.spacing(2),
	}))

const InputButton =
	styled("input")({
		top: 0,
		left: 0,
		zIndex: 2,
		opacity: 0,
		width: "100%",
		height: "100%",
		cursor: "pointer",
		position: "absolute",
	})

const Add: FC = () => {
	const { loading, handleFiles } = useStateContext()
	return (
		<Root
			container
			justify="center"
			alignItems="center"
		>
			{loading ? (
				<CircularProgress/>
			) : (
				<AddButton
					size="large"
					color="primary"
					variant="contained"
					startIcon={<AddCircle/>}
					children={(
						<Fragment>
							Add files
							<InputButton
								value=""
								multiple
								type="file"
								onChange={handleFiles}
							/>
						</Fragment>
					)}
				/>
			)}
		</Root>
	)
}

export default Add