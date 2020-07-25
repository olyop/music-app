import { createElement, FC } from "react"

import Box from "@material-ui/core/Box"
import styled from "@material-ui/core/styles/styled"
import Typography from "@material-ui/core/Typography"
import { StyledProps } from "@material-ui/core/styles"

import Img from "./Img"
import Songs from "./Songs"
import { AlbumWithSongs } from "../types"

const Cover =
	styled(Img)(({ theme }) => ({
		width: 200,
		height: 200,
		cursor: "pointer",
		boxShadow: theme.shadows[4],
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		borderRadius: theme.shape.borderRadius,
	}))

const Album: FC<PropTypes> = ({ album, className }) => (
	<Box className={className}>
		<Typography
			variant="h4"
			component="h2"
			children={album.title}
		/>
		<Typography
			variant="h6"
			component="h3"
			children={album.released}
		/>
		{album.cover && (
			<Cover
				url={album.cover}
				title={album.title}
			/>
		)}
		<Songs songs={album.songs}/>
	</Box>
)

interface PropTypes extends StyledProps {
	album: AlbumWithSongs,
}

export default Album