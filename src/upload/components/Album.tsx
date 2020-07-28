import noop from "lodash/noop"
import { createElement, FC } from "react"

import Box from "@material-ui/core/Box"
import Input from "@material-ui/core/Input"
import CloseIcon from "@material-ui/icons/Close"
import { DatePicker } from "@material-ui/pickers"
import styled from "@material-ui/core/styles/styled"
import IconButton from "@material-ui/core/IconButton"
import { StyledProps } from "@material-ui/core/styles"

import Img from "./Img"
import Songs from "./Songs"
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

const Head =
	styled(Box)(({ theme }) => ({
		display: "grid",
		alignItems: "start",
		gridGap: theme.spacing(4),
		gridTemplateColumns: "auto 48px",
	}))

const Close =
	styled(IconButton)({
		width: 48,
		height: 48,
		marginTop: -15,
		marginLeft: 15,
	})

const Title =
	styled(Input)(({ theme }) => ({
		marginTop: -6,
		...theme.typography.h4,
		marginBottom: theme.spacing(0.5),
	}))

const Artists =
	styled(Input)(({ theme }) => ({
		...theme.typography.h6,
		marginBottom: theme.spacing(1),
	}))

const Released =
	styled(DatePicker)(({ theme }) => ({
		display: "block",
		...theme.typography.h6,
		marginBottom: theme.spacing(2),
	}))

const Album: FC<PropTypes> = ({ album, className }) => (
	<Root className={className}>
		<Cover
			url={album.cover}
			title={album.title}
		/>
		<Box>
			<Head>
				<Box>
					<Title
						defaultValue={album.title}
					/>
					<Artists
						defaultValue={album.artists[0]}
					/>
					<Released
						minDate={1}
						onChange={noop}
						format="dd/MM/yyyy"
						value={album.released}
					/>
				</Box>
				<Close>
					<CloseIcon fontSize="default"/>
				</Close>
			</Head>
			<Songs songs={album.songs}/>
		</Box>
	</Root>
)

interface PropTypes extends StyledProps {
	album: AlbumWithSongs,
}

export default Album