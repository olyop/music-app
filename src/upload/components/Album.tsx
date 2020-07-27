import noop from "lodash/noop"
import { createElement, FC } from "react"
import DateFnsUtils from "@date-io/date-fns"

import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import styled from "@material-ui/core/styles/styled"
import TextField from "@material-ui/core/TextField"
import { StyledProps } from "@material-ui/core/styles"
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"

import Img from "./Img"
import Songs from "./Songs"
import { AlbumWithSongs } from "../types"

const Cover =
	styled(Img)(({ theme }) => ({
		width: 200,
		height: 200,
		cursor: "pointer",
		boxShadow: theme.shadows[3],
		marginBottom: theme.spacing(3),
		borderRadius: theme.shape.borderRadius,
	}))

const Main =
	styled(Grid)(({ theme }) => ({
		marginBottom: theme.spacing(2),
	}))

const Title =
	styled(TextField)(({ theme }) => ({
		marginRight: theme.spacing(2),
		backgroundColor: theme.palette.common.white,
	}))

const Released =
	styled(DatePicker)(({ theme }) => ({
		backgroundColor: theme.palette.common.white,
	}))

const Album: FC<PropTypes> = ({ album, className }) => (
	<Box className={className}>
		{album.cover && (
			<Cover
				url={album.cover}
				title={album.title}
			/>
		)}
		<Main>
			<Title
				label="Title"
				variant="outlined"
				spellCheck={false}
				defaultValue={album.title}
			/>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<Released
					minDate={1}
					onChange={noop}
					label="Released"
					format="dd/MM/yyyy"
					inputVariant="outlined"
					value={new Date(album.released.toString())}
				/>
			</MuiPickersUtilsProvider>
		</Main>
		<Songs songs={album.songs}/>
	</Box>
)

interface PropTypes extends StyledProps {
	album: AlbumWithSongs,
}

export default Album