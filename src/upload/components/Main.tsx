import { createElement, FC } from "react"

import Box from "@material-ui/core/Box"
import styled from "@material-ui/core/styles/styled"
import withStyles from "@material-ui/core/styles/withStyles"

import Genres from "./Genres"
import _Submit from "./Submit"
import _Albums from "./Albums"
import _Artists from "./Artists"

const Root =
	styled(Box)({
		width: "100vw",
		height: "100vh",
	})

const Content =
	styled(Box)(({ theme }) => ({
		width: "100%",
		display: "flex",
		height: `calc(100% - ${theme.spacing(7)}px)`,
	}))

const Submit =
	withStyles(theme => ({
		root: {
			width: "100%",
			height: theme.spacing(7),
		},
	}))(_Submit)

const Albums =
	styled(_Albums)(({ theme }) => ({
		width: "85vw",
		height: "100%",
		padding: theme.spacing(3),
	}))

const Artists =
	styled(_Artists)(({ theme }) => ({
		marginBottom: theme.spacing(3),
	}))

const Sidebar =
	styled(Box)(({ theme }) => ({
		width: "15vw",
		height: "100%",
		overflow: "auto",
		padding: theme.spacing(3),
		backgroundColor: theme.palette.common.white,
	}))

const Main: FC = () => (
	<Root>
		<Content>
			<Albums/>
			<Sidebar>
				<Artists/>
				<Genres/>
			</Sidebar>
		</Content>
		<Submit/>
	</Root>
)

export default Main