import { createElement, FC } from "react"

import Box from "@material-ui/core/Box"
import styled from "@material-ui/core/styles/styled"

import Album from "./Album"
import { Song } from "../types"
import { songsToAlbums, orderAlbums } from "../helpers"

const Section =
	styled(Album)(({ theme }) => ({
		borderBottom: 2,
		borderBottomStyle: "solid",
		marginBottom: theme.spacing(6),
		paddingBottom: theme.spacing(7),
		borderBottomColor: theme.palette.grey[300],
		"&:last-child": {
			border: 0,
			marginBottom: 0,
			paddingBottom: 0,
		},
	}))

const Albums: FC<PropTypes> = ({ songs }) => (
	<Box>
		{orderAlbums(songsToAlbums(songs)).map(
			(album, index) => (
				<Section
					key={index}
					album={album}
				/>
			),
		)}
	</Box>
)

interface PropTypes {
	songs: Song[],
}

export default Albums