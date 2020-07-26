import noop from "lodash/noop"
import { createElement, FC } from "react"

import Box from "@material-ui/core/Box"
import { DatePicker } from "@material-ui/pickers"
import InputBase from "@material-ui/core/InputBase"
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
		boxShadow: theme.shadows[3],
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		borderRadius: theme.shape.borderRadius,
	}))

const Title =
	styled(InputBase)(({ theme }) => ({
		display: "block",
		...theme.typography.h4,
	}))

const Released =
	styled(DatePicker)(({ theme }) => ({
		display: "block",
		marginTop: theme.spacing(1),
	}))

const Album: FC<PropTypes> = ({ album, className }) => (
	<Box className={className}>
		<Title
			spellCheck={false}
			defaultValue={album.title}
		/>
		<Typography
			variant="h6"
			component="h3"
			children={album.artists[0]}
		/>
		<Released
			disableFuture
			onChange={noop}
			label="Released"
			format="dd/MM/yyyy"
			value={new Date(album.released.toString())}
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