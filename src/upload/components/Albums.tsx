import { createElement, FC, Fragment } from "react"

// import Box from "@material-ui/core/Box"
import styled from "@material-ui/core/styles/styled"

import Album from "./Album"
import { Song } from "../types"
import { songsToAlbums, orderAlbums } from "../helpers"

const Section =
	styled(Album)(({ theme }) => ({
		...theme.borderBottom,
		marginBottom: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		"&:last-child": {
			border: 0,
			marginBottom: 0,
			paddingBottom: 0,
		},
	}))

const Albums: FC<PropTypes> = ({ songs }) => (
	<Fragment>
		{orderAlbums(songsToAlbums(songs)).map(
			(album, index) => (
				<Section
					key={index}
					album={album}
				/>
			),
		)}
	</Fragment>
)

interface PropTypes {
	songs: Song[],
}

export default Albums