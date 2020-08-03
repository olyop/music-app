import noop from "lodash/noop"
import { createElement, FC } from "react"

import Box from "@material-ui/core/Box"
import Input from "@material-ui/core/Input"
import { DatePicker } from "@material-ui/pickers"
import styled from "@material-ui/core/styles/styled"
import { StyledProps } from "@material-ui/core/styles"

import Img from "./Img"
import Songs from "./Songs"
import AlbumArtists from "./AlbumArtists"
import { AlbumWithSongs } from "../types"

const Root =
	styled(Box)(({ theme }) => ({
		display: "grid",
		alignItems: "start",
		gridGap: theme.spacing(4),
		gridTemplateColumns: "200px auto",
	}))

const Cover =
	styled(Img)(({ theme }) => ({
		height: 200,
		cursor: "pointer",
		boxShadow: theme.shadows[3],
		borderRadius: theme.shape.borderRadius,
	}))

const Title =
	styled(Input)(({ theme }) => ({
		marginTop: -6,
		...theme.typography.h4,
		marginBottom: theme.spacing(0.25),
	}))

const Info =
	styled(Box)(({ theme }) => ({
		display: "grid",
		alignItems: "center",
		gridGap: theme.spacing(2),
		marginBottom: theme.spacing(1),
		gridTemplateColumns: "auto 114px",
	}))

const Artists =
	styled(AlbumArtists)(({ theme }) => ({
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	}))

const Released =
	styled(DatePicker)(({ theme }) => ({
		width: 114,
		display: "block",
		...theme.typography.h6,
	}))

const Album: FC<PropTypes> = ({
	className,
	album: { title, artists, cover, songs, released },
}) => (
	<Root className={className}>
		<Cover
			url={cover}
			title={title}
		/>
		<Box>
			<Title
				defaultValue={title}
			/>
			<Info>
				<Artists
					init={artists}
				/>
				<Released
					minDate={1}
					onChange={noop}
					value={released}
					label="Released"
					format="dd/MM/yyyy"
					inputVariant="outlined"
				/>
			</Info>
			<Songs songs={songs}/>
		</Box>
	</Root>
)

interface PropTypes extends StyledProps {
	album: AlbumWithSongs,
}

export default Album