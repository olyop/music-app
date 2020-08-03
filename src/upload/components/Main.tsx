import { createElement, FC } from "react"

import Grid from "@material-ui/core/Grid"
import styled from "@material-ui/core/styles/styled"

import Albums from "./Albums"

const Root =
	styled(Grid)(({ theme }) => ({
		width: "100%",
		height: "100%",
		[theme.breakpoints.down("lg")]: {
			overflow: "auto",
		},
	}))

const Section =
	styled(Grid)(({ theme }) => ({
		width: "100%",
		padding: theme.spacing(4),
		[theme.breakpoints.up("lg")]: {
			height: "100%",
			overflow: "auto",
		},
	}))

const Sidebar =
	styled(Section)(({ theme }) => ({
		backgroundColor: theme.palette.common.white,
	}))

const Main: FC = () => (
	<Root container>
		<Section item lg={9}>
			<Albums/>
		</Section>
		<Sidebar item lg={3}>
			Right
		</Sidebar>
	</Root>
)

export default Main