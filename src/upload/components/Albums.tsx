import { createElement, FC } from "react"

import Box from "@material-ui/core/Box"
import styled from "@material-ui/core/styles/styled"

import Album from "./Album"
import { Song } from "../types"
import { songsToAlbums, orderAlbums } from "../helpers"

const Section =
	styled(Album)(({ theme }) => ({
		marginBottom: theme.spacing(6),
		"&:last-child": {
			marginBottom: 0,
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