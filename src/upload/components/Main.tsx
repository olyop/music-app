import { createElement, FC } from "react"

import Grid from "@material-ui/core/Grid"
import styled from "@material-ui/core/styles/styled"

import Albums from "./Albums"
import { useStateContext } from "../context"

const Root =
	styled(Grid)({
		width: "100%",
		height: "100%",
	})

const Section =
	styled(Grid)(({ theme }) => ({
		width: "100%",
		height: "100%",
		padding: theme.spacing(4),
	}))

const Content =
	styled(Section)({
		overflow: "auto",
	})

const Sidebar =
	styled(Section)(({ theme }) => ({
		backgroundColor: theme.palette.common.white,
	}))

const Main: FC = () => {
	const { songs } = useStateContext()
	return (
		<Root container>
			<Content item sm={7} md={9}>
				<Albums songs={songs}/>
			</Content>
			<Sidebar item sm={5} md={3}>
				Right
			</Sidebar>
		</Root>
	)
}

export default Main