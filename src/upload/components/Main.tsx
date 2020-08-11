import { createElement, FC } from "react"

import Box from "@material-ui/core/Box"
import styled from "@material-ui/core/styles/styled"

import Genres from "./Genres"
import Submit from "./Submit"
import Artists from "./Artists"
import AlbumsImported from "./Albums"

const Root =
	styled(Box)(({ theme }) => ({
		width: "100%",
		display: "flex",
		height: `calc(100vh - ${theme.spacing(7)}px)`,
	}))

const Albums =
	styled(AlbumsImported)(({ theme }) => ({
		height: "100%",
		padding: theme.spacing(3),
		[theme.breakpoints.down("xl")]: {
			width: "85vw",
		},
		[theme.breakpoints.down("lg")]: {
			width: "80vw",
		},
		[theme.breakpoints.down("md")]: {
			width: "70vw",
		},
	}))

const ArtistsSection =
	styled(Artists)(({ theme }) => ({
		marginBottom: theme.spacing(3),
	}))

const Sidebar =
	styled(Box)(({ theme }) => ({
		width: "15vw",
		height: "100%",
		padding: theme.spacing(3),
		backgroundColor: theme.palette.common.white,
		[theme.breakpoints.down("md")]: {
			width: "30vw",
		},
		[theme.breakpoints.up("lg")]: {
			width: "20vw",
		},
		[theme.breakpoints.up("xl")]: {
			width: "15vw",
		},
	}))

const Main: FC = () => (
	<Box>
		<Root>
			<Albums/>
			<Sidebar>
				<ArtistsSection/>
				<Genres/>
			</Sidebar>
		</Root>
		<Submit/>
	</Box>
)

export default Main