import { createElement, FC } from "react"

import Grid from "@material-ui/core/Grid"
import { styled, withTheme } from "@material-ui/core/styles"

import Albums from "./Albums"

const Root =
	styled(Grid)({
		width: "100%",
		height: "100%",
	})

const Section =
	styled(withTheme(Grid))(({ theme }) => ({
		width: "100%",
		height: "100%",
		padding: theme.spacing(5),
	}))

const Left =
	styled(withTheme(Section))(({ theme }) => ({
		border: 1,
		borderColor: theme.palette.grey[300],
	}))

const Right =
	styled(withTheme(Left))(({ theme }) => ({
		backgroundColor: theme.palette.common.white,
	}))

const Main: FC = () => (
	<Root container>
		<Left item xs={7} sm={9}>
			<Albums/>
		</Left>
		<Right item xs={5} sm={3}>
			Right
		</Right>
	</Root>
)

export default Main