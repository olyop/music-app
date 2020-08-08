import { createElement, FC } from "react"

import Grid from "@material-ui/core/Grid"
import styled from "@material-ui/core/styles/styled"
import withStyles from "@material-ui/core/styles/withStyles"

import Genres from "./Genres"
import Albums from "./Albums"
import Artists from "./Artists"

const Root =
	styled(Grid)(({ theme }) => ({
		width: "100%",
		height: "100%",
		[theme.breakpoints.down("lg")]: {
			overflow: "auto",
		},
	}))

const Section =
	withStyles(theme => ({
		root: {
			width: "100%",
			minHeight: "100vh",
			padding: theme.spacing(4),
			[theme.breakpoints.up("lg")]: {
				height: "100%",
				overflow: "auto",
			},
		},
	}))(Grid)

const ArtistsSection =
	styled(Artists)(({ theme }) => ({
		marginBottom: theme.spacing(2),
	}))

const Sidebar =
	styled(Section)(({ theme }) => ({
		backgroundColor: theme.palette.common.white,
	}))

const Main: FC = () => (
	<Root container>
		<Section item lg={10}>
			<Albums/>
		</Section>
		<Sidebar item lg={2}>
			<ArtistsSection/>
			<Genres/>
		</Sidebar>
	</Root>
)

export default Main